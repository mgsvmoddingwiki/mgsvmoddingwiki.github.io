// Add page width expansion toggle button
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

// Image handling
var img_list = document.querySelectorAll('.git-wiki-page img'); // returns NodeList
var img_array = [...img_list]; // converts NodeList to Array
img_array.forEach(img => {

    // Wrap images in links to image source
    // Check if image already wrapped in link element (to not override it)
    if (img.parentElement.tagName.toLowerCase() === 'a') {
        var wrapperExists = true;
        var wrapper = img.parentElement;
    } else {
        var wrapper = document.createElement('a');
        wrapper.setAttribute('href', img.getAttribute('src'));
    }

    wrapper.classList.add(...img.classList); // copy img classes to link instead
    wrapper.classList.add('image-wrapper');
    img.removeAttribute('class');
    if (!wrapperExists) {
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

// Video handling
var video_list = document.querySelectorAll('.git-wiki-page video');
var video_array = [...video_list];
video_array.forEach(video => {
    video.volume = 0.5; // set default volume to 50%
});

// Infobox: replace 'Site', 'Download' link names with names of hostname from URL
var iblink_list = document.querySelectorAll('.infobox a');
var iblink_array = [...iblink_list];
iblink_array.forEach(iblink => {
    // https://stackoverflow.com/a/8498629
    var matches = iblink.href.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];  // domain will be null if no match is found
    iblink.innerHTML = domain.replace('www.','');
});

// Handling for .index class lists
var listIndex_list = document.querySelectorAll('.git-wiki-page .index');
var listIndex_array = [...listIndex_list];
listIndex_array.forEach(listIndex => {
    // Add unique class if only has single first-level list item
    if (!listIndex.children[1]) {
        listIndex.classList.add('single-list');
    }
});