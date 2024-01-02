---
layout: null
is_wiki_page: false
---

{% if site.search_engine == "js" %}

const searchWrapper = body.querySelector('.git-wiki-search-js'),
      searchInput = searchWrapper.querySelector('#search-input');
initHtml()
const searchClear = searchWrapper.querySelector('.search-clear-query'),
      searchFilter = searchWrapper.querySelector('.search-section-filter'),
      resultsContainer = searchWrapper.querySelector('#results-container'),
      resultsMax = 10;

import { searchIndex } from './searchindex.js'
import { sectionIndexFlat } from './sidebar.js'
import { getParentPath } from './sidebar.js'

var enableSectionIndex = false,
    lookupIndex = useSectionIndex(enableSectionIndex);

// Switch to section index by default if detected
if (sectionIndexFlat.length > 1) {
    enableSectionIndex = true;
    useSectionIndex(true);
    searchFilterShow(true);
    searchFilterActive(true);
}

var fuse = fuseConfig(enableSectionIndex),
    keyNavCurItem, // currently selected item for keyboard nav
    keyNavCodes = {
        arrowUp: 38,
        arrowDown: 40,
        enter: 13,
        esc: 27,
        tab: 9,
        shift: 16 // for whatever reason the keyup listener doesn't detect `shiftKey` but does detect the raw keycode so it's added here
    }

searchInput.addEventListener('keyup', (e) => {
    const val = e.target.value;
    // Trigger on every key except those used for nav
    if (!matchObjVal(keyNavCodes, e.keyCode)) {
        if (typeof val != 'undefined' && val != null && val.length != 0) {
            outputResults(fuse.search(val), e.keyCode);
            searchResultsShow(true); // retrigger visibility check on character deletion
        } else {
            searchClearShow(false);
            searchNoResults(false);
            searchResultsShow(false);
        }
    } else {
        // Defocus input
        if (e.keyCode == keyNavCodes.esc) {
            // Chromium/Firefox handles this fine but Vivaldi seems to hijack the Esc key
            searchInput.blur();
            searchResultsShow(false);
        }
    }
});

searchInput.addEventListener('keydown', (e) => {
    if (resultsContainer.classList.contains('visible')) {
        if (matchObjVal(keyNavCodes, e.keyCode)) {
            e.preventDefault(); // disable native key functionality (necessary for tab handling)
            searchKeyNav(e); // pass entire event not just keyCode, so modifiers can be detected
        }
    }
});

body.addEventListener('click', (e) => {
    if (e.target == searchInput || e.target == resultsContainer || e.target == searchFilter) {
        searchResultsShow(true);
    } else {
        searchResultsShow(false);
    }
});

searchFilter.addEventListener('click', (e) => {
    enableSectionIndex = !enableSectionIndex;
    searchFilterActive(enableSectionIndex);
});

searchClear.addEventListener('click', (e) => {
    searchInput.value = null;
    searchClearShow(false);
    searchNoResults(false);
});

function initHtml() {
    let actions = document.createElement('div'),
        noResults = document.createElement('span'),
        sectionFilter = document.createElement('span'),
        clear = document.createElement('button'),
        results = document.createElement('ul');
    actions.classList.add('search-actions');
    noResults.classList.add('search-no-results');
    sectionFilter.classList.add('search-section-filter');
    clear.classList.add('search-clear-query');
    results.id = 'results-container';
    noResults.textContent = 'No Results';
    sectionFilter.textContent = 'Filter to section';
    actions.appendChild(noResults);
    actions.appendChild(sectionFilter);
    actions.appendChild(clear);
    searchWrapper.insertBefore(actions, searchInput);
    searchWrapper.appendChild(results);
}

function fuseConfig(indexState) {
    useSectionIndex(indexState);
    return new Fuse(lookupIndex, {
        keys: [
            { name: 'title', weight: 3 }, // increase title relevance to result ordering
            { name: 'url', weight: 0.1 }, // to be able to match tag-less sub-section pages (needs very low weight)
            { name: 'tags', weight: 2 },
            { name: 'content', weight: 0.5 } // reducing this weight appears to improve perf
        ],
        threshold: 0, // effectively disable fuzzy matching by requiring exact matches
        useExtendedSearch: true, // enables query operators
        ignoreLocation: true // search through all text at expense of performance
    });
}

// Keyboard navigation
// https://stackoverflow.com/a/71951738
function searchKeyNav(e) {
    const a = resultsContainer.getElementsByTagName('a');
    var priorItem = keyNavCurItem;
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
        changeHighlight(a[keyNavCurItem], true, true)
        window.location.href = a[keyNavCurItem].href;
    }

    function updateItems() {
        changeHighlight(a[priorItem], false);
        changeHighlight(a[keyNavCurItem], true);
    }

    function changeHighlight(el, addClass, isActive) {
        if (addClass) {
            if (!isActive) {
                el.classList.add('highlight');
            } else {
                el.classList.add('active');
            }
        } else {
            el.classList.remove('highlight');
        }
    }
}

function searchResultsShow(state) {
    if (state) {
        if (searchClear.parentNode.classList.contains('clear') && !searchClear.parentNode.classList.contains('no-results')) {
            resultsContainer.classList.add('visible');
        }
    } else {
        resultsContainer.classList.remove('visible');
    }
}

function useSectionIndex(state) {
    if (state) {
        lookupIndex = sectionIndexFlat;
    } else {
        lookupIndex = searchIndex;
    }
}

function searchFilterActive(state) {
    searchClear.parentNode.classList.toggle('filtered', state);
    fuse = fuseConfig(state);
    let inputVal = searchInput.value;
    outputResults(fuse.search(inputVal), '');
    if (!inputVal) {
        searchClearShow(false);
        searchNoResults(false);
        searchResultsShow(false)
    }
}

function searchFilterShow(state) {
    searchClear.parentNode.classList.toggle('section', state);
}

function searchNoResults(state) {
    searchClear.parentNode.classList.toggle('no-results', state);
}

function searchClearShow(state) {
    searchClear.parentNode.classList.toggle('clear', state);
}

function outputResults(input, key) {
    searchClearShow(true);
    if (input.length != 0) {
        // Avoid resetting unless a non-shift key is pressed
        if (key != keyNavCodes.shift) {
            keyNavCurItem = -1; // reset currently highlighted item
            resultsContainer.replaceChildren(); // reset all list items
        }
        searchResultsShow(true);
        searchNoResults(false);
        input.slice(0,resultsMax).forEach((result) => {
            let listItem = document.createElement('li'),
                link = document.createElement('a'),
                labelTitle = document.createElement('span');
            link.classList.add('search-result-item');
            link.setAttribute('href', result.item.url);
            labelTitle.classList.add('search-result-title');
            labelTitle.textContent = result.item.title;
            link.appendChild(labelTitle);

            let path = result.item.url,
                parts = [...String(path).split('/')],
                levels = parts.length - 2;
            if (levels > 1) {
                let labelPath = document.createElement('span'),
                    parentPath = getParentPath(path, parts);
                labelPath.classList.add('search-result-path');
                labelPath.textContent = parentPath.replace('/', ' ').replaceAll('/',' / ').replaceAll('_',' ').replaceAll('-',' ').replace(/\/([^\/]*)$/, '$1'); // regex replaces last occurrence of `/`
                link.appendChild(labelPath);
            }

            listItem.appendChild(link);
            resultsContainer.appendChild(listItem);
        });
    } else {
        searchNoResults(true);
        searchResultsShow(false);
    }
}

{% endif %}