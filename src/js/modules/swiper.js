import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

function getSwiper () {
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
}


export default getSwiper;