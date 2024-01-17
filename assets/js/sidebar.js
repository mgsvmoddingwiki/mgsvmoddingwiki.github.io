import * as func from './functions.js';
import { searchIndex } from './searchindex.js';
import { pageCounters } from './searchindex.js';
import { isVirtualPage } from './virtualpages.js';

// ---------------- Add page counters to Quick Menu items ---------------
const sidebar = body.querySelector('.git-wiki-page-list');
let counters = {
    guides: sidebar.querySelector('a[href^="/Guides"][data-count]'),
    allPages: sidebar.querySelector('a[href^="/Meta/All_Pages"][data-count]')
}
for (let key in counters) {
    counters[key].setAttribute('data-count',pageCounters[key]);
}


// -------------------- Page URL hierarchy navigation -------------------
var {curUrl, curUrlRoot} = func.getPageUrls(isVirtualPage),
    curPage;
export const sectionIndexFlat = pathTreeFilterArray(searchIndex, 'url', curUrlRoot); // check search index for shared root pages (assumes each path level has its own page)
var sectionIndex = JSON.parse(JSON.stringify(sectionIndexFlat)); // creates separate reference for array copy so original array doesn't get retroactively modified by subsequent changes

if (sectionIndex.length > 1 && !document.title.includes('Page Not Found')) {
    // Collapse any main sidebar spoiler elements besides the hierarchy section list
    const spoilerSiblings = sidebar.querySelectorAll('details');
    var spoilerClosedHeight = 0;
    spoilerSiblings.forEach((el) => {
        spoilerClosedHeight = el.getBoundingClientRect().height;
        el.removeAttribute('open');
    });

    // Create initial container HTML
    var sectionSpoiler = document.createElement('details'),
        summary = document.createElement('summary');
    sectionSpoiler.classList.add('spoiler-sidebar','section-hierarchy');
    sectionSpoiler.setAttribute('open','');
    summary.classList.add('sidebar-heading');
    summary.innerHTML = 'Current Section';
    sectionSpoiler.appendChild(summary);
    sidebar.appendChild(sectionSpoiler);

    // Parse array, convert to HTML list
    pathTreeSetParents(sectionIndex);
    sectionIndex = pathTreeNestArray(sectionIndex);
    pathTreeCreateList(sectionIndex, sectionSpoiler);

    // Additional formatting
    let uls = sectionSpoiler.querySelectorAll('ul');
    var spoilerClass = 'section-hierarchy-spoiler';
    uls.forEach((ul, uli) => {
        const links = ul.querySelectorAll('li > a');
        links.forEach((link, i) => {
            if (uli == 0 && i == 0) {
                link.classList.add('root-page', 'icon-open-pages');
            } else {
                link.classList.add('icon-page');
            }
        });
        if (uli == 0) {
            ul.classList.add('section-hierarchy-list');
        // Skip wrapping first-level ul in spoiler so second-level children always visible
        } else if (uli > 1 && ul.parentNode.classList.contains('has-children')) {
            const spoiler = document.createElement('details'),
                  summary = document.createElement('summary');
            summary.classList.add('spoiler-button');
            spoiler.classList.add(spoilerClass);
            spoiler.appendChild(summary);
            ul.parentNode.insertBefore(spoiler, ul);
            spoiler.appendChild(ul);
        }
    });

    // Expand spoilers to current page/section
    expandSpoilerTree();
}


// ----------------------- Scroll states detection ----------------------
SimpleScrollbar.initEl(sidebar); // subsequently initialize custom scrollbar
let scrollbarWrapper = sidebar.querySelector('.ss-content');

// Check for position sticky state of headings (expects `top: -1px` in element's CSS)
const spoilerHeadings = sidebar.querySelectorAll('.spoiler-sidebar > .sidebar-heading');
let detectPosSticky = new IntersectionObserver((items) => {
    items.forEach(item => {
        item.target.classList.toggle('stickied', item.intersectionRatio < 1)
    })
}, { threshold: 1 }
);

spoilerHeadings.forEach((el) => {
    detectPosSticky.observe(el);
});

// Determine scrollbar state for container faded edges styling
var headingStickyState = false;
setScrollbarFades(scrollbarWrapper, true); // initialize state on load
scrollbarWrapper.addEventListener('scroll', e => {
    const {scrollHeight, scrollTop, clientHeight} = e.target;
    // Since event is fired synchronously the new `stickied` class is undetected initially (most obvious in Chromium). So an asynchronous check is used.
    func.waitForElements(sidebar, '.stickied').then(stickies => {
        stickies.forEach(el => {
            // Check parent details element for `open` state in case heading is inside closed state (which would lead to false positives when toggling `hide-top` class)
            if (el.parentNode.hasAttribute('open')) {
                headingStickyState = true;
            } else {
                headingStickyState = false;
            }
        });
        setScrollbarFades(e.target);
    });
    if (scrollTop == 0) {
       sidebar.classList.add('hide-top'); // always hide at top even if heading lacks stickied class match above
    }
});

if (curPage) {
    scrollCurrentItemIntoView(curPage);
}


// -------- Share section index with page auto index includes -----------
func.checkVp(indexAutoListSection);
function indexAutoListSection() {
    if (sectionIndexFlat.length > 1) {
        const autoIndexSection = body.querySelectorAll('.index.section ul');
        autoIndexSection.forEach((index) => {
            var {curUrl, curUrlRoot} = func.getPageUrls(isVirtualPage); // always re-fetch current URL
            const parent = getNestedObjFromValue(sectionIndex, 'children', 'url', curUrl);
            parent.children.forEach((child) => {
                let item = document.createElement('li'),
                    link = document.createElement('a');
                link.setAttribute('href', child.url);
                link.textContent = child.title;
                item.appendChild(link);
                index.appendChild(item);
            });
        });
    }
}


// ------------------------------ Functions -----------------------------
function setScrollbarFades(el, forceHideTop) {
    const {scrollHeight, scrollTop, clientHeight} = el;
    let topState = headingStickyState;
    if (forceHideTop) { topState = true; }
    sidebar.classList.toggle('has-scrollbar', scrollHeight != clientHeight);
    sidebar.classList.toggle('hide-bottom', Math.abs(scrollHeight - clientHeight - scrollTop) <= 3);
    sidebar.classList.toggle('hide-top', scrollTop == 0 || topState);
}

export function expandSpoilerTree(collapseSiblings) {
    if (collapseSiblings) {
        let spoilers = sectionSpoiler.querySelectorAll('.section-hierarchy-spoiler');
        spoilers.forEach((spoiler) => {
            spoiler.removeAttribute('open');
        });
    }
    curPage = sectionSpoiler.querySelector('.current-page');
    let ancestors = [];
    let node = curPage;
    let spoilerChild = node.querySelector(':scope > details');
    if (spoilerChild) { spoilerChild.setAttribute('open',''); } // expand child spoilers for section items
    ancestors.push(node);
    while (node.parentElement) {
      if (node.parentElement.classList.contains(spoilerClass)) {
        node.parentElement.setAttribute('open','');
        ancestors.unshift(node.parentElement);
      }
      node = node.parentElement;
    }
}

// https://stackoverflow.com/a/53390570
function getNestedObjFromValue(array, nestingKey, itemKey, value) {
    const obj = array.reduce((acc, item) => {
        if (acc) { return acc }
        if (item[itemKey] == value) { return item }
        if (item[nestingKey]) { return getNestedObjFromValue(item[nestingKey], nestingKey, itemKey, value) }
    }, null)
    return obj
}

export function scrollCurrentItemIntoView(currentItem) {
    scrollToCenter(currentItem, scrollbarWrapper, false, (findPos(sectionSpoiler).top + spoilerClosedHeight));
}

function scrollToCenter(target, container, toTargetCenter, yOffset) {
    let targetCenter = 0; // by default use top coord to align
    if (toTargetCenter) { targetCenter = (target.clientHeight / 2); }
    let top = (findPos(container).top + findPos(target).top - (yOffset || 0)) + targetCenter,
        center = top - (container.clientHeight / 2);
    container.scrollTo(0, center);
}

function findPos(el) {
    var pos = {top: 0, left: 0};
    // Recursively travel up parents to output total coords from top-most container
    do {
        pos.top += el.offsetTop;
        pos.left += el.offsetLeft;
    } while (el = el.offsetParent);
    return pos
}


function pathTreeFilterArray(array, key, value) {
    var id = 1;
    let arr = array.filter(function (obj) {
        for (let i in obj) {
            // Match to beginning of path
            if (obj[key].indexOf(value) === 0) {
                obj.id = id++;
                obj.parentId = 0;
                return obj
            }
        }
    });
    return arr
}

function pathTreeSetParents(array) {
    for (let i in array) {
        const obj = array[i];
        let {parts, levels} = func.getPathLevels(obj.url);
        delete obj.content // discard unnecessary values for array
        delete obj.tags
        // console.log(parts, levels, obj.url)
        if (levels > 1) {
            let parentPath = getParentPath(obj.url, parts);
            let parentIndex = func.getIndexByValue(sectionIndex, 'url', parentPath);
            obj.parentId = sectionIndex[parentIndex].id;
        }
    }
}

export function getParentPath(string, parts) {
    for (const [i] of parts.entries()) {
        // Determine deepest path level
        if (i === parts.length - 1) {
            let fs = 1;
            if (string[string.length - 1] != '/') { fs = 0; }; // check if permalink lacks trailing forwardslash
            let parent = string.substring(0, string.length - parts[i - fs].length - fs);
            if (parent == curUrlRoot + '?/') {
                parent = curUrlRoot;
            }
            return parent
        }
    }
}

// https://stackoverflow.com/a/31247960
function pathTreeNestArray(array) {
    var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;

    for (let i in array) {
        arrElem = array[i];
        mappedArr[arrElem.id] = arrElem;
        mappedArr[arrElem.id]['children'] = [];
    }

    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            if (mappedElem.parentId) {
                mappedArr[mappedElem['parentId']]['children'].push(mappedElem);
            }
            else {
                tree.push(mappedElem);
            }
        }
    }
    return tree;
}

function pathTreeCreateList(array, targetEl) {
    const ul = document.createElement('ul');
    array.forEach((el) => {
        const li = document.createElement('li');
        if (el.url == curUrl) {
            li.classList.add('current-page');
        }
        li.innerHTML = '<a class="section-hierarchy-link iconed icon-sidebar" href="' + el.url + '"><span class="label">' + el.title + '</span></a>';
        if (el.children.length) {
            li.classList.add('has-children');
            pathTreeCreateList(el.children, li);
        }
        ul.appendChild(li);
    });
    targetEl.appendChild(ul);
}