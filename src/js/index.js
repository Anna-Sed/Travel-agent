import mobileNav from './modules/mobile-nav.js';
mobileNav();

import easepick from './modules/easepick.js';
import getAutoComlete from './modules/autoComplete.js';
// import scrollReveal from './modules/scrollReveal.js';
import swiperDirection from './modules/swiper-direction.js';
import swiperTestimonials from './modules/swiper-testimonials.js';
import getSubscribeFormData from './modules/form.js';

swiperDirection();
swiperTestimonials();

easepick();

getAutoComlete();

// Вызываем функцию после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    getSubscribeFormData();
});

// scrollReveal();
