import * as func from './functions.js';
import { searchIndex } from './searchindex.js';
import { getFirstImageFromText, applyMarkupExclusionsToString } from './searchdata.js';

export function init() {
    func.appendStylesheet('/assets/css/widgets.css');

    const recentChangesWidgets = body.querySelectorAll('.widget.recent-changes');
    if (recentChangesWidgets.length > 0) recentChangesHandling(recentChangesWidgets);

    const embedPageHighlightWidgets = body.querySelectorAll('.widget.embed-page-highlight');
    if (embedPageHighlightWidgets.length > 0) embedPageHighlightHandling(embedPageHighlightWidgets);
}

function embedPageHighlightHandling(widgets) {
    widgets.forEach((widget) => {
        widget.classList.add('ib');

        if (widget.hasAttribute('data-height')) {
            const h = parseInt(widget.getAttribute('data-height'));
            if (h) widget.style.setProperty('height', `${h}px`);
            widget.removeAttribute('data-height');
        }

        // Reason for dual containers is both so the next item can pre-load any image in the background and also to give more freedom with transitions (for shuffle types only)
        const itemA = func.createEl('div',['item', 'item-a']),
              itemB = func.createEl('div',['item', 'item-b']);

        const elMap = {
            keys: ['itemA', 'itemB'],
            itemA: {
                backgroundLink: func.createEl('a','background-link'),
                backgroundCont: func.createEl('div','background-wrapper'),
                backgroundTextCont: func.createEl('div','background-text-wrapper'),
                image: func.createEl('img',['page-image', 'hidden']),
                infoCont: func.createEl('div','info-wrapper'),
                title: func.createEl('strong','title'),
                tagsCont: func.createEl('ul',['tags-wrapper', 'ib-tags-list'])
            },
            progressTrack: func.createEl('div','progress-bar'),
            progressFill: func.createEl('div','progress-fill'),
            actionsCont: func.createEl('div','actions-wrapper'),

            featuredButton: func.createEl('div', ['featured-button','ib-primary-button','iconed','icon-star']),
            featuredButtonIcon: func.createEl('div','icon-wrapper'),

            shuffleButtonMain: func.createEl('div', ['shuffle-button','ib-primary-button','iconed','icon-refresh']),
            shuffleButtonMainIcon: func.createEl('div','icon-wrapper'),

            shuffleButtonSmall: func.createEl('div', ['shuffle-button','ib-primary-button','secondary','iconed','icon-small-refresh']),
            shuffleButtonSmallIcon: func.createEl('div','icon-wrapper')
        };

        itemA.append(
            elMap.itemA.backgroundLink,
            elMap.itemA.infoCont
        );

        elMap.itemB = {};
        Object.entries(elMap.itemA).forEach(([key, el]) => {
            elMap.itemB[key] = el.cloneNode(true);
        });

        itemB.append(
            elMap.itemB.backgroundLink,
            elMap.itemB.infoCont
        );

        function innerAppends(obj) {
            const keys = obj.keys;
            keys.forEach((key) => {
                elMap[key].infoCont.append(
                    elMap[key].title,
                    elMap[key].tagsCont
                );
                elMap[key].backgroundCont.append(
                    elMap[key].backgroundTextCont,
                    elMap[key].image
                );
                elMap[key].backgroundLink.append(elMap[key].backgroundCont);
            })
        }

        elMap.itemA.cont = itemA;
        elMap.itemB.cont = itemB;
        innerAppends(elMap);

        elMap.progressTrack.append(elMap.progressFill);
        elMap.featuredButton.append(elMap.featuredButtonIcon);
        elMap.shuffleButtonMain.append(elMap.shuffleButtonMainIcon);
        elMap.shuffleButtonSmall.append(elMap.shuffleButtonSmallIcon);
        elMap.actionsCont.append(
            elMap.featuredButton,
            elMap.shuffleButtonMain,
            elMap.shuffleButtonSmall
        );
        widget.append(
            itemA,
            itemB,
            elMap.progressTrack,
            elMap.actionsCont
        );

        if (widget.classList.contains('shuffle')) {
            embedShuffled(widget,elMap);
        } else if (widget.classList.contains('type-single')) {
            embedSingle(widget,elMap);
        }
    });
}

function setError(widget, message) {
    console.log(`Widgets: ${message}`);
    widget.setAttribute('data-error', message);
    widget.classList.add('error');
}

function embedSingle(widget, elms) {
    let permalink;

    [
        elms.progressTrack,
        elms.featuredButton,
        elms.shuffleButtonMain,
        elms.shuffleButtonSmall,
        elms.itemB.cont
    ].forEach((el) => {
        el.classList.add('hidden-generic');
    });

    if (widget.hasAttribute('data-permalink')) {
        permalink = widget.getAttribute('data-permalink');
        if (!permalink) {
            setError(widget, `Permalink not defined`);
            return
        }
    }

    permalink = permalink.replace(/^\/+|\/+$/g, ''); // trim any leading/trailing forwardslashes

    const filteredArray = func.filterArrayByObjVal(searchIndex,'url',`/${permalink}/`);
    if (!filteredArray.length > 0) {
        setError(widget, `No matching page found to to embed`);
        return
    }

    setEmbedItemContent(elms, 'itemA', filteredArray[0]);
    revealWidget(widget);
}

function embedShuffled(widget, elms) {
    let type,
        filteredArray,
        tag;

    if (widget.classList.contains('type-featured')) {
        filteredArray = func.filterArrayByObjVal(searchIndex,'featured',true);
        if (!filteredArray.length > 0) {
            setError(widget, `No featured pages found to embed`);
            return
        }
        type = 'featured';
        elms.shuffleButtonMain.classList.add('hidden-generic');
    } else if (widget.classList.contains('type-tag')) {
        if (widget.hasAttribute('data-tag')) {
            tag = widget.getAttribute('data-tag');
            if (!tag) {
                setError(widget, `No tag set to embed`);
                return
            }
        }
        filteredArray = func.filterArrayByObjVal(searchIndex,'tags', tag);
        if (!filteredArray.length > 0) {
            setError(widget, `No pages found for ${tag} to embed`);
            return
        }
        type = 'tag';
        elms.featuredButton.classList.add('hidden-generic');
        elms.shuffleButtonSmall.classList.add('hidden-generic');
    }
    if (type !== 'tag') elms.progressTrack.classList.add('hidden-generic'); // timer enabled only for tag type since the expectation is fewer pages will be featured (for the time being) vs various tags so manual progression will help it feel less repetitive

    let parKeys = elms.keys,
        curPar,
        nextPar,
        firstCycle = true,
        swapIsAnimating = false;

    const cycleParents = (() => {
        let i = 0;
        return {
            current: () => parKeys[i % parKeys.length],
            next: () => parKeys[(i + 1) % parKeys.length],
            advance: () => { i++ }
        }
    })();

    const shuffler = createShuffler({
        array: filteredArray,
        interval: 10000,
        delay: 500,
        onUpdate: (item, index) => {
            const nextItem = shuffler.getUpcomingItem();

            function setInitialClasses() {
                elms[curPar].cont.classList.remove('back-item');
                elms[curPar].cont.classList.add('fore-item');
                elms[nextPar].cont.classList.remove('fore-item');
                elms[nextPar].cont.classList.add('back-item');
            }

            if (firstCycle) {
                firstCycle = false;
                cycleParents.advance();
                curPar = cycleParents.current();
                nextPar = cycleParents.next();
                setEmbedItemContent(elms, curPar, item);
                setEmbedItemContent(elms, nextPar, nextItem);
                setInitialClasses();
                if (type !== 'tag') shuffler.pause(); // for forcing manual progression
                return
            }

            setInitialClasses();

            widget.classList.add('item-swap-occurring');
            elms[curPar].cont.classList.add('next-item-swap');
            swapIsAnimating = true;
            elms[curPar].cont.addEventListener('animationend',() => {
                swapIsAnimating = false;
                widget.classList.remove('item-swap-occurring');
                elms[curPar].cont.classList.remove('next-item-swap', 'fore-item');
                elms[curPar].cont.classList.add('back-item');
                elms[nextPar].cont.classList.remove('back-item');
                elms[nextPar].cont.classList.add('fore-item');

                setEmbedItemContent(elms, curPar, nextItem);
                cycleParents.advance();
                curPar = cycleParents.current();
                nextPar = cycleParents.next();
            },{once: true});
        },
        onPause: () => {
            widget.classList.add('paused');
        },
        onResume: () => {
            widget.classList.remove('paused');
        },
        onProgress: (frac, phase) => {
            let val;
            if (phase === 'progress') {
                val = Math.round(frac * 10000) / 100;
                if (val === 100) elms.progressTrack.classList.add('complete');
                elms.progressTrack.style.setProperty('--progress', `${val}%`);
            }
            if (phase === 'delay') {
                val = parseInt(frac * 10000 / 100); // made coarser since delay is faster so stepping between values will be imperceptible
                if (val === 100) {
                    val = 0; // reset back to 0 if elapsed so can be combined in CSS
                    elms.progressTrack.classList.remove('complete');
                }
                elms.progressTrack.style.setProperty('--delay-progress', `${val}%`);
            }
        }
    });

    shuffler.start();
    revealWidget(widget);

    if (type === 'featured') {
        elms.featuredButton.setAttribute('data-tooltip-text', 'See all featured');
        elms.featuredButton.addEventListener('click', () => {
            window.location.href = `/search?q=featured:true`
        });
        elms.shuffleButtonSmall.addEventListener('click', () => {
            if (!swapIsAnimating) shuffler.next();
        });
    }
    let last = null;
    if (type === 'tag') {
        widget.addEventListener('mouseenter', () => {shuffler.pause()});
        widget.addEventListener('mouseleave', () => {shuffler.resume()});
        elms.shuffleButtonMain.addEventListener('click', () => {
            if (!swapIsAnimating) shuffler.next(true);
        });
    }
}

function setEmbedItemContent(elMap, contKey, item) {
    function setTextBackground(key, item) {
        elMap[key].image.classList.add('hidden');
        elMap[key].backgroundTextCont.textContent = applyMarkupExclusionsToString(item.content);
    }

    elMap[contKey].backgroundLink.href = item.url;
    elMap[contKey].title.textContent = item.title;

    elMap[contKey].backgroundTextCont.innerHTML = '';
    elMap[contKey].backgroundCont.classList.remove('has-image');
    const pageImage = item.image ?? getFirstImageFromText(item.content);

    if (pageImage) {
        elMap[contKey].backgroundCont.classList.add('has-image');
        elMap[contKey].image.src = pageImage;
        elMap[contKey].image.classList.remove('hidden');

        // In case image doesn't load
        elMap[contKey].image.addEventListener('error', () => {
            elMap[contKey].backgroundCont.classList.remove('has-image');
            elMap[contKey].image.classList.add('hidden');
            elMap[contKey].image.src = '';
            setTextBackground(contKey, item);
        }, {once: true});
    } else {
        setTextBackground(contKey, item);
    }

    elMap[contKey].tagsCont.innerHTML = '';
    if (item.tags && item.tags.length > 0) {
        item.tags.forEach((tag) => {
            const item = func.createEl('li',['ib-tag-list-item', 'tag-list-item']),
                  link = func.createEl('a',['ib-tag-list-tag','tag-list-tag']);
            link.href = func.formatTagAsLink(tag);
            link.textContent = tag;
            item.append(link);
            elMap[contKey].tagsCont.append(item);
        });
    }
}

function recentChangesHandling(widgets) {
    fetch('/assets/js/recentcommits.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network error: ${response.statusText}`);
            }
            return response.json()
        }).then((json) => {
            widgets.forEach((widget) => {
                const scrollableCont = widget.querySelector('.scrollable-wrapper'),
                      outerList = widget.querySelector('.outer-list'),
                      buttonUp = widget.querySelector('.nav-button.up'),
                      buttonDown = widget.querySelector('.nav-button.down');

                for (const date of Object.keys(json)) {
                    const items = json[date],
                          mainItem = func.createEl('li'),
                          urlList = func.createEl('ul','url-list'),
                          label = func.createEl('span','label'),
                          labelText = func.createEl('span','label-text');

                    labelText.textContent = date;
                    label.append(labelText);

                    items.forEach((item) => {
                        const listItem = func.createEl('li','url-list-item'),
                              repoLink = func.createEl('a','url-list-repo-link'),
                              pageLink = func.createEl('a','url-list-page-link');

                        repoLink.href = item.repolink;
                        repoLink.setAttribute('data-tooltip-text', `See version from commit ${item.checksum.slice(0,7)}`);
                        pageLink.textContent = item.title;
                        pageLink.href = item.permalink;
                        listItem.append(
                            repoLink,
                            pageLink
                        );
                        urlList.append(listItem);
                    });

                    mainItem.append(label,urlList);
                    outerList.append(mainItem);
                }

                buttonUp.addEventListener('click', () => {
                    scrollToListItems(scrollableCont, outerList, false);
                });

                buttonDown.addEventListener('click', () => {
                    scrollToListItems(scrollableCont, outerList, true);
                });

                revealWidget(widget);
            });
        });
}

function revealWidget(widget) {
    widget.removeAttribute('data-meta-description');
    widget.classList.remove('hidden');
}

function easeInOutExpo(t) {
    if (t === 0) return 0
    if (t === 1) return 1
    return t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2
}

// Normalize smooth scrolling duration and behavior for Chromium and Firefox
function smoothScroll(container, target, duration = 100) {
    const startPos = container.scrollTop,
          deltaPos = target - startPos,
          startTime = performance.now();

    return new Promise(resolve => {
        function step(curTime) {
            const elapsed = curTime - startTime,
                  curVal = Math.min(1, elapsed / duration);
            container.scrollTop = startPos + deltaPos * easeInOutExpo(curVal);
            if (curVal < 1) {
                requestAnimationFrame(step);
            } else {
                resolve();
            }
        }
        requestAnimationFrame(step);
    });
}

function scrollToListItems(container, list, forward) {
    const items = Array.from(list.children),
              contTop = container.scrollTop,
              contBottom = contTop + container.clientHeight,
              contViewportMid = container.clientHeight / 2,
              maxScroll = Math.max(0, list.scrollHeight - container.clientHeight),
              firstTopOffset = items[0].offsetTop, // the offset of the first list item so each nav stays at same consistent level (where possible)
              tolerance = 20,// pixels
              activeClass = 'snapped';

    const firstVisible = items.findIndex((item) => {
        const itemTop = item.offsetTop,
              itemBottom = itemTop + item.offsetHeight;
        return itemBottom > contTop + tolerance;
    });

    // Check which one currently has the active class, otherwise use the first visible one
    const activeIndex = items.findIndex(i => i.classList.contains(activeClass));
    let curIndex = activeIndex !== -1 ? activeIndex : (firstVisible === -1 ? items.length - 1 : firstVisible);
    const curItem = items[curIndex],
          curItemTop = curItem.offsetTop,
          curItemBottom = curItemTop + curItem.offsetHeight,
          curItemOverflows = curItemBottom > contBottom + tolerance;

    // If reversing and scroll already at bottom then jump to the nearest prior item that's currently out of the container view (so that even if the item with the current active class is at the bottom going in reverse doesn't require multiple calls to progress the scroll upward again).
    if (!forward && contTop >= maxScroll - tolerance) {
        const topVisibleIndex = firstVisible === -1 ? items.length - 1 : firstVisible;
        if (topVisibleIndex > 0) {
            const jumpIndex = topVisibleIndex - 1;
            items.forEach((item, i) => item.classList.toggle(activeClass, i === jumpIndex));
            const targetTop = func.clamp(maxScroll, 0, items[jumpIndex].offsetTop);
            if (Math.abs(targetTop - contTop) < tolerance) return Promise.resolve()
            return smoothScroll(container, targetTop - firstTopOffset)
        }
    }

    // If forward and the currently active item's bottom is within frame and the very next item is already partially visible then treat next item as the new target
    if (activeIndex !== -1) {
        if (forward) {
            const nextIndexProbe = Math.min(items.length - 1, curIndex + 1);
            if (nextIndexProbe > curIndex) {
                const nextItem = items[nextIndexProbe],
                      nextTop = nextItem.offsetTop,
                      nextBottom = nextTop + nextItem.offsetHeight,
                      curItemBottomInView = curItemBottom <= contBottom + tolerance && curItemBottom >= contTop - tolerance,
                      nextPartlyVisible = nextBottom > contTop + tolerance && nextTop < contBottom - tolerance;

                if (curItemBottomInView && nextPartlyVisible) {
                    items.forEach((item, i) => item.classList.toggle(activeClass, i === nextIndexProbe));
                    const targetTop = func.clamp(maxScroll, 0, items[nextIndexProbe].offsetTop);
                    if (Math.abs(targetTop - contTop) < tolerance) return Promise.resolve()
                    return smoothScroll(container, targetTop - firstTopOffset)
                }
            }
        } else {
            const prevIndexProbe = Math.max(0, curIndex - 1);
            if (prevIndexProbe < curIndex) {
                const prevItem = items[prevIndexProbe],
                      prevTop = prevItem.offsetTop,
                      prevBottom = prevTop + prevItem.offsetHeight,
                      prevPartlyVisible = prevBottom > contTop + tolerance && prevTop < contBottom - tolerance;

                // Also if it's scrolled to the top use instead the top-most visible item
                if (prevPartlyVisible || contTop <= tolerance) {
                    const topVisibleIndex = contTop <= tolerance ? (firstVisible === -1 ? 0 : firstVisible) : prevIndexProbe;
                    items.forEach((item, i) => item.classList.toggle(activeClass, i === topVisibleIndex));
                    const targetTop = func.clamp(maxScroll, 0, items[topVisibleIndex].offsetTop);
                    if (Math.abs(targetTop - contTop) < tolerance) return Promise.resolve()
                    return smoothScroll(container, targetTop - firstTopOffset)
                }
            }
        }
    }

    // If going in reverse then prioritize jumping to prior item if it's off-screen and current item is overflowed rather than letting the subsequent blind half-height scroll condition trigger which can sometimes overshoot the prior item (which then causes a jarring re-align on next reverse)
    if (!forward && curItemOverflows && activeIndex !== -1 && curIndex > 0) {
        const prevIndex = curIndex - 1,
              prevItem = items[prevIndex],
              prevBottom = prevItem.offsetTop + prevItem.offsetHeight;

        if (prevBottom <= contTop + tolerance || prevBottom <= contTop + contViewportMid) {
            items.forEach((item, i) => item.classList.toggle(activeClass, i === prevIndex));
            const targetTop = func.clamp(maxScroll, 0, prevItem.offsetTop);
            if (Math.abs(targetTop - contTop) < tolerance) return Promise.resolve()
            return smoothScroll(container, targetTop - firstTopOffset)
        }
    }

    // If current item's child content overflows then scroll by half the container height to avoid skipping item content
    if (curItemOverflows) {
        let newScrollPos;
        if (forward) {
            newScrollPos = Math.min(maxScroll, contTop + contViewportMid);
        } else {
            newScrollPos = Math.max(0, contTop - contViewportMid);
        }
        if (Math.abs(newScrollPos - contTop) < tolerance) return Promise.resolve()
        return smoothScroll(container, newScrollPos - firstTopOffset)
    }

    // Set next/prev target
    const targetIndex = forward ? Math.min(items.length - 1, curIndex + 1) : Math.max(0, curIndex - 1);
    items.forEach((item, i) => {
        item.classList.toggle(activeClass, i === targetIndex);
    });

    if (forward && contTop >= maxScroll - tolerance) return Promise.resolve()  // if already at bottom return early

    const targetTop = func.clamp(maxScroll, 0, items[targetIndex].offsetTop);
    if (Math.abs(targetTop - contTop) < tolerance) return Promise.resolve()  // ditto for top

    return smoothScroll(container, targetTop - firstTopOffset)
}

function createShuffler({
    array = [],
    interval = 3000,
    delay = 0,
    onUpdate = () => {},
    onProgress = () => {},
    onPause = () => {},
    onResume = () => {}
} = {}) {
    let items = array.slice(),
        queue = [],
        nextQueue = [],
        curIndex = 0,
        indexForDelay = 0,
        lastIndexUsed = null;

    let state = 'stopped',
        phase = 'idle',
        phaseDuration = 0,
        startTime = 0,
        elapsed = 0,
        raf = null;

    buildQueue();

    function buildQueue() {
        queue = shuffle(items, lastIndexUsed);
        nextQueue = shuffle(items, (queue.length ? queue[queue.length - 1] : lastIndexUsed));
    }

    function shuffle(arr, prev = null) {
        const a = arr.slice(),
              n = a.length;
        for (let i = n - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        if (prev != null && a[0] === prev && n > 1) {
            const i = 1 + Math.floor(Math.random() * (n - 1));
            [a[0], a[i]] = [a[i], a[0]];
        }
        return a
    }

    function checkQueues(index) {
        if (index < queue.length) return index
        const wrapped = index - queue.length;
        lastIndexUsed = queue.length ? queue[queue.length - 1] : lastIndexUsed;
        queue = (nextQueue && nextQueue.length) ? nextQueue : shuffle(items, lastIndexUsed);
        nextQueue = shuffle(items, (queue.length ? queue[queue.length - 1] : lastIndexUsed));
        return wrapped
    }

    function runPhase(onComplete) {
        cancelAnimationFrame(raf);
        const loop = () => {
            if (state !== 'running') return
            const now = performance.now(),
                  elapsed = now - startTime,
                  frac = func.clamp(elapsed / (phaseDuration || 1), 0, 1);
            onProgress(frac, phase);
            if (elapsed >= phaseDuration) {
                onProgress(1, phase);
                raf = null;
                onComplete();
                return
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
    }

    function playProgress(index, duration = interval) {
        if (state !== 'running') return
        index = checkQueues(index);
        curIndex = index;
        indexForDelay = curIndex + 1;
        const item = queue[curIndex];
        onUpdate(item, curIndex);

        phase = 'progress';
        phaseDuration = Math.max(0, duration);
        startTime = performance.now();
        onProgress(0, 'progress');
        onProgress(0, 'delay'); // mostly so if manually advancing mid-delay any callback updates can occur so any styling isn't stale
        runPhase(() => {
            if (delay > 0) startDelay(indexForDelay, delay);
            else playProgress(curIndex + 1);
        });
    }

    function startDelay(nextIndex, duration = delay) {
        if (state !== 'running') return
        const next = (typeof nextIndex === 'number') ? nextIndex : indexForDelay;
        indexForDelay = next;

        phase = 'delay';
        phaseDuration = Math.max(0, duration);
        startTime = performance.now();

        onProgress(1, 'progress');

        runPhase(() => {
            lastIndexUsed = queue[curIndex];
            playProgress(next);
        });
    }

    function start() {
        if (state === 'running' || !items.length) return
        state = 'running';
        buildQueue();
        playProgress(0);
    }

    function pause() {
        if (state !== 'running') return
        state = 'paused';
        cancelAnimationFrame(raf);
        raf = null;
        const now = performance.now();
        elapsed = func.clamp(now - startTime, 0, phaseDuration);
        onPause();
    }

    function resume() {
        if (state !== 'paused') return
        state = 'running';
        const now = performance.now();
        startTime = now - (elapsed || 0);
        runPhase(() => {
            if (phase === 'progress') {
                if (delay > 0) startDelay(curIndex + 1, delay);
                else playProgress(curIndex + 1);
            } else if (phase === 'delay') {
                lastIndexUsed = queue[curIndex];
                playProgress(indexForDelay);
            }
        });
        onResume();
    }

    function stop() {
        state = 'stopped';
        cancelAnimationFrame(raf);
        raf = null;
        phase = 'idle';
        onProgress(0, 'idle');
    }

    function displayOnce(index) {
        index = checkQueues(index);
        curIndex = index;
        indexForDelay = curIndex + 1;
        const item = queue[curIndex];
        onUpdate(item, curIndex);
        phase = 'progress';
        phaseDuration = 0;
        onProgress(1, 'progress');
        onProgress(0, 'delay');
    }

    function next(continueTimer) {
        cancelAnimationFrame(raf);
        raf = null;
        if (continueTimer) {
            // Use to manually advance + un-pause and reset both progress and delay timers
            // The scenario is for eg. when you call pause() on mouseover for an element to pause the timer but want to advance an item and then have the progress reset and continue without preserving the pause state (since it's unexpected UX tbh).
            state = 'running';
            playProgress(curIndex + 1);
        } else {
            // Use to advance while in continually paused state (eg: fully manual advance/no timer displayed)
            state = 'paused';
            displayOnce(curIndex + 1);
        }
    }

    function getUpcomingItem() {
        if (!queue || !queue.length) return null
        const next = curIndex + 1;
        if (next < queue.length) return queue[next] || null
        return (nextQueue && nextQueue.length) ? nextQueue[0] : null
    }

    return {
        start,
        pause,
        resume,
        stop,
        next,
        getUpcomingItem
    }
}