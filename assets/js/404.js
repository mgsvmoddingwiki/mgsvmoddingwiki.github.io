// Fuse.js search
import { searchIndex } from './searchindex.js'

window.onload = function() {

    var fuse = new Fuse(searchIndex, {
        keys: [
            { name: 'title', weight: 2 },
            { name: 'url', weight: 1 },
            { name: 'tags', weight: 1 },
            { name: 'content', weight: 0.5 }
        ],
        ignoreLocation: true
    });

    const currentURL = window.location.pathname.replace(/[/:_]/g,' ').replaceAll('Category',' ');
    const resultsContainer = body.querySelector('.pagenotfound-results');
    const resultsMax = 10;

    outputResults(fuse.search(currentURL));

    async function outputResults(input) {
        // Since fuzzy matching is enabled there will always be a match
        if (input.length != 0) {
            const fragment = new DocumentFragment(); // create dummy element to temporarily store elements to
            input.slice(0,resultsMax).forEach((result) => {
                var listItem = document.createElement('li');
                var link = document.createElement('a');
                var title = document.createTextNode(result.item.title);
                link.appendChild(title)
                link.setAttribute('href', result.item.url);
                listItem.appendChild(link);
                fragment.appendChild(listItem)
            });
            resultsContainer.classList.remove('loading');
            resultsContainer.appendChild(fragment);
        }
    }

};

