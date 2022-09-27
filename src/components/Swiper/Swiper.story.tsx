export const Controller = [];

// 使用包内部的导出，原项目有 Bug
import { Swiper, SwiperSlide } from './index';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Component, For, JSXElement } from 'solid-js';

import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/lazy';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, EffectFade, Lazy } from 'swiper';

export default () => {
    const DemoSlide: Component<{ children: JSXElement; index: number }> = (props) => {
        return (
            <SwiperSlide
                style={{
                    height: '150px',
                    color: 'white',
                    'background-color': `hwb(${(props.index * 360) / 10}deg  18% 28%)`,
                }}
            >
                {props.children}
            </SwiperSlide>
        );
    };
    // https://swiperjs.com/demos
    // 更多 Demo 请参照 swiper 官网
    return (
        <>
            <h3> Swiper 插件太强了，这里只是展示部分用法</h3>
            <Swiper
                //  声明需要使用的插件
                modules={[Navigation, Pagination, Scrollbar]}
                navigation={true}
                pagination={true}
                scrollbar={true}
                // 每一页之间的距离
                spaceBetween={0}
                // 可以看到的页数
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
            >
                <For each={[...Array(10).keys()]}>
                    {(count) => <DemoSlide index={count}>{count}</DemoSlide>}
                </For>
            </Swiper>

            <h3> 竖直操作</h3>
            <Swiper
                direction={'vertical'}
                loop
                // 每一页之间的距离
                spaceBetween={0}
                // 可以看到的页数
                slidesPerView={1}
                style={{
                    flex: '1',
                    height: '150px',
                }}
            >
                <For each={[...Array(10).keys()]}>
                    {(count) => <DemoSlide index={count}>{count}</DemoSlide>}
                </For>
            </Swiper>
            <h3> 特效 </h3>
            <Swiper
                modules={[EffectFade]}
                loop
                effect={'fade'}
                // 每一页之间的距离
                spaceBetween={0}
                // 可以看到的页数
                slidesPerView={1}
                style={{
                    flex: '1',
                    height: '150px',
                }}
            >
                <For each={[...Array(10).keys()]}>
                    {(count) => <DemoSlide index={count}>{count}</DemoSlide>}
                </For>
            </Swiper>

            <h3> 图片懒加载</h3>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                    height: '150px',
                }}
                lazy={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Lazy, Pagination, Navigation]}
            >
                <SwiperSlide>
                    <img
                        data-src="https://swiperjs.com/demos/images/nature-1.jpg"
                        class="swiper-lazy"
                    />
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        data-src="https://swiperjs.com/demos/images/nature-2.jpg"
                        class="swiper-lazy"
                    />
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        data-src="https://swiperjs.com/demos/images/nature-3.jpg"
                        class="swiper-lazy"
                    />
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};
