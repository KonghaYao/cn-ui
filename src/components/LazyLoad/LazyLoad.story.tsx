import { Anime, AsyncComponent, AsyncOutlet, Button, InputNumber, Space } from '@cn-ui/core';
export const Controller = [];
import { sleep } from '../../mocks/sleep';
import 'animate.css';
import { LazyLoad } from './LazyLoad';
import { onCleanup, onMount } from 'solid-js';
import { memoize } from 'lodash-es';
export default () => {
    const Comp = () => {
        onMount(() => console.log('可视了'));
        onCleanup(() => console.log('销毁可视操作'));
        return <div class="h-full bg-blue-500"></div>;
    };
    return (
        <section class="h-screen overflow-auto">
            <section class="h-screen w-full bg-gray-100"></section>
            <section class="h-screen w-full bg-gray-100"></section>

            <LazyLoad
                class="h-screen"
                fallback={<div class="h-screen w-full">不可视状态</div>}
                threshold={[0.3, 1.7]}
                // Async Loading
                load={() => sleep(1000, Promise.resolve({ default: Comp }))}
                loading={<div>加载中</div>}
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
