const menuBtn = document.querySelector('.menu-btn');
const menuNav = document.querySelector('.header')
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuNav.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuNav.classList.remove('open');
        menuOpen = false;
    }
});