export const Controller = [];

import { atom } from '@cn-ui/use';
import { Image, LazyLoad, WaterFall } from '@cn-ui/core';
import { photos } from './mocks/photos';
import 'animate.css';

export default (props) => {
    const items = atom(photos);
    return (
        <WaterFall items={items} column={2}>
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
