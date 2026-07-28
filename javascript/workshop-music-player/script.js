const playlistSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');

const songs = document.querySelectorAll('.playlist-song');

const playingSong = document.getElementById('player-song-title');
const songArtist = document.getElementById('player-song-artist');

const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3"
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3"
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3"
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
    },
    {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
    },
    {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
    },
    {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
    },
    {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
    },
    {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
    }
];

const audio = new Audio();

const userData = {
    songs: allSongs,
    currentSong: null,
    songCurrentTime: 0
};

function playSong(songId, start = true) {
    const song = userData.songs.find(song => song.id === songId);

    if (song) {
        audio.src = song.src;
        audio.title = song.title;
    }

    if (!userData.currentSong || start) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData.songCurrentTime;
    }

    playButton.classList.add('playing');
    userData.currentSong = song;
    audio.play();

    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();

    console.log(song.title);

};

function pauseSong() {
    audio.pause();
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove('playing');
}

function getCurrentSongIndex() {
    if (!userData.currentSong) {
        return -1;
    }

    return userData.songs.findIndex(song => song.id === userData.currentSong.id);
}

function getNextSong() {
    const lastSongIndex = userData.songs.length - 1;

    if (userData.currentSong && userData.currentSong.id === lastSongIndex) {
        return undefined;
    }

    return userData.songs[getCurrentSongIndex() + 1];
}

function getPreviousSong() {
    const firstSongIndex = userData.songs[0];

    if (userData.currentSong && userData.currentSong.id === firstSongIndex) {
        return undefined;
    }

    return userData.songs[getCurrentSongIndex() - 1];
}


function playNextSong() {
    if (userData.currentSong === null) {
        playSong(userData.songs[0].id);
        return;
    }

    const nextSong = getNextSong();

    if (!nextSong) {
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        setPlayerDisplay();
        highlightCurrentSong();
        setPlayButtonAccessibleText();
        pauseSong();
        return;
    }

    playSong(nextSong.id);
}

function playPreviousSong() {
    if (userData.currentSong === null) {
        return;
    }

    const prevSong = getPreviousSong();

    if (!prevSong) {
        playSong(userData.songs[0].id);
        return;
    }

    playSong(prevSong.id);
}

function highlightCurrentSong() {
    const previousCurrentSong = document.querySelector('.playlist-song[aria-current="true"]');
    previousCurrentSong?.removeAttribute("aria-current");

    const songToHighlight = document.getElementById(`song-${userData.currentSong?.id}`);

    if (songToHighlight) {
        songToHighlight.setAttribute("aria-current", "true");
    } 
}

function setPlayerDisplay() {
    playingSong.textContent = userData.currentSong?.title || "";
    songArtist.textContent = userData.currentSong?.artist || "";
}

function setPlayButtonAccessibleText() {
    const accessibleText = userData.currentSong ? `Play ${userData.currentSong.title}` : "Play";
    playButton.setAttribute("aria-label", accessibleText);
}

songs.forEach(song => {
    const id = song.getAttribute("id").slice(5);
    const songBtn = song.querySelector("button");
    songBtn.addEventListener("click", () => {
        playSong(Number(id));
    })
});

playButton.addEventListener('click', () => {
    if (!userData.currentSong) {
        playSong(userData.songs[0].id);
    } else {
        playSong(userData.currentSong.id, false);
    }
});

pauseButton.addEventListener('click', pauseSong);

nextButton.addEventListener('click', playNextSong);

previousButton.addEventListener('click', playPreviousSong);

audio.addEventListener('ended', playNextSong);