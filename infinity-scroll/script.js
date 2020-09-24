// Elements from DOM
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];
let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let firstLoad = true;

// Unsplash api
let initialCount = 5;
const apiKey    = '65KkspMwChDgAG_RL-D5puXgc2bStUaWxFhelZzscMA';
const proxyUrl = '';
let apiUrl = 'https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}'
.replace('${apiKey}', apiKey)
.replace('${count}', initialCount);

// inital api
function updateApiUrl(picCount) {
    apiUrl = 'https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}'
    .replace('${apiKey}', apiKey)
    .replace('${count}', picCount);

    console.log(apiUrl);

}

// Image loaded img
function onImageLoaded() {
    imageLoaded++;
    if (imageLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helpel function for set attributes on DOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display photo
function displayPhoto() {
    totalImages = photoArray.length;
    imageLoaded = 0;
    photoArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener('load', onImageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);

    })
}


// Get Photo from Unsplash API
async function getPhotos () {
    try {
        const response = await fetch(proxyUrl + apiUrl);
        photoArray = await response.json();
        displayPhoto();
        if (firstLoad) {
            updateApiUrl(30);
            firstLoad = false;
        }
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && ready) {
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();