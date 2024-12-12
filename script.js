console.log("Welcome to Spotify");

//initialize the variable 
let songIdex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let bar = document.getElementById('bar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let songs = [
    { songName: "song1", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    { songName: "song2", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songName: "song3", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songName: "song4", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songName: "song5", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
    { songName: "song6", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
    { songName: "song7", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
    { songName: "song8", filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
    { songName: "song9", filepath: "songs/9.mp3", coverpath: "covers/9.jpg" },
    { songName: "song10", filepath: "songs/10.mp3", coverpath: "covers/10.jpg" }
]

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        makeAllPlays();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
//Fetch song name for master play button
        masterSongName.innerText = songs[songIdex].songName;
    }
    else {
        makeAllPlays();
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    bar.value = progress;
})

bar.addEventListener('change', () => {
    audioElement.currentTime = bar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
//play song from list play icon
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIdex = parseInt(e.target.id)
           if(audioElement.paused || audioElement.currentTime <= 0){
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIdex + 1}.mp3`;
            masterSongName.innerText = songs[songIdex].songName;
            audioElement.currentTime = 0;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            
            audioElement.play();
            gif.style.opacity = 1;
        }
        else {
            makeAllPlays();
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
        
    })
})

//master next button
document.getElementById('next').addEventListener('click', () => {
    if (songIdex >= 9) {
        songIdex = 0
    }
    else {
        songIdex += 1;
    }
    audioElement.src = `songs/${songIdex + 1}.mp3`;
    masterSongName.innerText = songs[songIdex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIdex <= 0) {
        songIdex = 0
    }
    else {
        songIdex -= 1;
    }
    audioElement.src = `songs/${songIdex + 1}.mp3`;
    masterSongName.innerText = songs[songIdex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
