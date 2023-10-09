// -------------- Toolbar: add page width expansion buttton -------------
var toolsButton = document.querySelector('.tools-element:nth-of-type(5)');
var buttonExpand = document.createElement('span');
buttonExpand.classList.add('tools-element','page-expand');
buttonExpand.appendChild(document.createElement('span'));
toolsButton.parentNode.insertBefore(buttonExpand, toolsButton.nextSibling); // insert after toolsButton
// Add/remove class to body when clicked
buttonExpand.addEventListener('click', function onClick(event) {
    var body = document.body;
    if (!body.classList.contains('expanded-width')) {
        body.classList.add('expanded-width');
    } else {
        body.classList.remove('expanded-width');
    }
});


// --------------------------- Image handling ---------------------------
var img_array = [...document.querySelectorAll('.git-wiki-page img')];
img_array.forEach(img => {

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
const cssStyle = getComputedStyle(document.body);
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
var video_array = [...document.querySelectorAll('.git-wiki-page video')];
video_array.forEach(video => {
    video.volume = 0.5; // set default volume to 50%
});


// ------------------------------- Infobox ------------------------------
// Replace 'Site', 'Download' link names with names of hostname from URL
var iblink_array = [...document.querySelectorAll('.infobox a')];
iblink_array.forEach(iblink => {
    // https://stackoverflow.com/a/8498629
    var matches = iblink.href.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];  // domain will be null if no match is found
    iblink.innerHTML = domain.replace('www.','');
});


// ----------------------------- Index lists ----------------------------
var listIndex_array = [...document.querySelectorAll('.git-wiki-page .index')];
listIndex_array.forEach(listIndex => {
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
    const wikiPage = document.querySelector('.git-wiki-page');
    if (pageWrapper.classList.contains('menu-open')) {
        rootHtml.removeAttribute('style');
        wikiPage.removeAttribute('onclick');
        pageWrapper.classList.remove('menu-open');
        pageWrapper.classList.add('menu-closed');
    } else {
        // Prevent underlying page from being scrollable
        rootHtml.setAttribute('style','overflow: hidden');
        wikiPage.setAttribute('onclick','mobileMainMenuToggle()'); // allow menu to be dismissed by clicking elsewhere
        pageWrapper.classList.remove('menu-closed');
        pageWrapper.classList.add('menu-open');
    }
}