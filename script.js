
const songs = [
    {
    title: "Video Game",
    artist: "Cookiecat Music",
    src: "audio/video-game.mp3",
    cover: "audio/video-game.png"
    },
    {
    title: "Futuristic sci-fi",
    artist: "zec53",
    src: "audio/futuristic-sci-fi.mp3",
    cover: "audio/futuristic-sci-fi.jpg"
    },
    {
    title: "Stylish abstract digital",
    artist: "SoulProdMusic",
    src: "audio/stylish-abstract-digital.mp3",
    cover: "audio/stylish-abstract-digital.jpg"
    }
];

const player = document.getElementById("player");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressCircle = document.getElementById("progressCircle");

let songIndex = 0;
let isPlaying = false;

const radius = 120;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
}

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
    currentTimeEl.textContent = "0:00";
    totalTimeEl.textContent = "0:00";
    setProgress(0);
}

function playSong() {
    audio.play();
    isPlaying = true;
    player.classList.add("playing");
    playIcon.textContent = "pause";
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    player.classList.remove("playing");
    playIcon.textContent = "play_arrow";
}

function togglePlay() {
    if (isPlaying) {
    pauseSong();
    } else {
    playSong();
    }
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songIndex);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) songIndex = 0;
    loadSong(songIndex);
    playSong();
}

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(duration);

    if (!isNaN(duration) && duration > 0) {
    const progressPercent = (currentTime / duration) * 100;
    setProgress(progressPercent);
    }
});

audio.addEventListener("ended", nextSong);

loadSong(songIndex);