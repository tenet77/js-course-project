const player= document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currTime  = document.querySelector('.time-elapsed');
const durTime  = document.querySelector('.time-duration');
const fullscrenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');

// Play & Pause ----------------------------------- //

function showPlayIcon() {

    playBtn.classList.replace(`fa-pause`, `fa-play`);
    playBtn.setAttribute('title', `Play`);    
}

function showPauseIcon() {

    playBtn.classList.replace(`fa-play`, `fa-pause`);
    playBtn.setAttribute('title', `Pause`);    
}

function togglePlay() {
    if (video.paused) {
        video.play();
        showPauseIcon();
    } else {
        video.pause();
        showPlayIcon();
    }
}

// Progress Bar ---------------------------------- //

function displayTime(time) {
    const minute = Math.floor(time/60);
    let second = Math.floor(time % 60);

    let timeString = `${minute<10 ? `0${minute}` : `${minute}`}:${second<10 ? `0${second}` : `${second}`}`;

    return timeString; 
}

function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration * 100)}%`;
    currTime.textContent = `${displayTime(video.currentTime)} / `;
    durTime.textContent = displayTime(video.duration);
}

function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${(newTime * 100)}%`;
    video.currentTime = video.duration * newTime;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    if (volume < 0.1) {
        volume = 0;
    } 
    if (volume > 0.9) {
        volume = 1;
    }
    
    video.volume = volume;
    lastVolume = volume;

    showVolumeIcon();

}

function showVolumeIcon() {
   
    volumeIcon.classList = '';
    let volume = video.volume;

    if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-mute');
    } else if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }
    volumeBar.style.width = `${volume*100}%`;
}

function toggleMute() {
    if (video.volume === 0) {
        video.volume = lastVolume;
    } else {
        video.volume = 0;
    }
    showVolumeIcon();
}

// Change Playback Speed -------------------- //

function setSpeed(e) {
    video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

let fullscreen = false;

function openFullscreen() {
    if (player.requestFullscreen) {
        player.requestFullscreen();
    } else if (player.mozRequestFullScreen) { /* Firefox */
        player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) { /* IE/Edge */
        player.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

function toggleFullscreen() {
    !fullscreen ? openFullscreen() : closeFullscreen();
    fullscreen = !fullscreen;
}

// Event Listenner
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);

volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
showVolumeIcon();

speed.addEventListener('change', setSpeed);

fullscrenBtn.addEventListener('click', toggleFullscreen);