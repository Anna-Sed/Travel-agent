import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function getSwiper () {
    // Первый аргумент - селектор по которому мы находим элемент - обёртку, на который вешается свайпер
    // Второй аргумент - объект с настройками
    const swiper = new Swiper('#testimonials-col-1', {
        // Configure swiper to use modules
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 32,
        grabCursor: true, // Меняется курсор на руку, когда мы тянем скрол
        ally: false,
        freeMode: true, // Чтобы скролл тянулс в нужные нам стороны, когда мы тянем туда-обратно
        speed: 2000,
        loop: true,
        autoplay: {
            delay: 0.5, // Задержка между слайдами
            disableOnInteraction: false,
        }
    });

    const swiper2 = new Swiper('#testimonials-col-2', {
        // Configure swiper to use modules
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 32,
        grabCursor: true,
        ally: false,
        freeMode: true,
        speed: 2000,
        loop: true,
        autoplay: {
            delay: 0.5,
            disableOnInteraction: false,
        }
    });

    const swiper3 = new Swiper('#testimonials-col-3', {
        // Configure swiper to use modules
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 32,
        grabCursor: true,
        ally: false,
        freeMode: true,
        speed: 2000,
        loop: true,
        autoplay: {
            delay: 0.5,
            disableOnInteraction: false,
        }
    });
}


export default getSwiper;