import { searchIndex } from './searchindex.js'
import { pageCounters } from './searchindex.js'

// ---------------- Add page counters to Quick Menu items ---------------
const sidebar = body.querySelector('.git-wiki-page-list');
let counters = {
    guides: sidebar.querySelector('a[href^="/Guides"][data-count]'),
    allPages: sidebar.querySelector('a[href^="/Meta-All_Pages"][data-count]')
}
for (let key in counters) {
    counters[key].setAttribute('data-count',pageCounters[key]);
}


// -------------------- Page URL hierarchy navigation -------------------
var curPage
var curUrl = window.location.pathname;
var curUrlRoot = '/' + curUrl.split('/')[1] + '/'; // obtain first-level path of current URL
var multiPaths = pathTreeFilterArray(searchIndex, 'url', curUrlRoot); // check search index for shared root pages (assumes each path level has its own page)

if (multiPaths.length > 1) {
    // Collapse any main sidebar spoiler elements besides the hierarchy section list
    const spoilerSiblings = sidebar.querySelectorAll('details');
    var spoilerClosedHeight = 0;
    spoilerSiblings.forEach((el) => {
        spoilerClosedHeight = el.getBoundingClientRect().height;
        el.removeAttribute('open');
    });

    // Create initial container HTML
    var details = document.createElement('details');
    var summary = document.createElement('summary');
    details.classList.add('spoiler-sidebar','section-hierarchy');
    details.setAttribute('open','');
    summary.classList.add('sidebar-heading');
    summary.innerHTML = 'Current Section';
    details.appendChild(summary);
    sidebar.appendChild(details);

    // Parse array, convert to HTML list
    pathTreeSetParents(multiPaths);
    multiPaths = pathTreeNestArray(multiPaths);
    pathTreeCreateList(multiPaths, details);

    // Additional formatting
    let uls = details.querySelectorAll('ul');
    let spoilerClass = 'section-hierarchy-spoiler';
    uls.forEach((ul, i) => {
        const links = ul.querySelectorAll('li > a');
        links.forEach((link, i) => {
            if (i == 0) {
                link.classList.add('icon-open-pages');
            } else {
                link.classList.add('icon-page');
            }
        });
        if (i == 0) {
            ul.classList.add('section-hierarchy-list');
        // Skip wrapping first-level ul in spoiler so second-level children always visible
        } else if (i > 1 && ul.parentNode.classList.contains('has-children')) {
            const spoiler = document.createElement('details');
            const summary = document.createElement('summary');
            summary.classList.add('spoiler-button');
            spoiler.classList.add(spoilerClass);
            spoiler.appendChild(summary);
            ul.parentNode.insertBefore(spoiler, ul);
            spoiler.appendChild(ul);
        }
    });

    // Expand spoilers to current page/section
    curPage = details.querySelector('.current-page');
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


// ----------------------- Scroll states detection ----------------------
SimpleScrollbar.initEl(sidebar); // subsequently initialize custom scrollbar
let scrollbarWrapper = sidebar.querySelector('.ss-content')

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
scrollbarWrapper.addEventListener('scroll', e => {
    const {scrollHeight, scrollTop, clientHeight} = e.target;
    let stickyState = false;
    // Since event is fired synchronously the new `stickied` class is undetected initially (most obvious in Chromium). So an asynchronous check is used.
    waitForElementsToExist(sidebar, '.stickied').then(stickies => {
        stickies.forEach(el => {
            // Check parent details element for `open` state in case heading is inside closed state (which would lead to false positives when toggling `hide-top` class)
            if (el.parentNode.hasAttribute('open')) {
                stickyState = true;
            }
        });
        sidebar.classList.toggle('has-scrollbar', scrollHeight != clientHeight);
        sidebar.classList.toggle('hide-bottom', Math.abs(scrollHeight - clientHeight - scrollTop) <= 3);
        sidebar.classList.toggle('hide-top', scrollTop == 0 || stickyState);
    });
    if (scrollTop == 0) {
       sidebar.classList.add('hide-top'); // always remove even if heading lacks stickied class match above
    }
});


if (curPage) {
    scrollToCenter(curPage, scrollbarWrapper, (details.offsetTop + spoilerClosedHeight));
}


// ------------------------------ Functions -----------------------------
function waitForElementsToExist(parent, selector) {
    return new Promise(resolve => {
        if (parent.querySelectorAll(selector).length) {
            return resolve(parent.querySelectorAll(selector));
        }

        const observer = new MutationObserver(() => {
            if (parent.querySelectorAll(selector).length) {
                resolve(parent.querySelectorAll(selector));
                observer.disconnect();
            }
        });

        observer.observe(parent, {
            subtree: true,
            childList: true,
        });
    });
}

function scrollToCenter(target, container, yOffset) {
    let top = (target.offsetTop + (yOffset || 0)) + (target.clientHeight / 2);
    let center = top - (container.clientHeight / 2);
    container.scrollTo(0, center);
}

function pathTreeFilterArray(array, key, value) {
    var id = 1;
    let arr = array.filter(function (obj) {
        for (let i in obj) {
            // Match to beginning of path
            if (obj[key].indexOf(value) === 0) {
                obj.id = id++;
                obj.parentId = 0;
                delete obj.content // discard unnessary values for new array
                delete obj.tags
                return obj
            }
        }
    });
    return arr
}

function pathTreeSetParents(array) {
    for (let i in array) {
        const obj = array[i];
        let parts = [...String(obj.url).split('/')]; // in `String()` to avoid undefined errors
        let levels = parts.length - 2;
        if (levels > 1) {
            // Determine deepest path level
            for (const [i, value] of parts.entries()) {
                if (i === parts.length - 1) {
                    // Trim last level from full path to obtain parent URL
                    let fs = 1;
                    if (obj.url[obj.url.length - 1] != '/') { fs = 0; }; // check if permalink lacks trailing forwardslash
                    let parentPath = obj.url.substring(0, obj.url.length - parts[i - fs].length - fs);
                    let parentIndex = getIndexByValue(multiPaths, 'url', parentPath);
                    obj.parentId = multiPaths[parentIndex].id;
                }
            }
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
        li.innerHTML = '<a class="iconed icon-sidebar" href="' + el.url + '"><span class="label">' + el.title + '</span></a>';
        if (el.children.length) {
            li.classList.add('has-children');
            pathTreeCreateList(el.children, li);
        }
        ul.appendChild(li);
    });
    targetEl.appendChild(ul);
}