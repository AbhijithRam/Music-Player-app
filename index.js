const image=document.getElementById('cover'),
title=document.getElementById('music-title'),
artist=document.getElementById('music-artist'),
currentTimeEl=document.getElementById('current-time'),
durationEl=document.getElementById('duration'),
progress=document.getElementById('progress'),
playerProgress=document.getElementById('player-progress'),
prevBtn=document.getElementById('prev'),
nextBtn=document.getElementById('next'),
playBtn=document.getElementById('play'),
background=document.getElementById('bg-img');

const volumeUpButton = document.getElementById('volumeUp');
const volumeDownButton = document.getElementById('volumeDown');
const volumeBar = document.querySelector('.volume-bar');

const music=new Audio();

const songs=[
    {

        path:'assets/songs/Despacito-Luis Fonsi.mp3',
        displayName:'Despacito',
        artist:'Luis Fonsi',
        cover:'assets/despacito_cover.jpg',
    },
    {

        path:'assets/songs/Heavy-Linkin Park.mp3',
        displayName:'Heavy',
        artist:'Linkin Park',
        cover:'assets/heavy_cover.jpg',
    },

    {

        path:'assets/songs/Shape of You-Ed Sheeran.mp3',
        displayName:'Shape of you',
        artist:'Ed Sheeran',
        cover:'assets/shapeofyou_cover.jpeg',
    },



];

// const audio = document.getElementById('songs');

let musicIndex=0;
let isPlaying=false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }
    else{
        playMusic();
    }
}

function playMusic(){
    isPlaying=true;
    playBtn.classList.replace('fa-circle-play','fa-circle-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseMusic(){
    isPlaying=false;
    playBtn.classList.replace('fa-circle-pause','fa-circle-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

function loadMusic(song){
    music.src=song.path;
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    image.src=song.cover;
    background.src=song.cover;
}

function changeMusic(direction){
    musicIndex=(musicIndex+direction+songs.length)%songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration,currentTime}=music;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width= `${progressPercent}%`;
    
    const formatTime=(time)=>String(Math.floor(time)).
    padStart(2,'0');
    durationEl.textContent=`${formatTime(duration/60)}:${formatTime(duration%60)}`;
    currentTimeEl.textContent=`${formatTime(currentTime/60)}:${formatTime(currentTime%60)}`;
    }      
    function setProgressBar(e){
        const width=playerProgress.clientWidth;
        const clickX=e.offsetX;
        music.currentTime=(clickX/width)*music.duration;
    }
    playBtn.addEventListener('click',togglePlay);
    prevBtn.addEventListener('click',()=>changeMusic(-1));
    nextBtn.addEventListener('click',()=>changeMusic(1));
    music.addEventListener('ended',()=>changeMusic(1));
    music.addEventListener('timeupdate', updateProgressBar);
    playerProgress.addEventListener('click',setProgressBar);

    loadMusic(songs[musicIndex]);
 
    volumeUpButton.addEventListener('click', () => {
        if (music.volume < 1) {
          music.volume += 0.1;
          updateVolumeBar();
        }
      });
      
      volumeDownButton.addEventListener('click', () => {
        if (music.volume > 0) {
          music.volume -= 0.1;
          updateVolumeBar();
        }
      });
      function updateVolumeBar() {
        volumeBar.style.width = `${volume * 100}%`;
      }












