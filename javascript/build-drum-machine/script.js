const drumPads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');

drumPads.forEach(elm => {
    elm.addEventListener('click', (e) => {
        playAudio(e.currentTarget.innerText);
    });
});

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    const key = e.key.toUpperCase();
    
    playAudio(key)
});

function playAudio(id) {
    const audioClip = document.getElementById(id);
    const pad = audioClip.parentElement;

    display.innerText = pad.id;
    
    audioClip.play();
    pad.classList.add('playing');

    audioClip.addEventListener('ended', () => {
        pad.classList.remove('playing');
    })

}