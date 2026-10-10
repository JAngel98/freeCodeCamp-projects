const drumPads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');

drumPads.forEach(elm => {
    elm.addEventListener('click', (e) => {
        const pad = e.currentTarget;
        const audioClip = pad.querySelector(`#${pad.innerText}`);

        display.innerText = elm.id;
        audioClip.play();
        elm.classList.add('playing');

        audioClip.addEventListener('ended', () => {
            elm.classList.remove('playing');
        })
    });
});