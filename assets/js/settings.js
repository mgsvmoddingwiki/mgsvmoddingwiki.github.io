const body = document.body;
const themePreferred = window.matchMedia("(prefers-color-scheme: light)");
const themeClassPrefix = 'theme';
const pageWidthClassPrefix = 'expanded-width';
const graphicClassPrefix = 'header-graphic';
const siblingSpoilersVis = 'sidebar-spoilers-visible';

// Detect localStorage support
// https://stackoverflow.com/a/41462752
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

function checkTheme(theme) {
    if (theme) {
        setClassSetting(body, theme, themeClassPrefix);
    } else {
        var themeSetting = getStorage(themeClassPrefix);
        if (typeof themeSetting !== 'undefined' && themeSetting !== null) {
            var themeType = themeSetting;
        } else {
            if (themePreferred.matches == false) {
                var themeType = 'dark';
            } else {
                var themeType = 'light';
            }
        }
        setClassSetting(body, themeType, themeClassPrefix);
        return themeType
    }
}

function setClassSetting(el, name, prefix) {
    removeMatchingClasses(el, prefix);
    el.classList.add(prefix + '-' + name);
    setStorage(prefix, name);
}

function setStorage(name, value) {
    if (storageAvailable('localStorage')) {
        window.localStorage.setItem(name, value);
    }
}

function getStorage(name) {
    if (storageAvailable('localStorage')) {
        return window.localStorage.getItem(name);
    }
}

function checkPageWidth(checkType) {
    if (checkType == 'body') {
        if (body.classList.contains(pageWidthClassPrefix + '-true')) {
            return true
        }
    }
    if (checkType == 'localStorage') {
        var pageWidthSetting = (getStorage(pageWidthClassPrefix) == 'true'); // Convert string to boolean
        if (typeof pageWidthSetting !== 'undefined') {
            expandPageWidth(pageWidthSetting,true);
        }
    }
}

function expandPageWidth(expand, isInstant) {
    setClassSetting(body, expand, pageWidthClassPrefix);
    if (expand == true && isInstant) {
        body.classList.add(pageWidthClassPrefix + '-instant'); // to prevent CSS transition on page load
    }
}

function checkGraphic(name) {
    var graphicSetting = getStorage(graphicClassPrefix);
    if (typeof graphicSetting !== 'undefined' && graphicSetting !== null) {
        setClassSetting(body, graphicSetting, graphicClassPrefix);
        return graphicSetting
    } else {
        return name
    }
}

function removeMatchingClasses(el, prefix) {
    const classes = el.className.split(' ').filter(c => !c.startsWith(prefix));
    el.className = classes.join(' ').trim();
}

checkTheme();
checkPageWidth('localStorage');
checkGraphic();