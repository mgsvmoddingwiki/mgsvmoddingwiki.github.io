import * as func from './functions.js';
import {
    searchInput,
    searchInputChange,
    searchClearShow,
    pluralResults,
    filterStatesInit,
    fuseDefaultOptions,
    yamlLookupPrefilter,
    yamlKeyMap,
    styleTokens,
    updateQueryTokens,
    createResizeObserver,
    createFilterController,
    createLookupIndex,
    parseResults,
    parseHighlights,
    highlightSubstring,
    generateHighlightEls,
    generateMatchLabels,
    getExpansionWidth,
    moreMatchesCheck
} from './searchdata.js';

const wikiContentCont = document.getElementById('git-wiki-content'),
      urlParams = decodeUrl(),
      disabledTokenRanges = new Set();
let queryCur,
    queryTokens,
    queryInfoCont,
    queryInfoPrefix,
    filtersCont,
    resultsCont,
    resultsContPriorWidth,
    paginationCont,
    totalResults,
    pagesMapping,
    itemsPerPage = 25;

initSetup();

const filterHandlers = {
    limitToSection: {
        handler: (key, state) => {}
    },
    excludeEntityRef: {
        handler: (key, state) => {}
    },
    excludeStubs: {
        handler: (key, state) => {}
    },
    ignoreMarkup: {
        handler: (key, state) => {}
    },
    hasMedia: {
        handler: (key, state) => {}
    }
}

const resultsFilters = createFilterController(filterStatesInit, filterHandlers),
      lookupIndex = createLookupIndex(resultsFilters);

function queryPrefixHandling(val) {
    const index = lookupIndex(resultsFilters.getState('limitToSection'), urlParams.section),
          { filtered } = yamlLookupPrefilter(index, queryTokens, yamlKeyMap, fuseDefaultOptions);
    return filtered
}

initHtmlResults();
outputResults();

const searchResultsResizeObserver = createResizeObserver();
searchResultsResizeObserver.observe(resultsCont);

function initSetup() {
    body.classList.add('search-page');

    // Initialize default filter states based on URL parameters
    Object.keys(filterStatesInit).forEach((key) => {
        filterStatesInit[key].state = false;
        filterStatesInit[key].state = urlParams.filters.includes(key);
    });

    // Pre-fill query in search input for easy modification (keep in mind this doesn't adjust of the filters for the suggestions since they're independent)
    searchInputChange(urlParams.query);
    searchClearShow(true, true);
}

function initHtmlResults() {
    queryCur = urlParams.query;
    queryTokens = updateQueryTokens(queryCur);
    queryInfoCont = func.createEl('div','search-results-query-info-wrapper');
    resultsCont = func.createEl('ul','search-results-wrapper');
    filtersCont = func.createEl('div','search-results-filters-wrapper');
    paginationCont = func.createEl('ul','search-results-pagination-wrapper');

    wikiContentCont.append(
        queryInfoCont,
        filtersCont,
        resultsCont,
        paginationCont
    );
}

function paginationData() {
    const totalPages = Math.ceil(totalResults / itemsPerPage);

    // Generate array with min and max range per page
    pagesMapping = Array.from({ length: totalPages }, (_, pageIndex) => {
        const min = pageIndex * itemsPerPage,
              max = Math.min(totalResults, (pageIndex + 1) * itemsPerPage);
        return { min, max }
    });
}

function decodeUrl() {
    const params = new URLSearchParams(window.location.search);
    return {
        params: params,
        query: params.get('q'),
        filters: params.getAll('filter'),
        section: params.get('section')
    }
}

function getResults(range) {
    return parseResults({
        queryTokens: queryTokens,
        input: queryPrefixHandling(queryCur),
        range: range
    });
}

function outputResults() {
    const parsedResults = getResults({ min: 0, max: itemsPerPage }); // default range for first page
    totalResults = parsedResults[0] ? parsedResults[0].meta.totalResults : 0;
    paginationData();
    presentResults(parsedResults);
}

function styleQueryResult(text, items, cont) {
    const queryTokenButtonLookup = new Map(); // for keeping related items in the same button
    styleTokens(text, items, cont, {
        mergeNegated: (meta, index) => { return true },
        shouldMergeItem: (meta, index) => {
            const item = items[index];
            if (item) return true // wrap all
        },
        spanClassFor: (meta, kind) => {
            const base = 'search-results-query-info-token',
                  kindSel = `token-${kind}`;
            return `${base} ${kindSel}`
        },
        makeWrapper: (meta, start, end, segments) => {
            const key = meta.itemIndex;
            if (queryTokenButtonLookup.has(key)) return queryTokenButtonLookup.get(key)
            const button = func.createEl('span','search-results-query-info-token-button');
            queryTokenButtonLookup.set(key, button);
            meta.wrapperStart = start;
            meta.wrapperEnd = end;

            button.addEventListener('click', (e) => {
                const key = rangeKey(start, end);
                if (disabledTokenRanges.has(key)) {
                    disabledTokenRanges.delete(key);
                    button.classList.remove('disabled');
                } else {
                    disabledTokenRanges.add(key);
                    button.classList.add('disabled');
                }
                const newQuery = genNewQuery(segments);
                queryTokens = updateQueryTokens(newQuery);
                outputResults();
            });

            return button
        }
    })
}

function rangeKey(start, end) {
    return `${start}:${end}`
}

function genNewQuery(segments) {
    const chars = Array.from(urlParams.query);
    segments.forEach((seg) => {
        const s = seg.meta.wrapperStart,
              e = seg.meta.wrapperEnd,
              key = rangeKey(s, e);
        if (!disabledTokenRanges.has(key)) return
        // Replace toggled excluded ranges with same length whitespace then later collapse whitespace for new output query
        for (let i = s; i < e && i < chars.length; i++) {
            chars[i] = ' ';
        }
    });
    return chars.join('').replace(/\s+/g, ' ').trim();
}

function updateResultsCounter() {
    queryInfoPrefix.textContent = `${totalResults} ${func.pluralize(totalResults, pluralResults)} for:`
}

function presentResults(results) {
    presentResultItems(results);

    // Query info
    if (!queryInfoCont.hasChildNodes()) {
        queryInfoPrefix = func.createEl('span','search-results-query-info-prefix');
        const queryInfoQuery = func.createEl('div','search-results-query-info-query');
        styleQueryResult(urlParams.query, [...queryTokens.keyPrefixes, ...queryTokens.standalone], queryInfoQuery);
        queryInfoCont.replaceChildren(queryInfoPrefix, queryInfoQuery);
    }

    updateResultsCounter();

    // Filters list
    if (!filtersCont.hasChildNodes()) {
        const filtersListCont = func.createEl('ul','search-results-filters-list-wrapper'),
              filtersLabel = func.createEl('span','search-results-filters-label');
        filtersLabel.textContent = 'Filters';

        resultsFilters.forEach((filter, state) => {
            if (filter === 'limitToSection' && !urlParams.section) return
            const item = func.createEl('li','search-results-filter-item'),
                  button = func.createEl('span','search-filter-button');
            button.textContent = resultsFilters.getString(filter);
            if (filter === 'limitToSection') {
                button.setAttribute('data-tooltip-text', `Section: ${urlParams.section}`);
            }
            if (state) {
                button.classList.toggle('active', state);
            }
            button.addEventListener('click', (e) => {
                button.classList.toggle('active');
                resultsFilters.toggle(filter);
                outputResults();
            });
            item.appendChild(button);
            filtersListCont.appendChild(item);
        });

        filtersCont.replaceChildren(filtersLabel, filtersListCont);
    }

    // Pagination list
    const pages = [];
    pagesMapping.forEach((page, i) => {
        const item = func.createEl('li','search-results-pagination-item');

        item.textContent = i + 1; // since zero-based array
        if (i === 0) item.classList.add('active'); // default to first page active

        item.addEventListener('click', (e) => {
            const lastActive = paginationCont.querySelector('.active');
            lastActive.classList.remove('active');
            item.classList.add('active');
            presentResultItems(getResults(pagesMapping[i]));
            // Micro-delay since if triggered immediately it sometimes fails to scroll
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'auto' // inherit CSS `scroll-behavior` value
                });
            }, 100);
        });

        pages.push(item);
    });
    paginationCont.replaceChildren(...pages);
}

function presentResultItems(results) {
    const matchWidthBasis = {
        refEl: wikiContentCont,
        contWidth: 850,
        expansion: 100
    }

    const fragment = new DocumentFragment();

    if (results) {
        results.forEach((result) => {
            const resultCont = func.createEl('li','search-result-wrapper'),
                  firstArea = func.createEl('div','search-result-first-area'),
                  secondArea = func.createEl('div','search-result-second-area'),
                  imageCont = func.createEl('div','search-result-image-wrapper'),
                  title = func.createEl('a','search-result-title'),
                  sectionLabel = func.createEl('span','search-result-section-path'),
                  tagsCont = func.createEl('ul','search-result-tags-list'),
                  matchesContClass = 'search-result-matches-wrapper',
                  matchesCont = func.createEl('div', matchesContClass),
                  matchesList = func.createEl('ul','search-result-matches-list'),
                  matchesMore = func.createEl('span','search-result-match-more');

            if (result.details.firstImage) {
                const imagePath = result.details.firstImage,
                      image = func.createEl('img','search-result-image');

                image.src = imagePath;
                imageCont.appendChild(image);
                resultCont.classList.add('has-image','ib');
                tagsCont.classList.add('ib-tags-list');
            } else {
                imageCont.classList.add('hidden-generic');
            }

            title.href = result.details.url;
            title.textContent = result.details.title;

            sectionLabel.textContent = result.details.sectionLabel;

            result.details.tags.forEach((tag) => {
                const item = func.createEl('li','search-result-tag-list-item'),
                      link = func.createEl('a',['search-result-tag-list-tag', 'tag-list-tag']);

                if (result.details.firstImage) {
                    item.classList.add('ib-tag-list-item');
                    link.classList.add('ib-tag-list-tag')
                }

                link.href = func.formatTagAsLink(tag);
                link.textContent = tag;
                item.appendChild(link);
                tagsCont.appendChild(item);
            });

            function regenHighlights() {
                let els = [];
                if (result.meta.queryPositives?.tokens?.length > 0) {
                    els = generateHighlightEls(result, matchWidthBasis, 'search-result-match-string');
                }
                const moreInfo = moreMatchesCheck(result.matches.length, els.length),
                      list = [];

                els.forEach((el) => {
                    const li =  func.createEl('li','search-result-match');
                    li.appendChild(el);
                    list.push(li);
                });

                if (els.length === 0) {
                    list.push(...generateMatchLabels(result));
                    matchesList.classList.add('labels-only');
                    matchesMore.classList.add('hidden-generic');
                } else {
                    if (moreInfo.total !== 0) {
                        matchesMore.textContent = `+ ${moreInfo.total} more ${moreInfo.string}`;
                    } else {
                        matchesMore.classList.add('hidden-generic');
                    }
                }

                matchesList.replaceChildren(...list);
            }

            regenHighlights();
            resultsCont.metaStore = {
                targetClass: matchesContClass
            }
            matchesCont.metaStore = {
                regenHighlights: regenHighlights
            }

            matchesCont.append(
                matchesList,
                matchesMore
            );

            firstArea.append(
                imageCont,
                title,
                sectionLabel,
                tagsCont,
            );

            secondArea.append(
                matchesCont
            );

            resultCont.append(
                firstArea,
                secondArea
            );

            fragment.appendChild(resultCont);
        });
    }
    resultsCont.replaceChildren(fragment);
}