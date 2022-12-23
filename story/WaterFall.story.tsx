export const Controller = [];

import { atom } from '@cn-ui/use';
import { Image, LazyLoad, WaterFall } from '@cn-ui/core';
import { photos } from './mocks/photos';
import 'animate.css';
import { useBreakpoints } from '@cn-ui/use';
import { createMemo } from 'solid-js';

export default (props) => {
    const items = atom(photos);
    const { size } = useBreakpoints();
    const column = createMemo(() => {
        switch (size()) {
            case 'xs':
                return 2;
            case 'sm':
                return 3;
            case 'md':
                return 4;
        }
    });
    return (
        <WaterFall items={items} column={column}>
            {(item) => {
                return (
                    <LazyLoad
                        class="w-full"
                        style={{
                            'aspect-ratio': `${item.width}/${item.height}`,
                        }}
                        fallback={<div class="h-screen w-full">暂时不显示</div>}
                        loading={<div>加载中。。。</div>}
                        threshold={[0.3, 1]}
                        // Async Loading
                        load={async () => () => <Image src={item.src} />}
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
