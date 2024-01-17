import { isVirtualPage } from './virtualpages.js';

// General reusable functions for Javascript modules (avoids race conditions for deferred scripts)

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
}

export function matchObjVal(object, value) {
    return Object.values(object).includes(value)
}

export function filterArrayByObjVal(array, key, value) {
    return array.filter(item => item[key].findIndex(val => {
        return val.toLowerCase() === value.toLowerCase();
        }) !== -1)
}

export function getIndexByValue(array, key, value) {
    return array.findIndex(obj => obj[key] == value);
}

export function removeChildText(parent) {
    // Remove only standalone child text while retaining sibling elements
    let children = parent.childNodes;
    children.forEach(c => c.nodeType === Node.TEXT_NODE && c.remove());
}

export function getPathLevels(url) {
    let parts = [...String(url).replace('/?/','/').split('/')]; // in `String()` to avoid undefined errors, replace virtual page URL basis for consistency
    let levels = parts.length - 2;
    return {parts, levels}
}

export function getPageUrls(isVirtualPage) {
    var location;
    if (isVirtualPage) {
        location = window.location.pathname + window.location.search;
    } else {
        location = window.location.pathname;
    }
    var curUrl = trimTrailFs(location) + '/'; // always force trailing forwardslash since both search indexes force them, too, for consistency of lookups
    var curUrlRoot = '/' + trimTrailFs(curUrl.split('/')[1]) + '/'; // obtain first-level path of current URL
    return {curUrl, curUrlRoot} // return object will have keys named after these vars
}

export function trimTrailFs(string) {
    return string.replace(/(\/)?$/gm, '');
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

export async function checkVp(funcName) {
    var { isVirtualPage } = await import('./virtualpages.js');
    if (isVirtualPage) {
        waitForElements(body, '.vp-loaded').then(nodes => {
            nodes.forEach(el => {
                funcName();
                // Watch for history changes to re-trigger
                new MutationObserver((mutations) => {
                  if (mutations[0].attributeName === 'class') {
                    funcName();
                  }
                }).observe(el, { attributes: true });
            });
        });
    } else {
        funcName();
    }
}