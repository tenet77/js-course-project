const modal = document.getElementById('modal');
const addBtn = document.getElementById('show-modal');
const closeBtn = document.getElementById('close-modal');
const websiteEl = document.getElementById('website-name');
const websiteurlEl = document.getElementById('website-url');
const bookmarkForm = document.getElementById('bookmark-form');
const bookmarkCont = document.getElementById('bookmarks-container');

let bookmarks = {};

function showModal() {
    modal.classList.toggle('show-modal');
    websiteEl.focus();
}

function validateForm(name, url) {
    const expression = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/;
    const regEx = new RegExp(expression);

    if (!name || !url) {
        alert('Fill both fields');
        return false;
    }

    if (!url.match(regEx)) {
        alert('Something wrong is URL');
        return false;
    }

    return true;
}

function closeForm() {
    modal.classList.remove('show-modal');
}

// Delete bookmark
function deleteBookmark(id) {
    if (bookmarks[id]) {
        delete bookmarks[id];
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// Build boolmarks
function buildBookmarks() {

    bookmarkCont.textContent = '';
    
    Object.keys(bookmarks).forEach((id) => {
        
        const {name, url} = bookmarks[id];
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Icon
        const icon = document.createElement('i');
        icon.id = 'delete-icon';
        icon.title = 'Delete bookmark';
        icon.setAttribute('onclick', 'deleteBookmark("${url}")'.replace('${url}', url));
        icon.classList.add('fas', 'fa-times');
        item.appendChild(icon);
        // Context
        const context = document.createElement('div');
        context.classList.add('name');
        // Icon
        const img = document.createElement('img');
        img.setAttribute('src', 'https://s2.googleusercontent.com/s2/favicons?domain=${url}'.replace('${url}', url));
        img.setAttribute('alt', 'Favicon');
        context.appendChild(img);
        // a
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        context.appendChild(link);
        // add on form
        item.appendChild(context);
        bookmarkCont.appendChild(item);
    });

}

// Fetch bookmarks
function fetchBookmarks() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        let id = 'https://google.com';
        bookmarks[id] = {
            name: 'google',
            url: 'https://google.com',
        };
    };

    buildBookmarks();
}

function storeBookmark(e) {

    e.preventDefault();
    const name = websiteEl.value;
    let url = websiteurlEl.value;
    if (!url.includes('http://', 'https://')) {
        url = 'https://${url}'.replace('${url}', url);
    }

    if (!validateForm(name, url)) {
        return false;
    }

    const bookmark = {
        name: name,
        url: url,
    };

    bookmarks[url] = bookmark;

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();

    bookmarkForm.reset();
    websiteEl.focus();

}

addBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', closeForm);
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal'): false));

// Event Listener

bookmarkForm.addEventListener('submit', storeBookmark);

// On Load
fetchBookmarks();