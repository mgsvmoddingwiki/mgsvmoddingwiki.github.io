// ----------------------------- Peripheral -----------------------------
// Any functions used here that aren't defined here are from inline script at top of custom body.html

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value)
}

function matchObjVal(object, value) {
    return Object.values(object).includes(value)
}

// ---------------------- Toolbar: button functions ---------------------
const buttonsMenu = document.querySelector('.git-wiki-tools');

// Page width toggle
const pageWidthToggleButton = buttonsMenu.querySelector('.page-width-toggle');

expandPageWidthTooltip(checkPageWidth('body'));

pageWidthToggleButton.addEventListener('click', (e) => {
    expandPageWidth(!checkPageWidth('body'));
    expandPageWidthTooltip(checkPageWidth('body'));
});

function expandPageWidthTooltip(expand) {
    const tooltip = pageWidthToggleButton.querySelector('.tooltip');
    if (expand == true) {
        tooltip.textContent = 'Contract Page Width';
    } else {
        tooltip.textContent = 'Expand Page Width';
    }
}

// Overflow menu
const moreOptionsMenu = buttonsMenu.querySelector('.more-options');
body.addEventListener('click', (e) => {
    // Detect if clicked within menu
    if (e.target.closest('.more-options')) {
        if (e.target.classList.contains('primary-button')) {
            if (!moreOptionsMenu.classList.contains('menu-open')) {
                visible(true);
            } else {
                visible(false);
            }
        }
        return;
    }
    visible(false); // Dismiss if clicked elsewhere

    function visible(state) {
        if (state == true) {
            moreOptionsMenu.classList.add('menu-open');
            moreOptionsMenu.parentNode.classList.add('menu-visible');
        } else {
            moreOptionsMenu.classList.remove('menu-open');
            moreOptionsMenu.parentNode.classList.remove('menu-visible');
        }
    }
});

// Set styling for active setting button
function radioButtonActivate(buttonsArray, name) {
    Object.values(buttonsArray).forEach(button => {
        removeMatchingClasses(button.parentNode, 'active');
    });
    buttonsArray[name].parentNode.classList.add('active');
}


// --------------------------- Theme switching --------------------------
const themeButtons = {
    light: buttonsMenu.querySelector('.theme-light-switcher a'),
    dark: buttonsMenu.querySelector('.theme-dark-switcher a'),
}
const themeRadio = themeButtons.light.closest('.menu-radio');

radioButtonActivate(themeButtons, checkTheme());

themeRadio.addEventListener('click', (e) => {
    if (matchObjVal(themeButtons, e.target)) {
        var themeType = getKeyByValue(themeButtons, e.target);
        setClassSetting(body, themeType, themeClassPrefix);
        radioButtonActivate(themeButtons, themeType);
    }
});


// ---------------------- Header graphic switching ----------------------
const graphicButtons = {
    default: buttonsMenu.querySelector('.header-graphic-switcher-default a'),
    second: buttonsMenu.querySelector('.header-graphic-switcher-second a'),
}
const graphicRadio = graphicButtons.default.closest('.menu-radio');
const headerElements = {
    desktop: body.querySelector('.header-graphic-desktop-image'),
    mobile: body.querySelector('#git-wiki-mobile-header a'),
}

radioButtonActivate(graphicButtons, checkGraphic(Object.keys(graphicButtons)[0])); // return first key name if no match

graphicRadio.addEventListener('click', (e) => {
    const defaultClass = graphicClassPrefix + '-' + Object.keys(graphicButtons)[0];
    if (matchObjVal(graphicButtons, e.target)) {
        var graphicType = getKeyByValue(graphicButtons, e.target);
        var currentClass = graphicClassPrefix + '-' + graphicType;
        var priorClass = checkPriorClass(body, graphicClassPrefix, defaultClass); // store the last used image class for transition purposes
        var inlineStyle = '--header-graphic-from: var(--' + priorClass + '); --header-graphic-to: var(--' + currentClass + ')';
        radioButtonActivate(graphicButtons, graphicType);
        setClassSetting(body, graphicType, graphicClassPrefix);
        for (let key in headerElements) {
            headerElements[key].style.cssText = inlineStyle; // define CSS variables via inline style
            if (priorClass != currentClass) {
                animReflow(headerElements[key]); // prevent animation retrigger if clicking same button
                animReflow(headerElements.desktop.parentNode.parentNode); // wrapper element
            }
        }
    }
});

function animReflow(el) {
    // Trigger re-flow so CSS animation can play again
    el.classList.remove('animate');
    void el.offsetWidth;
    el.classList.add('animate');
}

function checkPriorClass(el, prefix, defaultClass) {
    var priorClass = captureClass(el, prefix);
    if (typeof priorClass == 'undefined') {
        var priorClass = defaultClass;
    }
    return priorClass
}

function captureClass(el, prefix) {
    let result = el.className.split(' ').filter(c => c.startsWith(prefix));
    return result[0]
}


// --------------------------- Image handling ---------------------------
var imgs = [...document.querySelectorAll('.git-wiki-page img')];
imgs.forEach(img => {

    // Wrap images in container
    // Check if image already wrapped in link element (to not override it)
    if (img.parentElement.tagName.toLowerCase() === 'a') {
        var wrapperExists = true;
        var wrapper = img.parentElement;
    } else {
        var wrapper = document.createElement('div');
    }

    wrapper.classList.add(...img.classList); // copy img classes to link instead
    wrapper.classList.add('image-wrapper');
    img.removeAttribute('class');
    if (!wrapperExists) {
        img.setAttribute('data-zoomable','');
        wrapper.appendChild(img.cloneNode(true));
        img.parentNode.replaceChild(wrapper, img);
    }

    // Create caption element if image has alt text
    if (img.getAttribute('alt')) {
        var caption = document.createElement('small');
        caption.classList.add('caption');
        caption.textContent += img.getAttribute('alt');
        wrapper.appendChild(caption);
    }

});


// ---------------------- Image handling: lightbox ----------------------
const cssStyle = getComputedStyle(body);
var cssSpacing = Number(cssStyle.getPropertyValue('--spacing-lightbox').replace('px','')); // obtain variable from CSS, convert to integer

const zoom = mediumZoom('[data-zoomable]', {
    margin: cssSpacing
});

// Detect arrow left/right presses for image navigation
const attachKeyEvents = e => {
    document.addEventListener('keyup', handleKey, false)
}
const detachKeyEvents = e => {
    document.removeEventListener('keyup', handleKey, false)
}
const handleKey = e => {
    const images = zoom.getImages();
    const currentImageIndex = images.indexOf(zoom.getZoomedImage());
    let target

    if (images.length <= 1) {
        return
    }

    switch (e.code) {
        case 'ArrowLeft':
            target = currentImageIndex - 1 < 0 ?
                images[images.length - 1] : images[currentImageIndex - 1]
            switchNav();
            break;
        case 'ArrowRight':
            target = currentImageIndex + 1 >= images.length ?
                images[0] : images[currentImageIndex + 1]
            switchNav();
            break;
        default:
            break;
    }

    function switchNav() {
        // Check if element descendant of spoiler element and if it's in open state. If not, open it, to avoid image navigation glitches when spoiler is closed.
        if (target.closest('details')) {
            if (target.closest('details').open != open) {
                target.closest('details').open = true;
            }
            // Account for two-level nested spoilers
            if (target.closest('details details')) {
                if (target.closest('details').parentElement.open != open) {
                    target.closest('details').parentElement.open = true;
                }
            }
        }

        target.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
        });
        zoom.close().then(() => {
            zoom.open({
                target: target
            });
        });

    }

}

zoom.on('open', attachKeyEvents);
zoom.on('close', detachKeyEvents);


// --------------------------- Video handling ---------------------------
var videos = [...document.querySelectorAll('.git-wiki-page video')];
videos.forEach(video => {
    video.volume = 0.5; // set default volume to 50%
});


// ------------------------------- Infobox ------------------------------
// Replace 'Site', 'Download' link names with names of hostname from URL
var iblinks = [...document.querySelectorAll('.infobox a')];
iblinks.forEach(iblink => {
    // https://stackoverflow.com/a/8498629
    var matches = iblink.href.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];  // domain will be null if no match is found
    iblink.innerHTML = domain.replace('www.','');
});


// ----------------------------- Index lists ----------------------------
var listIndexes = [...document.querySelectorAll('.git-wiki-page .index')];
listIndexes.forEach(listIndex => {
    // Add unique class if only has single first-level list item
    if (!listIndex.children[1]) {
        listIndex.classList.add('single-list');
    }
});

// ---------------------------- Mobile header ---------------------------
// Hide header on downward scrolling
var lastScrollPos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    const mobileHeader = document.querySelector("#git-wiki-mobile-header");
    if (lastScrollPos >= currentScrollPos) {
        mobileHeader.classList.remove('hidden');
        mobileHeader.classList.add('visible');
        lastScrollPos = currentScrollPos;
    } else if (lastScrollPos + 200 < currentScrollPos) {
        mobileHeader.classList.remove('visible');
        mobileHeader.classList.add('hidden');
        lastScrollPos = currentScrollPos;
    }
}

// Override default hamburger menu inline onclick behavior
const mobileHamburger = document.querySelector('#git-wiki-mobile-header > button')
const pageWrapper = document.querySelector('body > .wrapper')
mobileHamburger.setAttribute('onclick','mobileMainMenuToggle()');

function mobileMainMenuToggle() {
    const rootHtml = document.querySelector('html');
    const dismissEl = document.querySelector('.git-wiki-page');
    if (pageWrapper.classList.contains('menu-open')) {
        rootHtml.removeAttribute('style');
        dismissEl.removeAttribute('onclick');
        pageWrapper.classList.remove('menu-open');
        pageWrapper.classList.add('menu-closed');
    } else {
        // Prevent underlying page from being scrollable so header doesn't get dismissed on scroll
        rootHtml.setAttribute('style','overflow: hidden');
        dismissEl.setAttribute('onclick','mobileMainMenuToggle()'); // crude method to dismiss menu by clicking elsewhere
        pageWrapper.classList.remove('menu-closed');
        pageWrapper.classList.add('menu-open');
    }
}