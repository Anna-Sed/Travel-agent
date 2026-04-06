import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function getSwiper () {
    // Первый аргумент - селектор по которому мы находим элемент - обёртку, на который вешается свайпер
    // Второй аргумент - объект с настройками
    const swiper = new Swiper('#swiper-destination', {
        // Configure swiper to use modules
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            prevEl: '#sliderPrev',
            nextEl: '#sliderNext',
        },
        breakpoints: {
            425: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 32,
            }
        }
    });
}


export default getSwiper;