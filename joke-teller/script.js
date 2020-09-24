const btn = document.getElementById('button');
const audioElement = document.getElementById('audio');
const apiJokeUrl = 'https://sv443.net/jokeapi/v2/joke/Any';

function toggleButton () {
    btn.disabled = !btn.disabled;
}

function speech(jokeText) {

    VoiceRSS.speech({
        key: '103b4e2d6adf49d99b76c798df76e2d4',
        src: jokeText,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJoke() {
    let jokeText = '';
    try {
        const response = await fetch(apiJokeUrl);
        const data = await response.json();
        if (data.type === 'single') {
            jokeText = data.joke;
        } else if (data.type === 'twopart') {
            jokeText = data.setup + ' ' + data.delivery;
        }
        speech(jokeText);
        toggleButton();
    } catch (err) {
        console.log('fetch error: ', err);
    }
}

btn.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);