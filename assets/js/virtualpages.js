---
layout: null
is_wiki_page: false
---

import * as func from './functions.js';
import { virtualIndex } from './virtualindex.js';
import { mobileMainMenuToggle } from './general.js';
import { resetAll as resetSearch } from './searchdata.js';

export const isVirtualPage = checkForVirtualPage();
var {curUrl, curUrlRoot} = func.getPageUrls(isVirtualPage),
    pageWrapper = body.querySelector('.git-wiki-page'),
    pageObj;

if (isVirtualPage) {
    var contentWrapper = body.querySelector('#git-wiki-content'),
        pageHeading = body.querySelector('h1.page-heading');
    defaultState();

    // Listen for prior history state data on back/forward navigation
    window.addEventListener('popstate', (e) => {
        var stateObj = e.state;
        if (stateObj == null) {
            defaultState(true);
        } else {
            contentLoaded(false);
            stylePage(stateObj);
            setCurPage(stateObj);
            resetSearch();
        }
    });

    body.addEventListener('click', (e) => {
        const tar = e.target;
        var tarUrl = (tar.tagName == 'A') ? tar.getAttribute('href') : null; // reason for using `getAttribute` vs `.href` is latter resolves to full URL, including domain and protocol
        if ((tar.classList.contains('section-hierarchy-link') && !tar.classList.contains('root-page')) || (tar.parentElement.classList.contains('section-hierarchy-link') && !tar.parentElement.classList.contains('root-page')) || (tar.closest('.index.section') && !tarUrl.startsWith('#'))) {
            if (tar.parentElement.classList.contains('section-hierarchy-link')) {
                tarUrl = tar.parentElement.getAttribute('href');
            }
            if (!tar.closest('.index.section')) {
                mobileMainMenuToggle();
            }
            updateFromTarget(e, tarUrl);
            return
        }
        // Only handle clicks to search results that are filtered to section
        if ((tar.classList.contains('search-result-item') || tar.parentElement.classList.contains('search-result-item')) && tar.closest('.git-wiki-search').querySelector('.search-actions.filtered')) {
            if (!tar.classList.contains('search-result-item')) {
                tarUrl = tar.parentElement.getAttribute('href');
            }
            if (tarUrl != curUrlRoot) {
                updateFromTarget(e, tarUrl);
            }
            return
        }
        if (tar.parentElement.classList.contains('breadcrumb-item')) {
            if (tarUrl != '/' && tarUrl != curUrlRoot) {
                updateFromTarget(e, tarUrl);
            }
            return
        }
        // Internal links within page content
        if (tarUrl) { curUrl = func.getPageUrls(isVirtualPage).curUrl; } // update to current
        if (tar.closest('#' + contentWrapper.id) && tarUrl && tarUrl.startsWith(curUrlRoot)) {
            updateFromTarget(e, func.trimTrailFs(tarUrl) + '/');
            return
        }
        e.stopPropagation();
    }, false);

    const searchInput = body.querySelector('#search-input');
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // For some reason querying for the results container returns null so used `body` instead
            let result = body.querySelector('.search-result-item.highlight'),
                tarUrl = result.getAttribute('href');
            updateFromTarget(e, tarUrl);
        }
    });

    function updateFromTarget(event, targetUrl) {
        event.preventDefault();
        var tarIndex = func.getIndexByValue(virtualIndex, 'url', targetUrl),
        tarObj = virtualIndex[tarIndex];
        historyPush(tarObj);
        contentLoaded(false);
        stylePage(tarObj);
        setCurPage(tarObj);
        resetSearch();
        window.scrollTo(0,0);
    }
} else {
    // Tag and all pages auto index handling
    var autoIndexTags = pageWrapper.querySelectorAll('.index.tags'),
        autoIndexAllPages = pageWrapper.querySelector('.index.all-pages'),
        autoIndexAllTags = pageWrapper.querySelector('.index.all-tags');

    if (autoIndexTags) {
        autoIndexTags.forEach((list) => {
            let relatedTag = list.getAttribute('data-tag'),
                matches = func.filterArrayByObjVal(virtualIndex, 'tags', relatedTag);
            if (matches.length) {
                addItems(list, matches);
            }
        });
    }

    if (autoIndexAllPages) {
        addItems(autoIndexAllPages, virtualIndex);
    }

    if (autoIndexAllTags) {
        filterAllUniqueTags().then(tagList => {
            const ul = autoIndexAllTags.querySelector('ul');
            ul.innerHTML = '';
            tagList.forEach((tag) => {
                let li = document.createElement('li'),
                    link = document.createElement('a');
                setTagLink(link, tag);
                link.textContent = tag;
                li.appendChild(link)
                ul.appendChild(li);
            });
        });
    }

    function addItems(parentList, array) {
        parentList.classList.add('full-width');
        var wrapper = document.createElement('li'),
            ul = document.createElement('ul'),
            heading = document.createElement('h2');

        // Note: this heading actually represents all virtual pages but since they're all Entity Reference currently it uses that name (this may change in future if other virtual sections are added)
        heading.id = 'entity-reference';
        heading.textContent = 'Entity reference';
        wrapper.appendChild(heading);

        array.sort((a, b) => (a.title > b.title) ? 1: -1); // sort alphabetically by title key

        array.forEach((item) => {
            let wrapper = document.createElement('li'),
                link = document.createElement('a');
            link.href = item.url;
            link.textContent = item.title;
            wrapper.appendChild(link);
            ul.appendChild(wrapper);
        });

        wrapper.appendChild(ul);
        parentList.appendChild(wrapper);
    }
}

async function filterAllUniqueTags() {
    const { searchIndex } = await import('./searchindex.js');
    let foo = searchIndex.map(({ tags }) => tags).flat(); // create new array based on sub-arrays, then concatenate
    // Boolean filter returns only truthy values (avoiding undefined tags)
    let unique = foo.filter(Boolean).reduce(function (acc, curVal) {
        // Map entire array on-the-fly to lowercase for case insensitive string comparison.
        if (!acc.map(val => val.toLowerCase()).includes(curVal.toLowerCase())) {
        acc.push(curVal);
      }
      return acc
    }, []);

    return unique.sort()
}


async function fetchFile(filePath) {
    const { default: markdownIt } = await import('https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/+esm');
    const md = markdownIt(
        {
            html: true // enable HTML parsing from input, as otherwise Liquid includes don't reliably get replaced via `preParse()`
        });

    Promise.all([
        fetch(filePath).then(file => file.text())
    ]).then(([textResponse]) => {
        const result = md.render(preParse(textResponse));
        contentWrapper.innerHTML = result;
        postParse(); // parse certain content prior to `stylePage()` that depends on other modules' parsing
        contentLoaded(true); // class detected by function that other modules listen with
    });
}

async function stylePage(item) {
    if (checkFileExists(item.filePath)) {
        await fetchFile(item.filePath);
        console.clear(); // remove eg. any 404 link error messages generated on prior page

        pageHeading.textContent = item.title;
        document.title = item.title + ' | MGSV Modding Wiki';

        let tagList = pageWrapper.querySelector('#tag-list'),
            tags = tagList.querySelectorAll('.tag-list-tag');
        tags.forEach((tag) => { tag.remove(); });
        tags = item.tags;
        if (tags.length > 1) {
            tagList.classList.remove('hidden-generic');
            tags.forEach((tag) => {
                let link = document.createElement('a');
                link.classList.add('tag-list-tag');
                setTagLink(link, tag);
                link.textContent = tag;
                tagList.appendChild(link);
            });
        } else {
            tagList.classList.add('hidden-generic');
        }

        breadcrumbs(item);

        // Toolbar editing links
        let toolbar = pageWrapper.querySelector('#tools-buttons');
        let buttonLinks = {
            edit: toolbar.querySelector('.tools-button.edit:not(.prose) a'),
            history: toolbar.querySelector('.tools-button.history a'),
            source: toolbar.querySelector('.tools-button.source a'),
            delete: toolbar.querySelector('.tools-button.more-options .delete a'),
            proseEdit: toolbar.querySelector('.tools-button.prose.edit a')
        }
        for (let key in buttonLinks) {
            buttonLinks[key].href = buttonLinks[key].href.replace(/\/master\/+wiki\/(.*)/gm, '/master' + item.filePath)
        }

        func.checkVp(generateToc);
    }
}

function setTagLink(el, string) {
    el.href = '/' + string.replace(' ','_') // same tag link formatting as used by Jekyll
}

// https://stackoverflow.com/a/498018
function generateToc() {
    // Depth of hierarchy will be lowest heading element defined here
    var headings = pageWrapper.querySelectorAll('h2, h3'),
        tocWrapper = pageWrapper.querySelector('.toc-toggle'),
        toc = tocWrapper.querySelector('#git-wiki-toc'),
        filler = document.createTextNode('.'),
        result = document.createElement('div'),
        curDepth = 0;
    if (toc) {
        toc.remove();
        func.removeChildText(tocWrapper);
    }
    addChildText();
    toc = document.createElement('ol');
    toc.id = 'git-wiki-toc';
    tocWrapper.appendChild(toc);
    toc.classList.toggle('hidden-generic', !headings.length);
    if (!headings.length) {
        filler.remove();
    } else {
        headings.forEach((heading) => {
            heading.classList.add('heading');
        })
        headings = pageWrapper.querySelectorAll('.heading'); // now obtain list in document order
        headings.forEach((heading) => {
            var li = document.createElement('li'),
                link = document.createElement('a'),
                depth = parseInt(heading.tagName.substring(1));
            link.textContent = heading.textContent;
            link.href = '#' + heading.id;
            li.appendChild(link);

            if (depth > curDepth) {
                // Deeper
                var ol = document.createElement('ol');
                ol.appendChild(li);
                result.appendChild(ol);
                result = li;
            } else if (depth < curDepth) {
                // Shallower
                let olArr = filterByOl(result);
                olArr[curDepth - depth].appendChild(li);
                result = li;
            } else {
                // Same level
                result.parentNode.appendChild(li);
                result = li;
            }
            curDepth = depth;
        });

        let olArr = filterByOl(result);
        result = olArr[olArr.length - 1]; // get last matching array
        let children = result.childNodes;
        toc.append(...children);
    }

    function addChildText() {
        tocWrapper.appendChild(filler); // currently stylesheet margins expect text content (carryover from stock layout)
    }

    function filterByOl(input) {
        return filterArrayByObjAttr(parents(input), 'tagName', 'OL');
    }

    function filterArrayByObjAttr(array, key, attribute) {
        return array.filter(item => item[key] === attribute)
    }

    function parents(node) {
       let current = node,
           list = [];
        while(current.parentNode != null && current.parentNode != document.documentElement) {
            list.push(current.parentNode);
            current = current.parentNode;
        }
        return list
    }
}

function historyPush(item) {
    history.pushState(item, '', item.url); // middle value always remains empty
}

function contentLoaded(state) {
    pageWrapper.classList.toggle('vp-loaded', state);
    pageWrapper.classList.remove('first-load');
}

function checkFileExists(path) {
    return fetch(path,
        { method: "HEAD" }
        ).then((response) => {
            if (response.ok) {
                return true
            }
        });
}

export function checkForVirtualPage() {
    const virtualRootUrls = {
        {% for path in site.virtual_page_roots %}
            url_{{ forloop.index }}: `{{ path }}`,
        {% endfor %}
    }
    // Since everything from `?` onward in URL is considered a search we can use `pathname` to obtain root page
    if (func.matchObjVal(virtualRootUrls, window.location.pathname) && !document.title.includes('Page Not Found')) {
        return true
    }
}

async function setCurPage(item) {
    const { scrollCurrentItemIntoView, expandSpoilerTree } = await import('./sidebar.js');
    let list = body.querySelector('.section-hierarchy-list'), // `pageWrapper` not inherited here
        sel = 'current-page',
        oldCur = list.querySelector('.' + sel),
        newCur = list.querySelector('a[href="' + item.url + '"]').closest('li');
    oldCur.classList.remove(sel);
    newCur.classList.add(sel);
    expandSpoilerTree(true);
    scrollCurrentItemIntoView(newCur);
}

function postParse() {
    // Add fragment identifiers to headings, since Markdown conversion lacks this feature
    let headings = contentWrapper.querySelectorAll('h2, h3, h4');
    headings.forEach((heading) => {
        // Unlike Jekyll method this doesn't check for duplicate heading titles to add a distinguishing counter
        heading.id = fragIdFormat(heading.textContent);
    });
}

function preParse(input) {
    // Limited selection of Liquid includes to replace
    let includes = [
        {
            name: 'indexAutoListSection',
            orig: `{% raw %}{% include index-autolist type="section" %}{% endraw %}`,
            repl: `<ul class="index section">
                        <li>
                            <h2 id="section-pages">Section pages</h2>
                            <ul>
                            </ul>
                        </li>
                    </ul>
                    `
        },
        {
            name: `spoilerStart`,
            orig: `{% raw %}{% include spoiler-start %}{% endraw %}`,
            repl: `<details class="spoiler">
                    <summary class="content-button">
                    Expand for more
                    </summary>
                    `
        },
        {
            name: `spoilerEnd`,
            orig: `{% raw %}{% include spoiler-end %}{% endraw %}`,
            repl: `</details>`
        }
    ];
    includes.forEach((include) => {
        input = input.replaceAll(include.orig,include.repl.replace(/^\s+/gm, '')) // trim leading whitespace per line from replacement to avoid Markdown parsing as code block
    });

    return input
}

function defaultState(returningFromHistory) {
    if (curUrl == curUrlRoot) {
        if (returningFromHistory) {
            location.reload();
        } else {
            contentLoaded(true); // auto reveal root page content
        }
    } else {
        var pageIndex = func.getIndexByValue(virtualIndex, 'url', curUrl);
        if (pageIndex != -1) {
            pageObj = virtualIndex[pageIndex];
            stylePage(pageObj, true);
        }
    }
}

function fragIdFormat(string) {
    return string.replace(/[^0-9a-z]/gi,'-').toLowerCase(); // replace all non-alphanumeric characters
}

function breadcrumbs(item) {
    // Recreating the Jekyll include structure
    let existing = body.querySelector('.breadcrumb-list');
    if (existing) { existing.remove(); }

    let wrapper = document.createElement('div'),
        breadcrumbs = splitBreadcrumbs(item.url);
    wrapper.classList.add('breadcrumb-list');
    breadcrumbs.forEach((crumb) => {
        let cont = document.createElement('div'),
            link = document.createElement('a');
        cont.classList.add('breadcrumb-item');
        link.href = crumb.url;
        link.textContent = crumb.title;
        cont.appendChild(link);
        wrapper.appendChild(cont);
    });
    pageHeading.parentNode.insertBefore(wrapper, pageHeading);

    function splitBreadcrumbs(path) {
        var paths = removeEmptyArrayItems(path.split('/'));
        const segments = paths.map((seg, i) => {
            return {
                title: seg.replace('_',' ').replace('-',' '),
                url: '/' + paths.slice(0, i + 1).join('/') + '/'
            };
        });
        segments.unshift({
            title: 'Home',
            url: '/'
        });
        segments.pop(); // remove last item (current page)
        let q = { title: '?', url: curUrlRoot + '?/' }
        segments.splice(segments.findIndex(a => a.title === q.title), 1); // remove root basis character
        return segments
    }
}

function removeEmptyArrayItems(array) {
    let filtered = array.filter(function (item) {
        return item != '';
    });
    return filtered;
}