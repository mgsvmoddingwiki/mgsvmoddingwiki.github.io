import * as func from './functions.js';

body.addEventListener('click', (e) => {
    const tar = e.target;

    // Dismiss mobile menu if clicked outside it
    if (tar.closest('.mobile-menu-open .git-wiki-page')) {
        mobileMainMenuToggle();
        return
    }
});

// Set styling for active setting button
function radioButtonActivate(buttonsArray, name) {
    Object.values(buttonsArray).forEach(button => {
        removeMatchingClasses(button.parentNode, 'active');
    });
    buttonsArray[name].parentNode.classList.add('active');
}


// ---------------------- Toolbar: button functions ---------------------
const buttonsMenu = body.querySelector('.git-wiki-tools'),
      pageWidthToggleButton = buttonsMenu.querySelector('.page-width-toggle');

func.waitForElements(body, '.tooltip').then(() => {
    expandPageWidthTooltip(checkPageWidth('body'));
    pageWidthToggleButton.addEventListener('click', (e) => {
        expandPageWidth(!checkPageWidth('body'));
        expandPageWidthTooltip(checkPageWidth('body'));
    });
});

function expandPageWidthTooltip(expand) {
    let button = pageWidthToggleButton.querySelector('a'),
        label = body.querySelector('.tooltip .tooltip-label'),
        text = 'Expand',
        suffix = ' Page Width';
    if (expand) {
        text = 'Contract';
    }
    button.setAttribute('data-tooltip-text', text + suffix);
    label.textContent = text + suffix;
}


// --------------------------- Theme switching --------------------------
export function themeSwitching(menu) {
    const themeButtons = {
        light: menu.querySelector('.theme-light-switcher a'),
        dark: menu.querySelector('.theme-dark-switcher a'),
    }
    const themeRadio = themeButtons.light.closest('.menu-radio');

    radioButtonActivate(themeButtons, checkTheme());

    themeRadio.addEventListener('click', (e) => {
        if (func.matchObjVal(themeButtons, e.target)) {
            const themeType = func.getKeyByValue(themeButtons, e.target);
            setClassSetting(body, themeType, themeClassPrefix);
            radioButtonActivate(themeButtons, themeType);
        }
    });
}


// ---------------------- Header graphic switching ----------------------
export function headerGraphicSwitching(menu) {
    const graphicButtons = {
        default: menu.querySelector('.header-graphic-switcher-default a'),
        second: menu.querySelector('.header-graphic-switcher-second a'),
    }
    const graphicRadio = graphicButtons.default.closest('.menu-radio');
    const headerElements = {
        desktop: body.querySelector('.header-graphic-desktop-image'),
        mobile: body.querySelector('#git-wiki-mobile-header a'),
    }

    radioButtonActivate(graphicButtons, checkGraphic(Object.keys(graphicButtons)[0])); // return first key name if no match

    graphicRadio.addEventListener('click', (e) => {
        const defaultClass = graphicClassPrefix + '-' + Object.keys(graphicButtons)[0];
        if (func.matchObjVal(graphicButtons, e.target)) {
            const graphicType = func.getKeyByValue(graphicButtons, e.target);
            const currentClass = graphicClassPrefix + '-' + graphicType;
            const priorClass = checkPriorClass(body, graphicClassPrefix, defaultClass); // store the last used image class for transition purposes
            const inlineStyle = '--header-graphic-from: var(--' + priorClass + '); --header-graphic-to: var(--' + currentClass + ')';
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
}

function animReflow(el) {
    // Trigger re-flow so CSS animation can play again
    el.classList.remove('animate');
    void el.offsetWidth;
    el.classList.add('animate');
}

function checkPriorClass(el, prefix, defaultClass) {
    let priorClass = captureClass(el, prefix);
    if (typeof priorClass == 'undefined') {
        priorClass = defaultClass;
    }
    return priorClass
}

function captureClass(el, prefix) {
    const result = el.className.split(' ').filter(c => c.startsWith(prefix));
    return result[0]
}

document.addEventListener('DOMContentLoaded',() => {
    // --------------------------- Image handling ---------------------------
    let imgs = document.querySelectorAll('body:not(.search-page) .git-wiki-page img');
        imgs.forEach(img => {
            // Wrap images in container
            // Check if image already wrapped in link element (to not override it)
            let wrapper,
                wrapperExists;
            if (img.parentElement.tagName.toLowerCase() === 'a') {
                wrapperExists = true;
                wrapper = img.parentElement;
            } else {
                wrapper = document.createElement('div');
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
                const caption = document.createElement('small');
                caption.classList.add('caption');
                caption.textContent += img.getAttribute('alt');
                wrapper.appendChild(caption);
            }

        });

    // ---------------------- Image handling: lightbox ----------------------
    const cssStyle = getComputedStyle(body),
          cssSpacing = Number(cssStyle.getPropertyValue('--spacing-lightbox').replace('px','')); // obtain variable from CSS, convert to integer

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

    // ------------------------------- Infobox ------------------------------
    // Replace 'Site', 'Download' link names with names of hostname from URL
    let iblinks = body.querySelectorAll('.infobox a');
    iblinks.forEach(iblink => {
        // https://stackoverflow.com/a/8498629
        const matches = iblink.href.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i),
              domain = matches && matches[1];  // domain will be null if no match is found
        iblink.innerHTML = domain.replace('www.','');
    });

    // ----------------------------- Index lists ----------------------------
    let listIndexes = body.querySelectorAll('.git-wiki-page .index');
    listIndexes.forEach(listIndex => {
        // Add unique class if only has single first-level list item
        if (!listIndex.children[1]) {
            listIndex.classList.add('full-width');
        }
    });

    // -------------------------- Content headings --------------------------
    // Add fragment identifier links on hover
    let contentHeadings = body.querySelectorAll('.git-wiki-page h2, .git-wiki-page h3, .git-wiki-page h4'); // add to h4, too, even if not included in ToC
    contentHeadings.forEach(heading => {
        heading.classList.add('heading-with-frag-id');
        const link = document.createElement('a');
        link.classList.add('heading-frag-id-link','iconed');
        link.setAttribute('href', '#' + heading.getAttribute('id'));
        heading.appendChild(link);
    });


    // ---------------------------- Mobile header ---------------------------
    // Hide header on downward scrolling
    let lastScrollPos = window.pageYOffset;
    window.onscroll = function() {
        const currentScrollPos = window.pageYOffset,
              mobileHeader = body.querySelector("#git-wiki-mobile-header");
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
    const mobileHamburger = body.querySelector('#git-wiki-mobile-header > button');
    mobileHamburger.removeAttribute('onclick'); // disable default theme onclick behavior
    mobileHamburger.addEventListener('click', (e) => {
        mobileMainMenuToggle();
    });
});

export function mobileMainMenuToggle() {
    const pageWrapper = body.querySelector('body > .wrapper'),
          rootHtml = document.documentElement;
    if (pageWrapper.classList.contains('mobile-menu-open')) {
        rootHtml.removeAttribute('style');
        pageWrapper.classList.remove('mobile-menu-open');
        pageWrapper.classList.add('mobile-menu-closed');
    } else {
        // Prevent underlying page from being scrollable so header doesn't get dismissed on scroll
        rootHtml.setAttribute('style','overflow: hidden');
        pageWrapper.classList.remove('mobile-menu-closed');
        pageWrapper.classList.add('mobile-menu-open');
    }
}