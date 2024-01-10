import * as func from './functions.js';

func.checkVp(checkLinks);
function checkLinks() {
    const pageWrapper = body.querySelector('.git-wiki-page');
    var allLinks = pageWrapper.querySelectorAll('a'); // only check links within content wrapper not sidebar
    allLinks.forEach(async (link) => {

        // External link handling
        if (link.hostname != window.location.hostname) {
            // Only apply icon within page content, excluding tag area/toolbar/search
            if (link.closest('#git-wiki-content')) {
                link.classList.add('external-link');
            }
            return // exclude from subsequent checks
        }

        if (!link.closest('.index.tags') && !link.closest('.index.section') && !link.closest('.index.all-pages')) {
            await checkStatus(link.href, link);
        }
    });
}

async function checkStatus(url, anchor) {
    Promise.all([
        fetch(url, {
            method: 'HEAD',
            mode: 'cors'
        }).then(response => response.status)
    ]).then(([status]) => {
        if (status == 404) {
            anchor.classList.add('broken-link');
            anchor.title = 'Page not found';
            throw new Error('Page not found: ' + anchor.getAttribute('href'));
        }
    }).catch((error) => {
        console.log(error.message)
    });
}