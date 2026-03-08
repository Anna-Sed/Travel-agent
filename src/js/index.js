// import mobileNav from './modules/mobile-nav.js';
// mobileNav();

import { easepick, TimePlugin } from '@easepick/bundle';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import getAutoComlete from './modules/autoComplete.js'

// Первый аргумент - селектор по которому мы находим элемент - обёртку, на который вешается свайпер
// Второй аргумент - объект с настройками
const swiper = new Swiper('.swiper', {
    // Configure swiper to use modules
    slidesPerView: 4,
    spaceBetween: 32,
    navigation: {
        prevEl: '#sliderPrev',
        nextEl: '#sliderNext',
    },
   
});

const picker = new easepick.create({
    element: document.getElementById('datePicket'),
    css: [
        'https://cdn.jsdelivr.net/npm/@easepick/core@1.2.1/dist/index.css',
        'https://cdn.jsdelivr.net/npm/@easepick/time-plugin@1.2.1/dist/index.css',
    ],
    format: 'HH:mm, DD/MM/YY',
    plugins: [TimePlugin],
});

getAutoComlete();
