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
    threshold: 0, // effectively disable fuzzy matching by requiring exact  matches
    ignoreLocation: true, // search through all text at expense of performance
});

const searchInput = body.querySelector('#search-input');
const resultsContainer = body.querySelector('#results-container');
const resultsMax = 10;

searchInput.addEventListener('keyup', (e) => {
    if (typeof e.target.value != 'undefined' || e.target.value != null) {
        outputResults(fuse.search(e.target.value));
    } else {
        clearResults();
    }
});

function outputResults(input) {
    clearResults();
    input.slice(0,resultsMax).forEach((result) => {
        createElements(result.item.title, result.item.url);
    });
}

function clearResults() {
    resultsContainer.replaceChildren();
}

function createElements(title, url) {
    var listItem = document.createElement('li');
    var link = document.createElement('a');
    var titleText = document.createTextNode(title);
    link.appendChild(titleText)
    link.setAttribute('href', url);
    listItem.appendChild(link);
    resultsContainer.appendChild(listItem);
}

{% endif %}