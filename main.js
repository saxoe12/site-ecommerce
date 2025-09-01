const openNav = document.querySelector('.icon1');
const fermerNav = document.querySelector('.fermer');
const menu = document.querySelector('.menu');


const positionMenu = menu.getBoundingClientRect().left;

openNav.addEventListener('click', () => {
    if (positionMenu < 0) {
        menu.classList.add('monter');
    }
});
fermerNav.addEventListener('click', () => {
    if (positionMenu < 0) {
        menu.classList.remove('monter');
    }
});