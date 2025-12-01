const mobileNav = () => {
    // mobile nav button
    const navBtn = document.querySelector('.mobile-nav-btn');
    const nav = document.querySelector('.mobile-nav');
    const menuIcon = document.querySelector('.nav-icon');

    navBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-nav--open');
        menuIcon.classList.toggle('nav-icon--active'); // Превращает иконку в крестик
        document.body.classList.toggle('no-scroll')
    });
}

export default mobileNav;