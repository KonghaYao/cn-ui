export const Controller = [];
// Import Swiper SolidJS components
import { Swiper } from 'swiper/solid';
import { SwiperSlide } from 'swiper/solid';

// Import Swiper styles
import 'swiper/css';

export default () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            ...
        </Swiper>
    );
};
