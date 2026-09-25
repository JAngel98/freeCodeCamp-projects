const drumPads = document.querySelectorAll('.drum-pad');

drumPads.forEach(elm => {
    elm.addEventListener('click', (e) => {
        const pad = e.currentTarget;
        const audioClip = pad.querySelector(`#${pad.innerText}`);

        audioClip.play();
        console.log(audioClip);
    });
})

