import ScrollReveal from 'scrollreveal';

// Базовые настройки
ScrollReveal({
    distance: '60px',
    duration: 2800,
});

function getScrollReveal () {
    ScrollReveal().reveal('.header, .destinations__text', {
        origin: 'top', // Появляется сверху вниз
    });

    ScrollReveal().reveal('.discover__picture-hint, .discover__title', {
        origin: 'left',
    });


    ScrollReveal().reveal('.discover__picture-scroll, .discover__text, .destinations__buttons', {
        origin: 'right',
    });

    ScrollReveal().reveal('.discover__form, .discover__picture-img', {
        origin: 'bottom',
    });    
}

export default getScrollReveal;
