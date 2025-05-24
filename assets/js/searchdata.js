---
layout: null
is_wiki_page: false
---

{% if site.search_engine == "js" %}

import * as func from './functions.js';
import { searchIndex } from './searchindex.js';
import { sectionIndexFlat, filterArrayForSection } from './sidebar.js';
import { getParentPath } from './sidebar.js';
import { isVirtualPage } from './virtualpages.js';

const searchCont = body.querySelector('.git-wiki-search-js'),
      searchInput = searchCont.querySelector('#search-input');
let inputPeripheral = {},
    filterActions = {},
    filtersExpanded = false,
    suggestCont,
    suggestList,
    keyNavCurItem,
    pluralAll = new Map([['one', ''], ['other', 'all']]),
    pluralResults = new Map([['one', 'result'], ['other', 'results']]),
    pluralMatches = new Map([['one', 'match'], ['other', 'matches']]);

const maxSuggestions = 7,
      keyNavCodes = {
          arrowUp: 38,
          arrowDown: 40,
          enter: 13,
          esc: 27,
          tab: 9,
          shift: 16 // for whatever reason the keyup listener doesn't detect `shiftKey` but does detect the raw keycode so it's added here
      };

const fuseDefaultOptions = {
    keys: [
        { name: 'title', weight: 3 }, // increase title relevance to result ordering
        { name: 'url', weight: 0.1 }, // to be able to match tag-less sub-section pages (needs very low weight)
        { name: 'tags', weight: 2 },
        { name: 'content', weight: 0.5 } // reducing this weight appears to improve perf
    ],
    threshold: 0, // effectively disable fuzzy matching by requiring exact matches
    useExtendedSearch: true, // enables query operators
    ignoreLocation: true, // search through all text at expense of performance
    includeMatches: false // don't return indices of query highlights (using custom handling instead)
}

const regexHasMedia = {
    image: /!\[(?=((?:[^\[\]]+|\[(?=([^\[\]]*))\2\])*))\1\]\((?=((?:[^\(\)]+|\((?=([^\(\)]*))\4\))*))\3\)/,
    {% raw %}
    videoAny: /\{% include (?:video|youtube|vimeo)[\s\S]*?%\}/,
    videoGeneric: /\{% include video[\s\S]*?%\}/,
    videoIframe: /\{% include (?:youtube|vimeo)[\s\S]*?id="([^"]+)"[\s\S]*?%\}/ // captures `id` value for embeds which have extractable thumbnails
    {% endraw %}
}

// Patterns for excluding highlighted snippets from displayed results, to prioritize non-markup strings and reduce visual noise
const matchExclusions = [
    // Match Markdown URLs/images (including any literal square brackets in title/alt text or literal parentheses in URL), optimized to avoid perf issues with alternation
    // Capture group 1 = title/alt text, capture group 3 = link
    // Note: doesn't handle images wrapped in a Markdown link (nested link syntax)
    {
        regex: /!?\[(?=((?:[^\[\]]+|\[(?=([^\[\]]*))\2\])*))\1\]\((?=((?:[^\(\)]+|\((?=([^\(\)]*))\4\))*))\3\)/g,
        keepGroups: [1] // preserve the title/alt text capture group
    },
    // Match Liquid includes (as this script has YAML metadata requires escaping the value by wrapping line with Liquid escape tags)
    {% raw %}
    /{%([\s\S]*?)%}/g,
    {% endraw %}
    // Match Kramdown syntax
    /{:([\s\S]*?)}/g
];

// Visual only highlighted snippet exclusion patterns
const visualExclusions = [
    ...matchExclusions,
    {
        regex: /(\\)(?:\\)/g, // escaped (double) backslashes
        keepGroups: [1] // only keep one
    },
    // Markdown syntax
    /-{3,}/g, // match 3 or more sequential dashes (eg, horizontal rules, Markdown tables), as 2 dashes used for Lua comments
    /#{2,}/g, // match 2 or more sequential hash characters
    // HTML tags
    /<\/?(?:p|b|strong|small|caption|table|td|tr|thead|th|tbody|u|sup|br)(?:\s+[^>]*?)?>/ig, // matches any of the specified opening/closing tags, including any attributes between the angled brackets. Avoids generic alpha pattern since we want to display any XML code from the game.
    '<br/>', // self-closing tag
    '<!--',
    '-->',
    // Last so other patterns can match first
    '`',
    '*',
    '|',
    '\\ >', // match manual line breaks in Markdown blockquotes
    /(?<=\s)>(?=\s)/g, // match standalone `>` that are surrounded by a least one whitespace char on each side
    {
        regex: /\\(#)/g, // escaped hash
        keepGroups: [1]
    },
    {
        regex: /\\(!)/g, // escaped exclamation
        keepGroups: [1]
    },
    {
        regex: /\\(>)/g, // escaped closing angled bracket (not adding opening bracket counterpart since a backslash may be a literal end string inside a pair of tags)
        keepGroups: [1]
    },
    {
        regex: /\\(\[)/g, // escaped opening square bracket
        keepGroups: [1]
    },
    {
        regex: /\\(\])/g, // escaped closing square bracket
        keepGroups: [1]
    }
];

const filterHandlers = {
    limitToSection: {
        handler: (key, state) => {
            fuse = fuseConfig({});
            searchFilterRequery(key, state);
        }
    },
    excludeEntityRef: {
        handler: (key, state) => {
            fuse = fuseConfig({});
            searchFilterRequery(key, state);
        }
    },
    ignoreMarkup: {
        handler: (key, state) => {
            fuse = fuseConfig({});
            searchFilterRequery(key, state);
        }
    },
    hasMedia: {
        handler: (key, state) => {
            fuse = fuseConfig({});
            searchFilterRequery(key, state);
        }
    }
};

const filterStatesInit = {
    limitToSection: { state: false, string: 'Search within section' },
    excludeEntityRef: { state: false, string: 'Exclude Entity Reference' },
    ignoreMarkup: { state: false, string: 'Ignore markup' },
    hasMedia: { state: false, string: 'Has media' }
}

const suggestionsFilters = createFilterController(filterStatesInit, filterHandlers, true),
      lookupIndex = createLookupIndex(suggestionsFilters),
      searchUrl = createSearchUrl();
initHtmlSearch();

function fuseConfig({
    indexState = searchFilterLimitToSectionCheck(),
    input = lookupIndex(indexState),
    options = fuseDefaultOptions
}) {
    return new Fuse(input, options);
}
var fuse = fuseConfig({});

const queryHandlingDebounced = func.debounce((val,keyCode) => {
    if (typeof val != 'undefined' && val != null && val.length != 0) {
        outputSuggestions(val,fuse.search(val),keyCode);
        searchResultsShow(true); // retrigger visibility check on character deletion
    } else {
        searchClearShow(false);
        searchNoResults(false);
        searchResultsReset();
    }
},300,false);

const searchInputResultsResizeObserver = createResizeObserver(searchFiltersExpandButton);

setListeners();
searchInputResultsResizeObserver.observe(suggestCont);

function createResizeObserver(callback) {
    let priorElWidth;

    const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            const cont = entry.target,
                  curWidth = entry.contentRect.width;
            // Only perform actions if width changes not height (to avoid unintentional triggers when something changes the height)
            if (priorElWidth === undefined || curWidth !== priorElWidth) {
                if (callback) callback();

                // Check if stored variables initialized
                if (cont.metaStore) {
                    const matches = cont.querySelectorAll(`.${cont.metaStore.targetClass}`);
                    if (matches) {
                        const regen = func.debounce(() => {
                            matches.forEach((match) => {
                                match.metaStore.regenHighlights();
                            });
                        },100,false); // debounce so that particularly when expanding/contracting wiki page width via toolbar button it doesn't get called as rapidly
                        regen();
                    }
                }
            }

            priorElWidth = curWidth;
        });
    });

    return observer
}

function createSearchUrl() {
    let lastUrl; // internally remember the last generated url
    return function(newQuery) {
        if (newQuery && typeof newQuery === 'string') {
            const filters = suggestionsFilters.getAllStates(),
                  activeFilters = Object.keys(filters).filter(key => filters[key]),
                  url = new URL('/search', window.location.href), // use domain from current URL as the base
                  params = new URLSearchParams();

            params.set('q', newQuery);

            if (activeFilters.length > 0) {
                activeFilters.forEach(filter => {
                    // Override any stored user preference for section limiting if page that triggers search isn't a section
                    if (filter === 'limitToSection' && searchFilterLimitToSectionCheck() === false) {
                        return
                    }
                    params.append('filter', filter);
                });
            }

            if (searchFilterLimitToSectionCheck()) {
                params.set('section', func.getPageUrls().curUrlRoot);
            }

            url.search = params.toString();
            lastUrl = url;
            return url
        } else {
            return lastUrl
        }
    }
}

function createFilterController(initialStates = {}, functions = {}, useStorage = false) {
    const states = getLocalizedCopy(initialStates, 'state'),
          strings = getLocalizedCopy(initialStates, 'string'),
          initialStorageStates = getStorage('searchFilters');
    let storageStates = {};

    if (useStorage && initialStorageStates) {
        storageStates = JSON.parse(initialStorageStates); // convert back to object
        // Add any stored states to the controller-tracked states object
        Object.keys(storageStates).forEach(key => {
            if (key in states) {
                states[key] = storageStates[key];
            }
        });
    }

    function getLocalizedCopy(obj, extractKey) {
        return Object.keys(obj).reduce((result, key) => {
            result[key] = obj[key][extractKey];
            return result
        }, {});
    }

    function callHandler(filterKey, state) {
        if (typeof functions[filterKey]?.handler === 'function') {
            functions[filterKey].handler(filterKey, state);
        }
    }

    function existKey(filterKey) {
        if (!(filterKey in states)) {
            console.warn(`Filter key '${filterKey}' does not exist`);
            return false
        }
        return true
    }

    function storageHandler(filterKey) {
        if (useStorage) {
            storageStates[filterKey] = states[filterKey];
            setStorage('searchFilters', JSON.stringify(storageStates));
        }
    }

    return {
        toggle(filterKey, addToStorage) {
            if (!existKey(filterKey)) return
            states[filterKey] = !states[filterKey];
            if (addToStorage) storageHandler(filterKey);
            callHandler(filterKey, states[filterKey]);
        },

        getState(filterKey) {
            return states[filterKey]
        },

        getAllStates() {
            return { ...states }
        },

        getAllStorageStates() {
            return { ...storageStates }
        },

        setState(filterKey, state, useHandler = true, addToStorage) {
            if (!existKey(filterKey)) return
            states[filterKey] = state;
            if (addToStorage) storageHandler(filterKey);
            if (useHandler) {
                callHandler(filterKey, states[filterKey]);
            }
        },

        getString(filterKey) {
            return strings[filterKey]
        },

        // Method for iterating over and manipulating each key
        forEach(callback) {
            Object.keys(states).forEach((key) => {
                callback(key, states[key]);
            });
        },

        activeCounter() {
            return Object.values(states).reduce((count, val) => count + (val ? 1 : 0), 0)
        }
    };
}

// Output an instanced version of the lookup index so other modules can have independent lookup states (eg: search results page). Pass the current module's filters controller so it's instanced, too.
function createLookupIndex(filtersController) {
    let index;

    return function(useSectionIndex, sectionUrlRoot) {
        if (useSectionIndex) {
            if (sectionUrlRoot) {
                index = filterArrayForSection(searchIndex, 'url', sectionUrlRoot);
            } else {
                index = sectionIndexFlat;
            }
        } else {
            index = searchIndex;
        }

        // Additional filters
        if (filtersController.getState('excludeEntityRef') === true) {
            index = index.filter(page =>
                !page.url.startsWith('/Entity_Reference/')
            );
        }

        if (filtersController.getState('ignoreMarkup') === true) {
            index = JSON.parse(JSON.stringify(index)); // deep copy otherwise changes remain when toggled
            index.forEach(page => {
                page.content = stripExclusionsFromString(page.content, visualExclusions).trim();
            });
        }

        if (filtersController.getState('hasMedia') === true) {
            const patterns = [
                regexHasMedia.image,
                regexHasMedia.videoAny
            ]
            const check = (str) => {
                return patterns.some(regex => {
                    regex.lastIndex = 0;
                    return regex.test(str)
                });
            };
            index = JSON.parse(JSON.stringify(index));
            index = index.filter(page =>
                check(page.content)
            );
        }

        return index
    }
}

function setListeners() {
    searchInput.addEventListener('focus', (e) => {
        const val = e.target.value;
        // Trigger output if a value has been pre-filled at page launch
        if (val && !suggestList.hasChildNodes()) {
            queryHandlingDebounced(e.target.value);
        } else {
            searchResultsShow(true);
        }
    });

    searchInput.addEventListener('paste', (e) => {
        searchUrl(searchInput.value); // keep up-to-date
        queryHandlingDebounced(e.target.value);
    });

    searchInput.addEventListener('keyup', (e) => {
        const val = e.target.value;

        // Trigger on every key except those used for nav
        if (!func.matchObjVal(keyNavCodes, e.keyCode)) {
            searchUrl(searchInput.value);
            queryHandlingDebounced(val,e.keyCode);
        } else {
            // Defocus input
            if (e.keyCode == keyNavCodes.esc) {
                // Chromium/Firefox handles this fine but Vivaldi hijacks the Esc key
                searchInput.blur();
                searchResultsShow(false);
            }
        }
    });

    searchInput.addEventListener('keydown', (e) => {
        if (suggestCont.classList.contains('visible')) {
            if (func.matchObjVal(keyNavCodes, e.keyCode)) {
                e.preventDefault(); // disable native key functionality (necessary for tab handling)
                searchKeyNav(e); // pass entire event not just keyCode, so modifiers can be detected
            }
        }
    });

    body.addEventListener('click', (e) => {
        if (isVirtualPage && e.target.closest('div') == suggestCont) {
            resetAll();
        }
        if (
            e.target == searchInput ||
            e.target.closest('.search-filter-actions-container') ||
            e.target.closest('.search-no-results-container') ||
            e.target == suggestCont ||
            e.target == inputPeripheral.clear
            ) {
            // Only keep results visible if results are already visible (allows clearing query while defocused without refocusing search field)
            if (suggestCont.classList.contains('visible')) {
                searchResultsShow(true);
            }
        } else {
            searchResultsShow(false);
        }
    });

    filterActions.buttons.limitToSection.addEventListener('click', (e) => {
        suggestionsFilters.toggle('limitToSection', true);
    });

    filterActions.buttons.excludeEntityRef.addEventListener('click', (e) => {
        suggestionsFilters.toggle('excludeEntityRef', true);
    });

    filterActions.buttons.ignoreMarkup.addEventListener('click', (e) => {
        suggestionsFilters.toggle('ignoreMarkup', true);
    });

    filterActions.buttons.hasMedia.addEventListener('click', (e) => {
        suggestionsFilters.toggle('hasMedia', true);
    });

    filterActions.expand.addEventListener('click', (e) => {
        filtersExpanded = !filtersExpanded;
        filterActions.cont.classList.toggle('expand-filters');
        searchFiltersExpandButton();
    });

    inputPeripheral.clear.addEventListener('pointerdown', (e) => {
        e.preventDefault(); // prevent hijacking focus from input field
    });

    inputPeripheral.clear.addEventListener('click', (e) => {
        searchInput.value = null;
        searchClearShow(false);
        searchNoResults(false);
        searchResultsReset();
    });
}

function initHtmlSearch() {
    inputPeripheral.cont = func.createEl('div','search-input-peripheral');
    inputPeripheral.clear = func.createEl('button','search-clear-query');
    inputPeripheral.filtersCounter = func.createEl('span','search-filters-counter');
    suggestCont = func.createEl('div');
    suggestCont.id = 'suggestions-container';
    suggestList = func.createEl('ul','suggestions-list');
    filterActions.cont = func.createEl('div','search-filter-actions-container');
    filterActions.label = func.createEl('span','search-filter-actions-label');
    filterActions.expand = func.createEl('div','search-filter-actions-expand');
    filterActions.list = func.createEl('ul','search-filter-actions-list');
    filterActions.buttons = {
        limitToSection: func.createEl('span','search-filter-button'),
        excludeEntityRef: func.createEl('span','search-filter-button'),
        ignoreMarkup: func.createEl('span','search-filter-button'),
        hasMedia: func.createEl('span','search-filter-button')
    }

    inputPeripheral.filtersCounter.textContent = 'Filters';
    filterActions.label.textContent = 'Filters';

    for (let [key] of Object.entries(filterActions.buttons)) {
        const l = document.createElement('li');
        filterActions.buttons[key].textContent = suggestionsFilters.getString(key);
        l.appendChild(filterActions.buttons[key]);
        filterActions.list.appendChild(l);
    }

    inputPeripheral.cont.append(
        inputPeripheral.filtersCounter,
        inputPeripheral.clear
    );
    searchCont.insertBefore(inputPeripheral.cont, searchInput);
    filterActions.cont.append(
        filterActions.label,
        filterActions.expand,
        filterActions.list
    );
    suggestCont.append(
        filterActions.cont,
        suggestList
    );
    searchCont.appendChild(suggestCont);

    suggestCont.style.setProperty('--search-input-height',`${searchInput.offsetHeight}px`);
    searchFiltersInitialStates();
    searchClearShow(false);
}

// Keyboard navigation
// https://stackoverflow.com/a/71951738
function searchKeyNav(e) {
    if (!searchInput.value) return
    const a = suggestCont.getElementsByTagName('a');
    let priorItem = keyNavCurItem;
    if (e.keyCode == keyNavCodes.arrowDown || (e.keyCode == keyNavCodes.tab && !e.shiftKey)) {
        keyNavCurItem++;
        if (keyNavCurItem >= a.length) {
            if (keyNavCurItem == a.length) {
                keyNavCurItem = 0; // loop back around
                updateItems();
            } else {
                keyNavCurItem = priorItem;
            }
        } else {
            if (priorItem != -1) {
                changeHighlight(a[priorItem], false);
            }
            changeHighlight(a[keyNavCurItem], true);
        }
    }
    if (e.keyCode == keyNavCodes.arrowUp || (e.keyCode == keyNavCodes.tab && e.shiftKey)) {
        keyNavCurItem--;
        if (keyNavCurItem <= -1) {
            priorItem = 0;
            keyNavCurItem = a.length - 1; // to account for zero-based array
            updateItems();
        } else {
            if (keyNavCurItem < 0) {
                keyNavCurItem = priorItem;
            } else {
                updateItems();
            }
        }
    }
    if (e.keyCode == keyNavCodes.enter) {
        if (a[keyNavCurItem]) {
            changeHighlight(a[keyNavCurItem], true, true);
            if (!isVirtualPage) {
                window.location.href = a[keyNavCurItem].href;
            }
        } else {
            if (searchUrl()) {
                // Go to all results search link if a query has been entered but no suggestion item selected yet
                window.location.href = searchUrl();
            }
        }
    }

    function updateItems() {
        changeHighlight(a[priorItem], false);
        changeHighlight(a[keyNavCurItem], true);
    }

    function changeHighlight(el, addClass, isActive) {
        if (addClass) {
            if (!isActive) {
                el.parentNode.classList.add('highlight');
            } else {
                el.parentNode.classList.add('active');
            }
        } else {
            el.parentNode.classList.remove('highlight');
        }
    }
}

function resetAll() {
    searchResultsShow(false);
    searchResultsReset();
    searchInput.blur();
    searchInput.value = null;
    searchClearShow(false);
    searchNoResults(false);
}

function searchResultsReset() {
    suggestList.replaceChildren();
}

function searchResultsShow(state) {
    if (state) {
        suggestCont.classList.add('visible');
    } else {
        suggestCont.classList.remove('visible');
    }
}

function searchFiltersInitialStates() {
    searchFilterLimitToSectionCheck();
    suggestionsFilters.forEach((key, state) => {
        if (state) {
            filterActions.buttons[key].classList.toggle('active', state);
        }
    })
    searchFiltersCounterStyle();
}

function searchFilterLimitToSectionCheck() {
    const storedFilters = suggestionsFilters.getAllStorageStates();
    let enabled,
        userPref;

    // Check if user has stored a preference already
    if (storedFilters.hasOwnProperty('limitToSection')) {
        userPref = storedFilters['limitToSection'];
    }

    if (sectionIndexFlat.length > 1) {
        if (userPref === undefined) {
            // Default to limiting search to section
            suggestionsFilters.setState('limitToSection', true, false);
            lookupIndex(true);
            enabled = true;
        } else if (userPref === true) {
            lookupIndex(true);
            enabled = true;
        } else {
            enabled = false;
        }
        searchFilterLimitToSectionShow(true);
    } else {
        enabled = false;
        searchFilterLimitToSectionShow(false);
    }
    return enabled
}

function searchFilterRequery(filterKey, state) {
    const query = searchInput.value;
    filterActions.buttons[filterKey].classList.toggle('active', state);
    searchFiltersCounterStyle();
    outputSuggestions(query, fuse.search(query), '');
}

function searchFilterLimitToSectionShow(state) {
    filterActions.buttons.limitToSection.parentNode.classList.toggle('hidden', !state); // hide list item container
}

function searchFiltersCounterStyle() {
    let counter = suggestionsFilters.activeCounter();

    // Check if the limit to section is enabled but the current page isn't a section, in which case decrement the counter since that filter won't be getting applied
    if (suggestionsFilters.getState('limitToSection') === true && searchFilterLimitToSectionCheck() === false) {
        counter--
    }

    if (counter !== 0) {
        inputPeripheral.filtersCounter.setAttribute('data-counter',counter)
        inputPeripheral.cont.classList.add('filters-active');
        searchCont.style.setProperty('--filters-counter-width',`${inputPeripheral.filtersCounter.offsetWidth}px`);
    } else {
        inputPeripheral.cont.classList.remove('filters-active');
    }
}

function searchFiltersExpandButton() {
    const isTrunc = checkOverflow(filterActions.list).width;
    if (filtersExpanded === false) {
        filterActions.cont.classList.toggle('show-expansion-toggle',isTrunc);
    }
    if (filtersExpanded === true) {
        filterActions.cont.classList.add('show-expansion-toggle');
    }
}

function searchNoResults(state) {
    const contClass = 'search-no-results-container',
          exists = suggestCont.querySelector(`.${contClass}`);
    if (state) {
        if (!exists) {
            const el = func.createEl('div',contClass),
                  text = func.createEl('span','search-no-results-message');
            text.textContent = 'No results';
            el.appendChild(text);
            suggestCont.appendChild(el);
        }
    } else {
        if (exists) exists.remove();
    }
}

function searchClearShow(state) {
    inputPeripheral.cont.classList.toggle('clear', state);
    suggestCont.classList.toggle('empty-query', !state);
}

function checkOverflow(el) {
    return {
        height: el.scrollHeight > el.clientHeight,
        width: el.scrollWidth > el.clientWidth
    }
}

function outputSuggestions(query, input, key) {
    if (query) {
        searchClearShow(true);
    } else {
        searchClearShow(false);
        return
    }

    // Base reference values for match highlight expansion, for subsequent formula adjustment
    // This is simpler approach compared to creating a dummy string to measure
    const matchWidthBasis = {
        refEl: suggestCont, // element to check for updated width
        contWidth: 820, // reference results container width
        expansion: 38 // reference expansion width for that results container width (+ a few characters more so CSS can add extra truncation to keep all lines evenly sized)
    }

    if (input.length !== 0) {
        // Avoid resetting unless a non-shift key is pressed
        if (key != keyNavCodes.shift) {
            keyNavCurItem = -1; // reset currently highlighted item
            suggestList.replaceChildren(); // reset all list items
        }
        searchResultsShow(true);
        searchNoResults(false);

        const parsedResults = parseResults({
            query: query,
            input: input,
            range: {
                max: maxSuggestions
            }
        });

        if (parsedResults.length === 0) {
            searchNoResults(true);
            searchResultsReset();
        } else {
            presentSuggestions(parsedResults, matchWidthBasis);
        }
    } else {
        searchNoResults(true);
        searchResultsReset();
    }
}

function presentSuggestions(results, matchWidthBasis) {
    results.forEach((result) => {
        const listItem = func.createEl('li','search-suggestions-item-container'),
              link = func.createEl('a','search-suggestions-item'),
              titleArea = func.createEl('div','search-suggestions-title-container'),
              matchesContClass = 'search-suggestions-matches-container',
              matchesCont = func.createEl('ul', matchesContClass),
              labelTitle = func.createEl('span','search-suggestions-title');

        link.classList.toggle('search-suggestions-item-virtual-page',result.details.virtualPage !== undefined);
        link.setAttribute('href', result.details.url);
        labelTitle.textContent = result.details.title;
        titleArea.appendChild(labelTitle);

        if (result.details.sectionLabel) {
            const labelPath = func.createEl('span',['search-suggestions-path','search-secondary-string']);
            labelPath.textContent = result.details.sectionLabel;
            titleArea.appendChild(labelPath);
        }

        link.appendChild(titleArea);

        function regenHighlights() {
            const els = generateHighlightEls(result, matchWidthBasis, ['search-suggestions-match-string','search-secondary-string']),
                  matchesMore = func.createEl('span','search-suggestions-matches-more'),
                  moreInfo = moreMatchesCheck(result.matches.length, els.length),
                  list = [];

            els.forEach((el) => {
                const li =  func.createEl('li','search-suggestions-match');
                li.appendChild(el);
                list.push(li);
            });

            // If match string is empty show label(s) indicating what it was matched to
            if (els.length === 0) {
                list.push(...generateMatchLabels(result));
                matchesCont.classList.add('labels-only');
            } else {
                if (moreInfo.total !== 0) {
                    const lastItem = els[els.length - 1].parentNode;
                    lastItem.classList.add('has-more-matches');
                    matchesMore.textContent = `+ ${moreInfo.total}`;
                    lastItem.appendChild(matchesMore);
                    // Delay for when element inserted in DOM
                    setTimeout(() => {
                        lastItem.style.setProperty('--more-matches-width',`${matchesMore.offsetWidth}px`);
                    },0);
                }
            }

            matchesCont.replaceChildren(...list);
        }

        regenHighlights();
        suggestCont.metaStore = {
            targetClass: matchesContClass
        }
        matchesCont.metaStore = {
            regenHighlights: regenHighlights // store function in element so the highlights can be independently regenerated during container resizes
        }

        link.appendChild(matchesCont);
        listItem.appendChild(link);
        if (result.details.title != 'redirect.html') {
            suggestList.appendChild(listItem);
        }
    });

    // Add full search results link
    const totalResults = results[0].meta.totalResults,
          allResultsListItem = func.createEl('li','search-suggestions-item-container'),
          allResultsLink = func.createEl('a',['search-suggestions-item','search-show-all-results']),
          allResultsString = func.createEl('span',['search-show-all-results-string','search-secondary-string']);
    allResultsLink.setAttribute('href', searchUrl(results[0].meta.query));
    allResultsString.textContent = `See ${func.pluralize(totalResults, pluralAll)} ${totalResults} ${func.pluralize(totalResults, pluralResults)}`;
    allResultsLink.appendChild(allResultsString);
    allResultsListItem.appendChild(allResultsLink);
    suggestList.appendChild(allResultsListItem);
}

// Generate match string elements
function generateHighlightEls(result, matchWidthBasis, textClasses) {
    const highlightStrings = parseHighlights({
        query: result.meta.query,
        content: result.details.contentCleaned,
        indices: result.matchesCleaned,
        expansionWidth: getExpansionWidth(matchWidthBasis)
    });

    const highlightEls = [];
    highlightStrings.forEach((string, i) => {
        const text = func.createEl('span',textClasses);
        text.appendChild(highlightSubstring(string,result.meta.queryCleaned.replaceAll('"','')));
        highlightEls.push(text);
    });
    return highlightEls
}

function generateMatchLabels(result) {
    const list = [];
    // Check if string has been excluded from matched strings due to markup cleaning
    if (result.matches.length > result.matchesCleaned.length) {
        const matchedMarkup = func.createEl('li',['search-more-matches-label','has-counter']);
        matchedMarkup.setAttribute('data-counter', result.matches.length);
        matchedMarkup.textContent = 'Matched markup';
        list.push(matchedMarkup);
    }

    // Check if string appears in other keys
    const otherMatches = findKeysWithMatches(result.details, ['title','url','tags'], tokenizeQuery(result.meta.queryCleaned));
    if (otherMatches) {
        otherMatches.forEach((match) => {
            const label = func.createEl('li','search-more-matches-label');
            if (match === 'url') match = match.toUpperCase();
            label.textContent = `Matched ${match}`;
            list.push(label);
        });
    }

    return list
}

function getExpansionWidth(matchWidthBasis) {
    const resultsWidth = matchWidthBasis.refEl.offsetWidth,
          currentExpansion = Math.round(matchWidthBasis.expansion * (resultsWidth / matchWidthBasis.contWidth));
    return currentExpansion
}

function parseResults({
    query,
    input,
    range = {
        min: 0,
        max: undefined
    }
}) {
    let source = JSON.parse(JSON.stringify(input)), /* deep copy */
        totalResults = 0;
    const queryExclusions = exclusionTokens(query),
          parsedArray = [];

    // Apply custom filters to results input
    source = filterResultsByExclusionStrings(source,queryExclusions);

    if (source.length === 0) return parsedArray
    totalResults = source.length;

    source.slice(range.min,range.max).forEach((result) => {
        const newResult = {
            details: result.item,
            meta: {}
        };

        // Format any section paths
        const path = result.item.url,
              parts = [...String(path).replace('/?/','/').split('/')],
              levels = parts.length - 2;
        if (levels > 1) {
            const parentPath = getParentPath(path, parts),
                  formatted = func.trimTrailFs(parentPath).replace('/?/','/').replace('/',' ').replaceAll('/',' / ').replaceAll('_',' ').replaceAll('-',' ').replaceAll('/ ?','');
            newResult.details.sectionLabel = formatted;
        }

        const { queryCleaned, contentCleaned, matches, matchesCleaned } = parseMatches({
            query: query,
            queryExclusions: queryExclusions,
            item: result.item
        });

        newResult.details.contentCleaned = contentCleaned;
        newResult.details.firstImage = getFirstImage(result.item.content);
        newResult.matches = matches;
        newResult.matchesCleaned = matchesCleaned;
        newResult.meta.query = query;
        newResult.meta.queryCleaned = queryCleaned;
        newResult.meta.queryExclusions = queryExclusions;
        newResult.meta.totalResults = totalResults; // store total results independent of range slice

        parsedArray.push(newResult);
    });

    return parsedArray
}

function getFirstImage(input) {
    // Check for images
    let regex = regexHasMedia.image,
        match = regex.exec(input),
        results = {};

    if (match) {
        results.image = match[3];
        results.imageIndex = match.index;
    }

    // Check for videos
    regex = regexHasMedia.videoIframe;
    match = regex.exec(input);
    if (match) {
        if (match[0].includes('youtube') && match[1]) {
            results.video = `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg`;
            results.videoIndex = match.index;
        }
    }

    // See which came first
    if (results.image && results.video) {
        if (results.imageIndex > results.videoIndex) {
            return results.video
        } else {
            return results.image
        }
    }

    return results.image ?? results.video ?? null
}

function parseMatches({
    query,
    queryExclusions = [],
    item
}) {
    const queryCleaned = cleanQuery(query,queryExclusions),
          tokens = tokenizeQuery(queryCleaned);

    const contentCleaned = stripExclusionsFromString(item.content, visualExclusions).trim(),
          tokenIndices = getTokenIndices(item.content,tokens),
          tokenIndicesCleaned = getTokenIndices(contentCleaned,tokens),
          flatIndices = Object.values(tokenIndices).flat(), // combine all per-token indices into one array
          flatIndicesCleaned = Object.values(tokenIndicesCleaned).flat(),
          filteredIndices = filterIndicesByRegex(contentCleaned, flatIndicesCleaned, matchExclusions);

    const matches = flatIndices,
          matchesCleaned = filteredIndices;
    return { queryCleaned, contentCleaned, matches, matchesCleaned }
}

function parseHighlights({
    query,
    content,
    indices,
    totalHighlights = 2,
    expansionWidth
}) {
    let strings = matchGetHighlights(content, indices, expansionWidth);
    strings = sortStringsByRelevancy(strings,query.replaceAll('"',''));

    // Check similarity of strings to avoid showing multiple too similar matches
    const similarityThreshold = 0.5,
          uniqueStrings = [];

    for (let string of strings) {
        if (uniqueStrings.every(existing => stringSimilarity(existing, string) < similarityThreshold)) {
            uniqueStrings.push(string);
        }
        if (uniqueStrings.length >= totalHighlights) break;
    }

    const highlightStrings = uniqueStrings;
    return highlightStrings
}

function moreMatchesCheck(matchesLength, stringMatchesCount) {
    const total = matchesLength - stringMatchesCount, // occasionally non-exact since adjacent matches get merged for the string representation (which is also dynamically changing in length)
          string = func.pluralize(total, pluralMatches);
    return {
        total: total,
        string: string
    }
}

// Returns an array of the key names that contain substring matches of the provided tokens
function findKeysWithMatches(obj, keysToCheck, tokens) {
    tokens = tokens.map(token => token.toLowerCase());
    const matchingKeys = [];

    for (const key of keysToCheck) {
        const value = obj[key];
        if (!value) continue; // skip key if value empty

        let toSearch = [];
        if (typeof value === 'string') {
            toSearch.push(value);
        } else if (Array.isArray(value)) {
            toSearch = value;
        } else {
            continue;
        }

        // For each token check if it's a substring of anything in toSearch
        for (const token of tokens) {
            for (const str of toSearch) {
                if (typeof str === 'string' && str.toLowerCase().includes(token)) {
                    matchingKeys.push(key);
                    break; // stop checking against more strings from this key
                }
            }
            if (matchingKeys.includes(key)) {
                break; // stop iterating on tokens if key match found already
            }
        }
    }
    return matchingKeys
}

function tokenizeQuery(query) {
    const tokenRegex = /"([^"]+)"|\S+/ig;
    const tokens = [];
    let match;
    while ((match = tokenRegex.exec(query)) !== null) {
        // If token is doublequoted then use the captured group otherwise use whole match
        tokens.push(match[1] || match[0]);
    }
    return tokens
}

function getTokenIndices(string, tokens) {
    const results = {};
    // Escape tokens for use in regex
    const escapedTokens = tokens.map(token => regexEscapeString(token)),
          pattern = new RegExp(escapedTokens.join('|'), 'ig'); // case-insensitive

    let match;
    while ((match = pattern.exec(string.toLowerCase())) !== null) {
        const foundToken = match[0];
        if (!results[foundToken]) results[foundToken] = [];
        results[foundToken].push([match.index, pattern.lastIndex]);

        // Avoid infinite loop if stuck on a zero-width match
        if (match.index === pattern.lastIndex) {
            pattern.lastIndex++;
        }
    }
    return results
}

function exclusionTokens(query) {
    const excluded = [];

    // Obtain multi-word exclusion strings (like `!"some term"`)
    const multiwordRegex = /!"([^"]+?)"/g;
    let match;
    while ((match = multiwordRegex.exec(query)) !== null) {
        excluded.push(match[1]);
    }
    const querySansMultiwordExclusions = query.replace(multiwordRegex, '');

    // Strip substrings that are wrapped in double quotes (to avoid parsing any `!` within the remaining query that aren't meant to be exclusion operators)
    const querySansLiterals = querySansMultiwordExclusions.replace(/"[^"]*"/g, '');

    // Parse remaining query
    const tokens = querySansLiterals.split(/\s+/); // space delimited
    tokens.forEach(token => {
        token = token.trim();
        if (token.startsWith('!') && token.length > 1) {
            excluded.push(token.substring(1));
        }
    });

    return excluded
}

function filterResultsByExclusionStrings(results, exclusionArray) {
    return results.filter(obj => {
        const toExclude = exclusionArray.some(token => {
            for (let key in obj.item) {
                const value = obj.item[key];
                token = token.toLowerCase();

                if (typeof value === 'string' && value.toLowerCase().includes(token)) {
                    return true
                }

                // Parse arrays (for tags)
                if (Array.isArray(value)) {
                    if (value.some(elem => typeof elem === 'string' && elem.toLowerCase().includes(token))) {
                        return true
                    }
                }
            }
            return false
        });

        return !toExclude
    });
}

function regexEscapeString(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function regexAddGlobalFlag(regex) {
    let flags = regex.flags;
    if (!flags.includes('g')) {
        flags += 'g';
    }
    return new RegExp(regex.source, flags)
}

function regexCheckType(input) {
    let regex;
    if (typeof input === 'string') {
        regex = new RegExp(regexEscapeString(input), 'g');
    } else if (input instanceof RegExp) {
        regex = regexAddGlobalFlag(input);
    } else if (typeof input === 'object' && input.regex instanceof RegExp) {
        regex = regexAddGlobalFlag(input.regex);
    } else {
        throw new Error('Invalid regex argument');
    }
    return regex
}

function regexGetMatchIndices(string, pattern) {
    let match,
        keepGroups = [];
    const indices = [],
          regex = regexCheckType(pattern);

    // Check if arg is object containing regex and desired capture group inclusion array
    if (typeof pattern === 'object' && pattern.regex instanceof RegExp) {
        keepGroups = Array.isArray(pattern.keepGroups) ? pattern.keepGroups : [];
    }

    while ((match = regex.exec(string)) !== null) {
        const overallStart = match.index;

        // If no capture groups specified then exclude entire match
        if (!keepGroups.length) {
            indices.push([overallStart, overallStart + match[0].length]);
        } else {
            // Search within match for the included capture group(s)
            let keptIntervals = [],
                searchFrom = 0;

            for (const groupNum of keepGroups) {
                const groupString = match[groupNum];

                if (groupString == null) continue; // skip if group didn't capture anything

                const pos = match[0].indexOf(groupString, searchFrom);
                if (pos === -1) continue;
                keptIntervals.push([pos, pos + groupString.length]);
                searchFrom = pos + groupString.length; // update search position to avoid parsing earlier parts again
            }

            // Find the excluded intervals relative to match[0]
            let excludedIntervals = [],
                current = 0;
            for (const [keepStart, keepEnd] of keptIntervals) {
                // Any string from current index up to start of a kept interval is excluded
                if (keepStart > current) {
                    excludedIntervals.push([current, keepStart]);
                }
                current = keepEnd;
            }

            // Exclude anything after the last kept group until the end of match[0]
            if (current < match[0].length) {
                excludedIntervals.push([current, match[0].length]);
            }

            // Convert each relative interval to global indices
            for (const [relStart, relEnd] of excludedIntervals) {
                // Skip empty intervals
                if (relStart !== relEnd) {
                    indices.push([overallStart + relStart, overallStart + relEnd]);
                }
            }
        }

        // Commonly recommended method of avoiding an infinite loop if stuck on a zero-width match
        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }
    }

    return indices
}

function cleanQuery(query, exclusionArray) {
    exclusionArray.forEach(exclusion => {
        const escapedExclusion = regexEscapeString(exclusion),
              regex = new RegExp(`!(?:"${escapedExclusion}"|${escapedExclusion})`, 'g'); // matches double quotes or sans, prefixes exclamation mark for the pattern since they're stripped from the input array
        query = query.replaceAll(regex, '');
      });

    return stripOperators(query)
}

function stripOperators(string) {
    const tokenRegex = /"[^"]*"|\S+/g, // match either double-quoted substring or a non-space substring
          tokens = string.match(tokenRegex) || [];

    const processedTokens = tokens.map(token => {
        if (token.startsWith('"') && token.endsWith('"')) {
            token = token.replace(/^"(\^)/, '"'); // remove `^` if appears after opening quote
            token = token.replace(/\$(?="$)/, ''); // remove `$` if appears before  closing quote
        } else {
            token = token.replace(/^\^/, '').replace(/\$/, ''); // otherwise remove chars if they appear in their leading/trailing positions
        }
        token = token.replaceAll('|',''); // remove pipe characters as fuse.js seems to handle them as OR operators even within doublequoted tokens
        token = token.replaceAll(/\s+/g,' '); // collapse consecutive whitespace
        return token
    });

    return processedTokens.join(' ');
}

// Expand each string match by n length on both sides for context. If near start/end expand from other side.
function matchExpandContext(indices, contextExtraLength, stringLength) {
    const extra = contextExtraLength;
    return indices.map(([s, e]) => {
        const leftShort  = s < extra ? extra - s : 0,
              rightShort = (stringLength - e - 1) < extra ? extra - (stringLength - e - 1) : 0;
        return [
            Math.max(0, s - (extra + rightShort)),
            Math.min(stringLength, e + (extra + leftShort) + 1)
        ];
    });
}

function mergeIndices(indices,mergeAdjacent = true) {
    if (!indices.length) return [];

    indices.sort((a, b) => a.start - b.start);

    if (mergeAdjacent) {
        // Merge only at index boundaries
        const merged = [indices[0]];
        for (const interval of indices.slice(1)) {
            const last = merged[merged.length - 1];
            if (interval.start <= last.end) {
                last.end = Math.max(last.end, interval.end);
            } else {
                merged.push(interval);
            }
        }
        return merged
    } else {
        // Otherwise merge only for traditional overlaps
        let current = indices[0];
        const merged = [];
        for (const interval of indices.slice(1)) {
            if (interval.start <= current.end) {
                current.end = Math.max(current.end, interval.end);
            } else {
                merged.push(current);
                current = interval;
            }
        }
        merged.push(current);
        return merged
    }
}

function truncateIndices(indices, maxLength) {
    if (!maxLength) return indices

    return indices.map(interval => {
        const [start, end] = interval,
              currentLength = end - start;

        if (currentLength <= maxLength) {
            return [start, end]
        }

        const excess = currentLength - maxLength,
              removeLeft = Math.floor(excess / 2), // remove half excess from each side
              removeRight = Math.ceil(excess / 2);

        return [start + removeLeft, end - removeRight]
    });
}

function matchGetHighlights(string, indices, contextExtraLength = 20) {
    const expandedIndices = matchExpandContext(indices, contextExtraLength, string.length);
    let mergedIndices = mergeIndices(expandedIndices);
    mergedIndices = truncateIndices(mergedIndices, contextExtraLength * 2);

    return mergedIndices.map(([start, end]) => {
        const ellipsis = '…';
        const prefix = start > 0 ? ellipsis : '',
              suffix = end < string.length ? ellipsis : '';
        return prefix + string.substring(start, end).trim() + suffix
    });
}


function checkIndicesOverlap(aStart, aEnd, bStart, bEnd) {
    return aStart < bEnd && bStart < aEnd
}

// Return new array of only index ranges that don't overlap
function filterIndicesByOverlap(origIndices, exclusionIndices) {
    return origIndices.filter(([origStart, origEnd]) => {
        for (const [exclStart, exclEnd] of exclusionIndices) {
            if (checkIndicesOverlap(origStart, origEnd, exclStart, exclEnd)) {
                return false
            }
        }
        return true
    });
}

// Return new array of only index ranges that don't match the exclusion patterns
function filterIndicesByRegex(string, origIndices, exclusionArray) {
    let filtered = origIndices;

    function update(indices,pattern) {
        const regexIndices = regexGetMatchIndices(string,pattern);
        filtered = filterIndicesByOverlap(indices,regexIndices);
    }

    exclusionArray.forEach((pattern) => {
        pattern = regexCheckType(pattern);
        update(filtered,pattern);
    });

    return filtered
}

function highlightSubstring(string, query) {
    const fragment = document.createDocumentFragment();

    // If empty query return as-is
    if (!query.trim()) {
        fragment.appendChild(document.createTextNode(string));
        return fragment;
    }

    // Split query into tokens by whitespace
    const tokens = query.trim().split(/\s+/).filter(token => token.length > 0),
          lowerText = string.toLowerCase();
    let indices = [];

    tokens.forEach(token => {
        const lowerToken = token.toLowerCase();
        let startIndex = 0;
        while (startIndex < string.length) {
            const index = lowerText.indexOf(lowerToken, startIndex);
            if (index === -1) break;
            indices.push({ start: index, end: index + token.length });
            startIndex = index + token.length;
        }
    });

    // If no matches append entire string as text node
    if (indices.length === 0) {
        fragment.appendChild(document.createTextNode(string));
        return fragment
    }

    const mergedIndices = mergeIndices(indices,false);

    let lastIndex = 0;
    mergedIndices.forEach(interval => {
        // Append any string before the current highlight
        if (interval.start > lastIndex) {
            fragment.appendChild(document.createTextNode(string.substring(lastIndex, interval.start)));
        }
        const boldNode = document.createElement("b");
        boldNode.textContent = string.substring(interval.start, interval.end);
        fragment.appendChild(boldNode);
        lastIndex = interval.end;
    });

    // Append any remaining string after last match
    if (lastIndex < string.length) {
        fragment.appendChild(document.createTextNode(string.substring(lastIndex)));
    }

    return fragment
}

function sortStringsByRelevancy(strings, referenceString) {
    const tokens = referenceString.split(/\s+/).filter(Boolean);

    function countMatches(text) {
        const lowerText = text.toLowerCase();
        let count = 0;
        for (const word of tokens) {
            if (lowerText.includes(word.toLowerCase())) {
                count++;
            }
        }
        return count
    }

    // Sort by by number of tokens contained in each string
    return strings.slice().sort((a, b) => {
        const countA = countMatches(a),
              countB = countMatches(b);
        return countB - countA
    });
}

function stripExclusionsFromString(string, exclusionArray) {
    let modified = string;

    for (let pattern of exclusionArray) {
        const regex = regexCheckType(pattern);
        let newStringParts = [],
            lastIndex = 0,
            match;

        while ((match = regex.exec(modified)) !== null) {
            // console.log('matched:', match[0], 'index:', match.index, 'length:', match[0].length)
            let intervals;
            if (typeof pattern === 'object' && pattern.regex instanceof RegExp) {
                intervals = regexGetMatchIndices(modified.slice(match.index, match.index + match[0].length), pattern);
                intervals = intervals.map(interval => [match.index + interval[0], match.index + interval[1]]);
            } else {
                // Otherwise always remove the entire match
                intervals = [[match.index, match.index + match[0].length]];
            }

            for (let [start, end] of intervals) {
                newStringParts.push(modified.slice(lastIndex, start));
                lastIndex = end;
            }
        }
        newStringParts.push(modified.slice(lastIndex));
        modified = newStringParts.join('');
    }

    return modified
}

// Levenshtein distance function
function levenshtein(string1, string2) {
    const rows = string1.length + 1,
          cols = string2.length + 1,
          d = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) d[i][0] = i;
    for (let j = 0; j < cols; j++) d[0][j] = j;

    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            const cost = string1[i - 1] === string2[j - 1] ? 0 : 1;
            d[i][j] = Math.min(
                d[i - 1][j] + 1,
                d[i][j - 1] + 1,
                d[i - 1][j - 1] + cost
            );
        }
    }
    return d[string1.length][string2.length];
}

function stringSimilarity(string1, string2) {
    const distance = levenshtein(string1, string2),
          maxLen = Math.max(string1.length, string2.length);
    if (maxLen === 0) return 1
    return 1 - (distance / maxLen)
}

export {
    searchInput,
    pluralResults,
    filterStatesInit,
    fuseDefaultOptions,
    createResizeObserver,
    createFilterController,
    createLookupIndex,
    parseResults,
    parseHighlights,
    highlightSubstring,
    generateHighlightEls,
    generateMatchLabels,
    getExpansionWidth,
    moreMatchesCheck,
    resetAll
}

{% endif %}