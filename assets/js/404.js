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
        distance: 200, // set match scope to within first 200 characters
        ignoreLocation: false // disabled full content search to be snappier on larger arrays
    });

    const currentURL = window.location.pathname.replace(/[/:_-]/g,' ').replaceAll('Category',' ');
    const resultsContainer = body.querySelector('.pagenotfound-results');
    const resultsMax = 10;

    outputResults(fuse.search(currentURL));

    async function outputResults(input) {
        const fragment = new DocumentFragment(); // create dummy element to temporarily store elements to
        if (input.length != 0) {
            input.slice(0,resultsMax).forEach((result) => {
                var listItem = document.createElement('li'),
                    link = document.createElement('a');
                if (result.item.title != 'redirect.html') {
                    link.textContent = result.item.title;
                } else {
                    listItem.classList.add('redirection');
                    link.textContent = result.item.url.replace(/[/:_-]/g,' ');
                }
                link.setAttribute('href', result.item.url);
                listItem.appendChild(link);
                fragment.appendChild(listItem)
            });
            resultsContainer.appendChild(fragment);
        } else {
            let listItem = document.createElement('li');
            listItem.classList.add('no-results');
            listItem.textContent = 'No results found';
            fragment.appendChild(listItem);
            resultsContainer.appendChild(fragment);
        }
        resultsContainer.classList.remove('loading');
    }

};

