---
layout: null
is_wiki_page: false
---

import * as func from './functions.js';
import { searchIndex } from './searchindex.js';
import { virtualIndex } from './virtualindex.js';
import { mobileMainMenuToggle } from './general.js';
import { resetAll as resetSearch } from './searchdata.js';

export const isVirtualPage = checkForVirtualPage();
const pageWrapper = body.querySelector('.git-wiki-page'),
      cssStyle = getComputedStyle(body),
      targetTopSpacing = parseInt(cssStyle.getPropertyValue('--spacing-target-top'));
let {curUrl, curUrlRoot} = func.getPageUrls(isVirtualPage),
    lastUrl = window.location.href,
    contentWrapper,
    pageHeading,
    pageObj;

if (isVirtualPage) {
    contentWrapper = body.querySelector('#git-wiki-content');
    pageHeading = body.querySelector('h1.page-heading');
    defaultState();

    // Listen for prior history state data on back/forward navigation
    window.addEventListener('popstate', (e) => {
        if (window.location.href.split('#')[0] === lastUrl.split('#')[0]) return // ignore frag ID only changes (so navigating between identifiers doesn't cause whole content reloads, losing the :target behavior)
        lastUrl = window.location.href;

        const stateObj = e.state;
        if (stateObj == null) {
            defaultState(true);
        } else {
            contentLoaded(false);
            stylePage(stateObj);
            setCurPage(stateObj);
            resetSearch();
        }
    });

    window.addEventListener('hashchange', (e) => {
        lastUrl = window.location.href;
        applyFragPseudoTargeting();
    });

    body.addEventListener('click', (e) => {
        const tar = e.target;
        let tarUrl = (tar.tagName == 'A') ? tar.getAttribute('href') : null; // reason for using `getAttribute` vs `.href` is latter resolves to full URL, including domain and protocol
        if ((tar.closest('.section-hierarchy-link') && !tar.closest('.root-page')) || (tar.closest('.index.section') && !tarUrl.startsWith('#'))) {
            if (tar.parentElement.classList.contains('section-hierarchy-link')) {
                tarUrl = tar.parentElement.getAttribute('href');
            }
            let mobileHeader = body.querySelector('#git-wiki-mobile-header');
            if (!tar.closest('.index.section') && getComputedStyle(mobileHeader).getPropertyValue('display') != 'none') {
                mobileMainMenuToggle();
            }
            updateFromTarget(e, tarUrl);
            return
        }
        // Only handle clicks to search results that are filtered to section
        if (tar.closest('.search-suggestions-item')) {
            if (!tar.classList.contains('search-suggestions-item')) {
                tarUrl = tar.parentElement.getAttribute('href');
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
    }, false);

    const searchInput = body.querySelector('#search-input');
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const result = body.querySelector('.search-suggestions-item-container.highlight');
            // Check if selector exists, as otherwise implies results page has been triggered via Enter (ie: before any item has been selected)
            if (result) {
                const tarUrl = result.querySelector('.search-suggestions-item').getAttribute('href');
                if (result.classList.contains('search-suggestions-item-virtual-page')) {
                    updateFromTarget(e, tarUrl); // if virtual page
                } else {
                    window.location.href = tarUrl; // otherwise go directly to page
                }
            }
        }
    });

    function updateFromTarget(event, targetUrl) {
        event.preventDefault();
        const tarIndex = func.getIndexByValue(virtualIndex, 'url', targetUrl),
        tarObj = virtualIndex[tarIndex];
        historyPush(tarObj);
        contentLoaded(false);
        stylePage(tarObj);
        setCurPage(tarObj);
        resetSearch();
    }
} else {
    // Tag and all pages auto index handling
    const autoIndexTags = pageWrapper.querySelectorAll('.index.tags'),
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
        const tagList = filterAllUniqueTags(),
              ul = autoIndexAllTags.querySelector('ul');
        ul.innerHTML = '';
        tagList.forEach((tag) => {
            let li = document.createElement('li'),
                link = document.createElement('a');
            setTagLink(link, tag);
            link.textContent = tag;
            li.appendChild(link)
            ul.appendChild(li);
        });
    }

    function addItems(parentList, array) {
        parentList.classList.add('full-width');
        const wrapper = document.createElement('li'),
              ul = document.createElement('ul'),
              heading = document.createElement('h2');

        // Note: this heading actually represents all virtual pages but since they're all Entity Reference currently it uses that name (this may change in future if other virtual sections are added)
        heading.id = 'entity-reference';
        heading.textContent = 'Entity reference';
        wrapper.appendChild(heading);

        array.sort((a, b) => (a.title > b.title) ? 1: -1); // sort alphabetically by title key

        array.forEach((item) => {
            const li = document.createElement('li'),
                  link = document.createElement('a');
            link.href = li.url;
            link.textContent = li.title;
            li.appendChild(link);
            ul.appendChild(li);
        });

        wrapper.appendChild(ul);
        parentList.appendChild(wrapper);
    }
}

function removeFragPseudoClass(el) {
    const prev = document.querySelector('.vp-frag-pseudo-target');
    if (!el || (prev && prev !== el)) prev.classList.remove('vp-frag-pseudo-target');
}

function applyFragPseudoTargeting() {
    const id = window.location.hash.slice(1);
    if (!id) {
        removeFragPseudoClass();
        window.scrollTo(0,0);
        return
    }
    const el = document.getElementById(id);
    if (!el) return

    const rect = func.getRect(el),
          y = window.scrollY + rect.top - targetTopSpacing;

    removeFragPseudoClass(el);
    el.classList.add('vp-frag-pseudo-target');

    window.scrollTo({
        top: Math.max(0, Math.floor(y)),
        behavior: 'auto'
    });
}

function filterAllUniqueTags() {
    let foo = searchIndex.map(({ tags }) => tags).flat();
    // Boolean filter returns only truthy values (avoiding undefined tags)
    let unique = foo.filter(Boolean).reduce(function (acc, curVal) {
        if (!acc.map(val => val.toLowerCase()).includes(curVal.toLowerCase())) {
        acc.push(curVal);
      }
      return acc
    }, []);

    return unique.sort()
}

async function parseMarkdown(item) {
    const liquidMod = await import('https://cdn.jsdelivr.net/npm/liquidjs@10.27.0/+esm'),
          { default: markdownIt } = await import('https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/+esm'),
          { default: markdownItAttrs } = await import('https://cdn.jsdelivr.net/npm/markdown-it-attrs@5.0.0/+esm'),
          { default: markdownItHighlightJs } = await import('https://cdn.jsdelivr.net/npm/markdown-it-highlightjs@4.3.0/+esm'),
          { Liquid, Hash, toPromise } = liquidMod;

    const md = markdownIt({
        html: true
    })
        .use(markdownItHighlightJs)
        .use(markdownItAttrs, {
            leftDelimiter: '{:', // use Kramdown style opening
            rightDelimiter: '}'
        })


    const ljs = new Liquid({
        root: '/assets/js/js-includes/'
    });

    ljs.registerTag('include', {
        parse: function(tagToken) {
            const raw = tagToken.args || ''; // filename + any args

            // It's more straightforward using regex for this split
            const m  = /^\s*([^\s]+)([\s\S]*)$/.exec(raw || '') || [],
                  filename = m[1] || '',
                  args = (m[2] || '').trim();

            this.filename = filename;
            this.args = new Hash(args, true); // bool is to enable parsing of Jekyll-style include key-value pairs
        },
        render: async function(scope) {
            const env = (typeof scope.getAll === 'function') ? scope.getAll() : scope,
                  includeArgs = await toPromise(this.args.render(scope)); // output as plain key-value object

            const context = Object.assign({}, env, {
                page: env.page || {},
                include: includeArgs
            });

            try {
                return await this.liquid.renderFile(this.filename, context)
            } catch (error) {
                console.error(error)
            }
        }
    });

    // Fetching the body text from file instead of via the page's object in the index as it makes local server testing *much* more convenient. Otherwise every single change to the body text of a virtual page requires rebuilding the entire site from scratch (full termination of the run script and relaunch, can't merely use the full build option for this since the Jekyll hook that triggers the build scripts only executes on initial build not follow-ups).
        // For the page context object passed to LiquidJS it'll be out-of-sync but the user is more likely to make body text changes not tag/title changes when testing locally.
        // For Github workflows none of this matters since the site gets a full build each time but it's painful when locally testing without doing this.
    Promise.all([
        fetch(item.filePath).then((file) => file.text())
    ]).then(async ([text]) => {
        // The `site.pages` here is just providing the full search index, in whatever state it is at this point. The only include that uses this context atm is the index-autolist's tag option but the large loop perf is horrendous with LiquidJS so it's almost useless providing the site context.
        const liquidParsed = await ljs.parseAndRender(text, { site: { pages: searchIndex }, page: item });
        const result = md.render(liquidParsed);
        contentWrapper.innerHTML = result;
        postParse(); // parse certain content prior to `stylePage()` that depends on other modules' parsing
        contentLoaded(true); // class detected by function that other modules listen with

        applyFragPseudoTargeting();
    });
}

async function stylePage(item) {
    if (checkFileExists(item.filePath)) {
        await parseMarkdown(item);
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
            delete: toolbar.querySelector('.tools-button.more-options a'),
            proseEdit: toolbar.querySelector('.tools-button.prose.edit a')
        }
        for (let key in buttonLinks) {
            if (key == 'delete') {
                buttonLinks[key].setAttribute('data-delete-page-url', replaceLink(buttonLinks[key].getAttribute('data-delete-page-url')));
            } else {
                buttonLinks[key].href = replaceLink(buttonLinks[key].href)
            }
        }

        function replaceLink(string) {
            return string.replace(/\/master\/+wiki\/(.*)/gm, '/master' + item.filePath)
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
    const tocWrapper = pageWrapper.querySelector('.toc-toggle'),
          filler = document.createTextNode('.');
    let headings = pageWrapper.querySelectorAll('h2, h3'),
        toc = tocWrapper.querySelector('#git-wiki-toc'),
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
            const item = document.createElement('li'),
                  link = document.createElement('a'),
                  depth = parseInt(heading.tagName.substring(1));
            link.textContent = heading.textContent;
            link.href = '#' + heading.id;
            item.appendChild(link);

            if (depth > curDepth) {
                // Deeper
                const list = document.createElement('ol');
                list.appendChild(item);
                result.appendChild(list);
                result = item;
            } else if (depth < curDepth) {
                // Shallower
                let olArr = filterByOl(result);
                olArr[curDepth - depth].appendChild(item);
                result = item;
            } else {
                // Same level
                result.parentNode.appendChild(item);
                result = item;
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
        return filterArrayByObjAttr(parents(input), 'tagName', 'OL')
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

function defaultState(returningFromHistory) {
    if (curUrl == curUrlRoot) {
        if (returningFromHistory) {
            location.reload();
        } else {
            contentLoaded(true); // auto reveal root page content
        }
    } else {
        const pageIndex = func.getIndexByValue(virtualIndex, 'url', curUrl);
        if (pageIndex != -1) {
            pageObj = virtualIndex[pageIndex];
            stylePage(pageObj, true);
        }
    }
}

function fragIdFormat(string) {
    return string.replace(/[^0-9a-z]/gi,'-').toLowerCase() // replace all non-alphanumeric characters
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
        const paths = removeEmptyArrayItems(path.split('/'));
        const segments = paths.map((seg, i) => {
            return {
                title: seg.replace('_',' ').replace('-',' '),
                url: '/' + paths.slice(0, i + 1).join('/') + '/'
            }
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
        return item != ''
    });
    return filtered
}