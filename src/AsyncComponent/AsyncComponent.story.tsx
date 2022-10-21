import { Anime, AsyncComponent, AsyncOutlet, Button, InputNumber, Space } from '@cn-ui/core';
import { atom } from '@cn-ui/use';
import 'animate.css';
import { Show } from 'solid-js';
import { sleep } from '../mocks/sleep';
export const Controller = [];
export default () => {
    const a = atom(false);
    return (
        <>
            <AsyncComponent load={() => sleep(1000, import('../components/Button/Button.story'))}>
                <Anime in="fadeInDown" out="fadeOutUp" appear>
                    <AsyncOutlet></AsyncOutlet>
                </Anime>
            </AsyncComponent>
            <Button
                onClick={() => {
                    a((i) => !i);
                }}
            >
                刷新
            </Button>
        </>
    );
};
