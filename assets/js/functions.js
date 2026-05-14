// General reusable functions

export function getRect(el) {
    return el.getBoundingClientRect()
}

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
}

export function matchObjVal(object, value) {
    return Object.values(object).includes(value)
}

// Expects string, array of strings or boolean/number inputs
export function filterArrayByObjVal(array, key, value) {
    const target = typeof value === 'string' ? value.toLowerCase() : value;
    return array.filter((item) => {
        const v = item[key];
        const check = Array.isArray(v) ? v : v == null ? [] : [v]; // wrap value in array if not already one
        return check.some((c) =>
            typeof c === 'string' && typeof target === 'string'
                ? c.toLowerCase() === target
                : c === target
        );
    })
}

export function getIndexByValue(array, key, value) {
    return array.findIndex(obj => obj[key] == value);
}

export function clamp(num, min, max) {
    return num <= min
        ? min
        : num >= max
            ? max
            : num
}

export function removeChildText(parent) {
    // Remove only standalone child text while retaining sibling elements
    let children = parent.childNodes;
    children.forEach(c => c.nodeType === Node.TEXT_NODE && c.remove());
}

export function getPathLevels(url) {
    const parts = [...String(url).replace('/?/','/').split('/')], // in `String()` to avoid undefined errors, replace virtual page URL basis for consistency
          levels = parts.length - 2;
    return {parts, levels}
}

export function getPageUrls(includeParams) {
    let location;
    if (includeParams) {
        location = window.location.pathname + window.location.search;
    } else {
        location = window.location.pathname;
    }
    const curUrl = trimTrailFs(location) + '/', // always force trailing forwardslash since both search indexes force them, too, for consistency of lookups
          curUrlRoot = '/' + trimTrailFs(curUrl.split('/')[1]) + '/'; // obtain first-level path of current URL
    return {curUrl, curUrlRoot} // return object will have keys named after these vars
}

export function trimTrailFs(string) {
    return string.replace(/(\/)?$/gm, '');
}

export function formatTagAsLink(tagString) {
    return '/' + tagString.replaceAll(' ','_')
}

export function waitForElements(parent, selector) {
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

export async function checkVp(callback) {
    const { isVirtualPage } = await import('./virtualpages.js');
    if (isVirtualPage) {
        waitForElements(body, '.vp-loaded').then(nodes => {
            nodes.forEach(el => {
                callback();
                // Watch for history changes to re-trigger
                new MutationObserver((mutations) => {
                  if (mutations[0].attributeName === 'class') {
                    callback();
                  }
                }).observe(el, { attributes: true });
            });
        });
    } else {
        callback();
    }
}

export function htmlFromArray(array, targetEl) {
    let parent;
    if (typeof targetEl === 'object') {
        parent = targetEl;
    } else {
        parent = document.createElement(targetEl)
    }
    array.forEach((el) => {
        const node = document.createElement(el.tag);
        if (el.text) { node.textContent = el.text; }
        if (el.attr) {
            Object.entries(el.attr).forEach(([key, value]) => {
                if (key == 'class') {
                    value = Array.from(value).join(' '); // for some reason arrays in loop aren't returned as arrays so this converts it
                }
                node.setAttribute(key, value);
            });
        }
        if (el.html) { node.innerHTML = el.html; }
        if (el.children) {
            htmlFromArray(el.children, node);
        }
        parent.appendChild(node);
    });
    return parent
}

export function debounce(fn,timeframe = 200,immediate = true) {
    let timeoutId;

    return function(...args) {
        const callNow = immediate && !timeoutId;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            timeoutId = null;
            if (!immediate) {
                fn.apply(this,args);
            }
        },timeframe);

        if (callNow) {
            fn.apply(this,args);
        }
    }
}

export function setClasses(el,classes) {
    if (Array.isArray(classes)) {
        el.classList.add(...classes);
    } else {
        el.classList.add(classes);
    }
}

export function removeClasses(el,classes) {
    if (Array.isArray(classes)) {
        el.classList.remove(...classes);
    } else {
        el.classList.remove(classes);
    }
}

export function createEl(type,classes) {
    let el = document.createElement(type.toLowerCase());
    if (classes) { setClasses(el,classes); }
    return el
}

export function pluralize(count, mapping, locale = 'en-US') {
    const pluralRules = new Intl.PluralRules(locale),
          category = pluralRules.select(count);
    let word;

    if (mapping.has(category)) {
        word = mapping.get(category); // by not using an OR operator inline it can output deliberately empty strings
    } else {
        word = mapping.get('other'); // otherwise try fallback category
    }
    return word
}

export function appendStylesheet(url) {
    // Check if it already exists
    if (document.querySelector(`link[href="${url}"]`)) return

    const link = createEl('link');
    link.rel = 'stylesheet';
    link.href = url;

    document.head.appendChild(link);
}