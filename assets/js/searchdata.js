---
layout: null
is_wiki_page: false
---
{% if site.search_engine == "js" %}

var searchIndex = [
    {% for page in site.html_pages %}
    {
        {% assign title = page.title | default: page.name %}
        {% if title != nil and title != '404.html' and title != 'index.html' %}
            title: `{{ title }}`,
            tags: `{{ page.tags | join: ', ' }}`,
            url: `{{ site.baseurl }}{{ page.url }}`,
            content: {{ page.content | jsonify  }}
        {% endif %}
    } {% unless forloop.last %},{% endunless %}
    {% endfor %}
];

var fuse = new Fuse(searchIndex, {
    keys: [
        { name: 'title', weight: 2 }, // increase title relevance to result ordering
        { name: 'tags', weight: 1 },
        { name: 'content', weight: 0.5 } // reducing this weight appears to improve perf
    ],
    threshold: 0, // effectively disable fuzzy matching by requiring exact matches
    ignoreLocation: true // search through all text at expense of performance
});

const searchInput = body.querySelector('#search-input');
const searchClear = body.querySelector('.search-clear-query');
const resultsContainer = body.querySelector('#results-container');
const resultsMax = 10;
var keyNavCurItem; // currently selected item for keyboard nav
var keyNavCodes = {
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
    if (e.target == searchInput || e.target == resultsContainer) {
        searchResultsShow(true);
    } else {
        searchResultsShow(false);
    }
});

searchClear.addEventListener('click', (e) => {
    searchInput.value = null;
    searchClearShow(false);
    searchNoResults(false);
});

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

function searchNoResults(state) {
    if (state) {
        searchClear.parentNode.classList.add('no-results');
    } else {
        searchClear.parentNode.classList.remove('no-results')
    }
}

function searchClearShow(state) {
    if (state) {
        searchClear.parentNode.classList.add('clear');
    } else {
        searchClear.parentNode.classList.remove('clear');
    }
}

function outputResults(input, key) {
    searchClearShow(true);
    if (input.length != 0) {
        if (key != keyNavCodes.shift) {
            resultsContainer.replaceChildren(); // prevent clearing highlighted item from key nav
        }
        searchResultsShow(true);
        searchNoResults(false);
        input.slice(0,resultsMax).forEach((result) => {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            var title = document.createTextNode(result.item.title);
            link.appendChild(title)
            link.setAttribute('href', result.item.url);
            listItem.appendChild(link);
            resultsContainer.appendChild(listItem);
        });
    } else {
        searchNoResults(true);
        searchResultsShow(false);
    }
}

{% endif %}