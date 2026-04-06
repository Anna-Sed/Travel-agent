const mobileNav = () => {
    // mobile nav button
    const navBtn = document.querySelector('.mobile-nav-btn');
    const nav = document.querySelector('.mobile-nav');
    const menuIcon = document.querySelector('.nav-icon');

    navBtn.addEventListener('click', () => {
        // Переключаем класс для меню
        nav.classList.toggle('mobile-nav--open');
        // Переключаем класс для иконки (полоски ↔ крестик)
        menuIcon.classList.toggle('nav-icon--active'); // Превращает иконку в крестик
        // Блокируем прокрутку страницы при открытом меню
        document.body.classList.toggle('no-scroll')
    });
}

export default mobileNav;