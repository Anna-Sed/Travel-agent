import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const settingsVertical = {
    // Configure swiper to use modules
    direction: 'vertical',
    slidesPerView: 'auto',
    spaceBetween: 0,
    grabCursor: true, // Меняется курсор на руку, когда мы тянем скрол
    ally: false,
    freeMode: true, // Чтобы скролл тянулс в нужные нам стороны, когда мы тянем туда-обратно
    speed: 4000,
    loop: true,
    autoplay: {
        delay: 0.5, // Задержка между слайдами
        disableOnInteraction: false,
    }
}

const settingsHorizontal = {
    // Configure swiper to use modules
    direction: 'horizontal',
    // slidesPerView: 1,
    slidesPerView: 'auto',
    spaceBetween: 32,
    grabCursor: true, // Меняется курсор на руку, когда мы тянем скрол
    ally: false,
    freeMode: true, // Чтобы скролл тянулс в нужные нам стороны, когда мы тянем туда-обратно
    speed: 5000,
    loop: true,
    autoplay: {
        delay: 0.5, // Задержка между слайдами
        disableOnInteraction: false,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 32,
        }
    }
}

let swiper1, swiper2, swiper3, swiperHorizontal;

//Устанавливаем брейкпоинт
const breakpoint = window.matchMedia('(max-width:1023px)');

//Ф-ция которая проверяет срабатывание медиазапроса в breakpoint
const breakpointChecker = function () {
    //Если условия которые прописаны в const breakpoint = window.matchMedia('(max-width:1023px)'); соответствуют
    if (breakpoint.matches === true) {
        //то выполняется вот этот код

        // Первый аргумент - селектор по которому мы находим элемент - обёртку, на который вешается свайпер
        // Второй аргумент - объект с настройками
        if (swiper1 !== undefined) swiper1.destroy(true, true);
        if (swiper2 !== undefined) swiper2.destroy(true, true);
        if (swiper3 !== undefined) swiper3.destroy(true, true);
        swiperHorizontal = new Swiper('#testimonials-horizontal-swiper', settingsHorizontal);
        return;
    } else if (breakpoint.matches === false) {
        swiper1 = new Swiper('#testimonials-col-1', settingsVertical);
        swiper2 = new Swiper('#testimonials-col-2', settingsVertical);
        swiper3 = new Swiper('#testimonials-col-3', settingsVertical);
        if (swiperHorizontal !== undefined) swiperHorizontal.destroy(true, true);
        return;
    }        
};

breakpoint.addListener(breakpointChecker);
// breakpointChecker();

export default breakpointChecker;