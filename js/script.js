const splash = document.querySelector('.splash');

document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
        splash.classList.add('display-none');
    }, 7000);
})

var typed = new Typed('.animate', {
    strings: [
        'Jasfer',
        'a Web Developer hired by ITE',
        'a student'
    ],
    typeSpeed: 50,
    backSpeed: 40,
    loop: false
})