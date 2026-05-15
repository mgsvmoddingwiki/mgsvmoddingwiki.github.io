import * as func from './functions.js';
import { themeSwitching, headerGraphicSwitching } from './general.js';

const rootHtml = document.querySelector('html'); // this can't be added to `settings.js` since it slows down immediacy of initial page styling
let curActive,
    curActiveMenu,
    targets,
    tooltip,
    tooltipMenu;

func.checkVp(init);

function attachListeners(tooltip) {
    tooltip.addEventListener('mouseover', (e) => {
        let tar = e.target,
            element = tooltip;
            if (tar.classList.contains('tooltip-hide')) {
                return
            }
            if (tar.hasAttribute('data-tooltip-menu')) {
                // Prevent other menus from activating on hover if one menu already open
                if (!tooltipMenu.classList.contains('tooltip-menu-open')) {
                    genMenuContent(tar);
                    element = tooltipMenu;
                    curActive = tar;
                    styleContent(tar, true);
                }
            } else {
                curActive = tar;
                styleContent(tar, true);
            }
    });

    tooltip.addEventListener('mouseout', (e) => {
        let tar = e.target;
        if (tar.hasAttribute('data-tooltip-menu') && tooltipMenu.classList.contains('tooltip-menu-open')) {
            return
        } else {
            styleContent(tar, false);
        }
    });
}

async function init() {
    if (tooltip) {
        // Remove in case on virtual page (to avoid duplication)
        tooltip.remove();
        tooltipMenu.remove();
    }
    targets = Array.from(body.querySelectorAll('[data-tooltip-text]'));
    await genPlaceholders();

    targets.forEach((target) => {
        attachListeners(target);
    });
}

async function genPlaceholders() {
    let tooltipArray = [
        {
            tag: 'div',
            attr: {
                class: ['tooltip']
            },
            children: [
                {
                    tag: 'div',
                    attr: {
                        class: ['tooltip-label']
                    },
                    text: ''
                }
            ]
        }
    ];
    func.htmlFromArray(tooltipArray, body);
    tooltip = body.querySelector('.tooltip');

    let menuAdd = {
        tag: 'div',
        attr: {
            class: ['menu-content']
        }
    }

    tooltipArray[0].attr.class.push('menu');
    tooltipArray[0].children.push(menuAdd);
    func.htmlFromArray(tooltipArray, body);
    tooltipMenu = body.querySelector('.tooltip.menu');
}

function genMenuContent(target) {
    let menu = target.getAttribute('data-tooltip-menu'),
        content = tooltipMenu.querySelector('.menu-content'),
        html;
    content.innerHTML = '';

    if (menu == 'more-options') {
        let deleteUrl = target.getAttribute('data-delete-page-url');
        html = `
            <div class="menu-radio">
                <div class="menu-button theme-light-switcher"><a class="iconed icon-toolbar icon-themes-light"></a></div>
                <div class="menu-button theme-dark-switcher"><a class="iconed icon-toolbar icon-themes-dark"></a></div>
            </div>
            <div class="menu-radio">
                <div class="menu-button header-graphic-switcher-default"><a class="graphic-button"></a></div>
                <div class="menu-button header-graphic-switcher-second"><a class="graphic-button"></a></div>
            </div>
            <hr/>
            <div class="menu-button standalone delete">
                <a target="_blank" href="` + deleteUrl + `">
                    <span class="iconed icon-toolbar icon-delete label dim">Delete Page</span>
                </a>
            </div>
        `
        content.innerHTML = html;
        themeSwitching(tooltipMenu);
        headerGraphicSwitching(tooltipMenu);
    }
}

function styleContent(target, state) {
    let menu = target.hasAttribute('data-tooltip-menu'),
        element = menu ? tooltipMenu : tooltip,
        menuOpen = element.classList.contains('tooltip-menu-open');
    toggleVis(element, state);
    let targetRect = func.getRect(target),
        tooltipRect = func.getRect(element),

        // Since `getComputedStyle` outputs the immediate rendered width on click (prior to any transitions/anims ending) the final width can't be obtained ASAP so this checks the max menu width instead
        maxMenu = menuOpen ? parseInt(getComputedStyle(element).getPropertyValue('--max-width-open')) : 0,
        spacing = parseInt(getComputedStyle(body).getPropertyValue('--spacing-primary')),
        min = (element.getAttribute('data-last-width') / 2) - (spacing / 2),
        max = (window.innerWidth - (element.getAttribute('data-last-width') / 2)) - (spacing / 2),
        menuWidthDiff = menuOpen ? Math.round((maxMenu - tooltipRect.width) / 2) : 0,
        menuOpenOffset = ((menuWidthDiff * 2) + targetRect.left > max) ? menuWidthDiff : 0, // right-most menus

        top = Math.round(targetRect.height + targetRect.top - body.scrollTop),
        left = Math.round(func.clamp(targetRect.left + (targetRect.width / 2), min, max)),
        label = element.querySelector('.tooltip-label');

    // Left-most menus
    if (menuOpenOffset == 0 && (targetRect.left - (menuWidthDiff * 2) < min)) {
        menuOpenOffset = (-1 * menuWidthDiff);
    }

    // If function triggered by viewport/scroll update only positions
    if (state === undefined) {
        element.style.cssText = element.style.cssText.replace(/(?<=top: )[-0-9]+(?=px)/, top).replace(/(?<=left: )[-0-9]+(?=px)/, left);
    } else {
        element.style.cssText = '--top: ' + top + 'px; --left: ' + left + 'px; --menu-open-offset: ' + menuOpenOffset + 'px;';
    }

    element.classList.toggle('offset-add', target.classList.contains('primary-button'));
    label.textContent = target.getAttribute('data-tooltip-text');
}

function toggleVis(el, state) {
    if (state) {
        el.classList.add('visible');
        el.classList.remove('hidden');
    } else {
        if (!el.classList.contains('tooltip-menu-open')) {
            el.classList.remove('visible');
            el.classList.add('hidden');
        }
    }
}

function menuOpen(state, el) {
    let target;
    if (el) {
        target = el;
        toggle(target);
    } else {
        if (curActiveMenu) {
            target = curActiveMenu;
            if (state) {
                toggle(target);
            } else {
                toggle(target);
                curActiveMenu = null;
            }
        }
    }
    function toggle(el) {
        tooltipMenu.classList.toggle('tooltip-menu-open', state);
        el.classList.toggle('tooltip-menu-open', state);

        // Add class to hide specific adjacent sibling tooltips that would otherwise overlap while menu open
        if (el.closest('.git-wiki-tools')) {
            let wrapper = el.closest('.git-wiki-tools'),
                buttons = wrapper.querySelectorAll('.primary-button');
            buttons.forEach((button) => {
                button.classList.toggle('tooltip-hide', state);
            });
        }
    }
}

body.addEventListener('click', (e) => {
    const tar = e.target;

    if (tar.hasAttribute('data-tooltip-menu') || tar.closest('.tooltip.menu')) {
        if (tar.hasAttribute('data-tooltip-menu')) {
            e.preventDefault();
            if (!tooltipMenu.classList.contains('tooltip-menu-open')) {
                genMenuContent(tar); // always regen content
                tooltipMenu.setAttribute('data-last-width', func.getRect(tooltipMenu).width); // store width from prior to click, to preserve any future offset
                menuOpen(true, tar);
                styleContent(tar, true);
                curActiveMenu = tar;
            } else {
                menuOpen(false, tar);
            }
        }
        return
    }

    menuOpen(false); // Dismiss if clicked elsewhere
    toggleVis(tooltipMenu, false);
    tooltipMenu.setAttribute('data-last-width','');
});

function updatePos() {
    if (curActive) { styleContent(curActive); }
    if (curActiveMenu) { styleContent(curActiveMenu); }
}

// Account for new position on scroll and viewport/body resizing
let scrollPriorPos = 0,
    ticking = false;
document.addEventListener("scroll", (event) => {
    scrollPriorPos = window.scrollY;
    if (!ticking) {
        // Throttle scroll event updates
        window.requestAnimationFrame(() => {
            updatePos();
            ticking = false;
        });
        ticking = true;
    }
});

let resizePriorWidth = 0;
const resize = new ResizeObserver(entries => {
    for (const entry of entries) {
        const width = entry.borderBoxSize?.[0].inlineSize;
        if (typeof width === 'number' && width !== resizePriorWidth) {
            resizePriorWidth = width;
            updatePos();
        }
    }
});

resize.observe(rootHtml, {box: 'border-box'});
resize.observe(body, {box: 'border-box'}); // necessary since page width toggle can affect body width independently of viewport width

// For elements added via JS later
function checkNodeForTarget(node) {
    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('data-tooltip-text') && !targets.includes(node)) {
        attachListeners(node);
        targets.push(node);
    }
}

const checkNewTargets = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            checkNodeForTarget(node);
            // Check children for targets
            if (node.querySelectorAll) {
                node.querySelectorAll('*').forEach((child) => {
                    checkNodeForTarget(child);
                });
            }
        }
    }
});

checkNewTargets.observe(body, {
    subtree: true,
    childList: true,
});