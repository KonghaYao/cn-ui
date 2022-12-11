export const Controller = [];
import { sleep } from '../../mocks/sleep';
import 'animate.css';
import { LazyLoad } from './LazyLoad';
import { onCleanup, onMount } from 'solid-js';
import { createAC } from '@cn-ui/headless';

const AC = createAC({});
export default () => {
    const Comp = () => {
        onMount(() => console.log('可视了'));
        onCleanup(() => console.log('销毁可视操作'));
        return <div class="h-screen bg-blue-500"></div>;
    };
    return (
        <section class="h-screen overflow-auto">
            <section class="h-screen w-full bg-gray-100"></section>
            <section class="h-screen w-full bg-gray-100"></section>

            <LazyLoad
                class="h-screen"
                fallback={<div class="h-screen w-full">不可视状态</div>}
                loading={<div>加载中</div>}
                threshold={[0.3, 1]}
                // Async Loading
                load={() => sleep(1000, Promise.resolve(Comp))}
                // combine Anime Component
                anime={{
                    in: 'fadeInLeft',
                    out: 'fadeOutRight',
                }}
            ></LazyLoad>
            <section class="h-screen w-full bg-gray-100"></section>
            <section class="h-screen w-full bg-gray-100"></section>
        </section>
    );
};
