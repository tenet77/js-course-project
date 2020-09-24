const toggleSwitch  = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

function imageMode(mode) {
    image1.src = './img/undraw_proud_coder_${mode}.svg'.replace('${mode}', mode);
    image2.src = './img/undraw_feeling_proud_${mode}.svg'.replace('${mode}', mode);
    image3.src = './img/undraw_conceptual_idea_${mode}.svg'.replace('${mode}', mode);
}

function toggleMode(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].innerHTML = isDark ? 'Dark Mode' : 'Light Mode';
    toggleIcon.children[1].className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    isDark ? imageMode('dark') : imageMode('light');
}

function switchTheme(event) {
    if (event.target.checked) {
        toggleMode(true);
    } else {
        toggleMode(false);
    }
}

// Add event listenner
toggleSwitch.addEventListener('change', switchTheme);