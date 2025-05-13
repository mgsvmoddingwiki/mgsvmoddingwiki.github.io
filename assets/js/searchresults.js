import * as func from './functions.js';
import {
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
    moreMatchesCheck
} from './searchdata.js';

const wikiContentCont = document.getElementById('git-wiki-content'),
      urlParams = decodeUrl();
let queryInfoCont,
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
        handler: (key, state) => {
            fuse = fuseConfig({});
        }
    },
    excludeEntityRef: {
        handler: (key, state) => {
            fuse = fuseConfig({});
        }
    },
    ignoreMarkup: {
        handler: (key, state) => {
            fuse = fuseConfig({});
        }
    },
    hasMedia: {
        handler: (key, state) => {
            fuse = fuseConfig({});
        }
    }
}

const resultsFilters = createFilterController(filterStatesInit, filterHandlers),
      lookupIndex = createLookupIndex(resultsFilters);

function fuseConfig({
    indexState = resultsFilters.getState('limitToSection'),
    input = lookupIndex(resultsFilters.getState('limitToSection'), urlParams.section),
    options = fuseDefaultOptions
}) {
    return new Fuse(input, options);
}
var fuse = fuseConfig({});

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
    searchInput.value = urlParams.query;
}

function initHtmlResults() {
    queryInfoCont = func.createEl('div','search-results-query-info-container');
    resultsCont = func.createEl('ul','search-results-container');
    filtersCont = func.createEl('div','search-results-filters-container');
    paginationCont = func.createEl('ul','search-results-pagination-container');

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
        query: urlParams.query,
        input: fuse.search(urlParams.query),
        range: range
    });
}

function outputResults() {
    const parsedResults = getResults({ min: 0, max: itemsPerPage }); // default range for first page
    totalResults = parsedResults[0] ? parsedResults[0].meta.totalResults : 0;
    paginationData();
    presentResults(parsedResults);
}

function presentResults(results) {
    presentResultItems(results);

    // Query info text
    const queryInfoPrefix = func.createEl('span','search-results-query-info-prefix'),
          queryInfoQuery = func.createEl('span','search-results-query-info-query');
    queryInfoPrefix.textContent = `${totalResults} ${func.pluralize(totalResults, pluralResults)} for:`
    queryInfoQuery.textContent = urlParams.query;
    queryInfoCont.replaceChildren(queryInfoPrefix, queryInfoQuery);

    // Filters list
    const filtersListCont = func.createEl('ul','search-results-filters-list-container'),
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
            resultsFilters.toggle(filter);
            outputResults();
        });
        item.appendChild(button);
        filtersListCont.appendChild(item);
    });

    filtersCont.replaceChildren(filtersLabel, filtersListCont);

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
            const resultCont = func.createEl('li','search-result-container'),
                  firstArea = func.createEl('div','search-result-first-area'),
                  secondArea = func.createEl('div','search-result-second-area'),
                  imageCont = func.createEl('div','search-result-image-container'),
                  title = func.createEl('a','search-result-title'),
                  sectionLabel = func.createEl('span','search-result-section-path'),
                  tagsCont = func.createEl('ul','search-result-tags-container'),
                  matchesContClass = 'search-result-matches-container',
                  matchesCont = func.createEl('div', matchesContClass),
                  matchesList = func.createEl('ul','search-result-matches-list'),
                  matchesMore = func.createEl('span','search-result-match-more');

            if (result.details.firstImage) {
                const imagePath = result.details.firstImage,
                      image = func.createEl('img','search-result-image');

                image.src = imagePath;
                imageCont.appendChild(image);
                resultCont.classList.add('has-image');
            } else {
                imageCont.classList.add('hidden-generic');
            }

            title.href = result.details.url;
            title.textContent = result.details.title;

            sectionLabel.textContent = result.details.sectionLabel;

            result.details.tags.forEach((tag) => {
                const item = func.createEl('li','search-result-tag-item'),
                      link = func.createEl('a',['search-result-tag', 'tag-list-tag']);
                link.href = '/' + tag.replaceAll(' ','_');
                link.textContent = tag;
                item.appendChild(link);
                tagsCont.appendChild(item);
            });

            function regenHighlights() {
                const els = generateHighlightEls(result, matchWidthBasis, 'search-result-match-string'),
                      moreInfo = moreMatchesCheck(result.matches.length, els.length),
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