const videoElement = document.getElementById('video');
const btnElement = document.getElementById('button');

async function selectMediaStrem () {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadeddata = () => {
            videoElement.play();
        }
    } catch (error) {
        console.log('whops, error here: ', error);
    }
}

btnElement.addEventListener('click', async () => {
    btnElement.disabled = true;
    await videoElement.requestPictureInPicture();
    btnElement.disabled = false
});

// on load
selectMediaStrem();