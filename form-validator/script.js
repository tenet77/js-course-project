const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

const RED_COLOR = 'red';
const GREEN_COLOR = 'green';

let isValid = false;
let passwordMatch = false;

function validateForm() {
    isValid = form.checkValidity();

    if (!isValid) {
        message.textContent = 'Please fill out all fields';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        return;
    } else {
        message.textContent = "Don't Hesistate!";
        message.style.color = 'black';
        messageContainer.style.borderColor = 'black';
    }

    if (password1El.value === password2El.value) {
        passwordMatch = true;
        password1El.style.borderColor = GREEN_COLOR;
        password2El.style.borderColor = GREEN_COLOR;
    } else {
        passwordMatch = false;
        message.textContent = "Make sure that password match";
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        password1El.style.borderColor = RED_COLOR;
        password2El.style.borderColor = RED_COLOR;
    }

    if (isValid && passwordMatch) {
        message.textContent = "Succesfully Register!";
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';
    }
}

function processFormData(e) {
    e.preventDefault();
    validateForm();
}


form.addEventListener('submit', processFormData);
