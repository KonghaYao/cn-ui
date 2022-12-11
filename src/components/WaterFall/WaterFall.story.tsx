export const Controller = [];

import { atom, classNames } from '@cn-ui/use';
import { Image, LazyLoad, WaterFall } from '@cn-ui/core';
import { photos } from './photos';
import 'animate.css';
import { Component, JSX } from 'solid-js';

export default (props) => {
    const items = atom(photos);
    return (
        <WaterFall items={items} column={2}>
            {(item) => {
                return (
                    <LazyLoad
                        class="w-full"
                        fallback={<div class="h-screen w-full">不可视状态</div>}
                        threshold={[0.3, 1]}
                        // Async Loading
                        load={async () => ({ default: () => <Image src={item.src} /> })}
                        loading={<div>加载中</div>}
                        // combine Anime Component
                        anime={{
                            in: 'fadeInLeft',
                            out: 'fadeOutRight',
                        }}
                        once
                    ></LazyLoad>
                );
            }}
        </WaterFall>
    );
};
