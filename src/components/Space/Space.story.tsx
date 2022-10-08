import { Space } from './index';
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'wrap',
    },
    {
        type: 'switch',
        default: false,
        prop: 'vertical',
    },

    {
        type: 'select',
        default: 'mini',
        prop: 'size',
        options: ['mini', 'small', 'medium', 'large'].map((i) => ({
            value: i,
        })),
    },
];

import 'animate.css/source/fading_entrances/fadeInDown.css';
import 'animate.css/source/fading_exits/fadeOutUp.css';
import { createSignal, For, onMount } from 'solid-js';
export default (props) => {
    const arr = (num) => [...Array(num).keys()];
    const [origin, setOrigin] = createSignal<number[]>([]);
    onMount(() => {
        // 一般而言，数据是从 remote 来的，所以渲染的时候是注入的
        setOrigin(arr(10));
    });
    return (
        <>
            <Space {...props}>
                {origin().map((i) => {
                    return <div style={{ width: '3rem', 'background-color': '#eee' }}>{i}</div>;
                })}
            </Space>

            <Space
                {...props}
                transition={{
                    enterActiveClass: 'animated fadeInDown',
                    exitActiveClass: 'animated fadeOutUp',
                }}
            >
                <For each={origin()}>
                    {(i) => {
                        return <div style={{ width: '3rem', 'background-color': '#eee' }}>{i}</div>;
                    }}
                </For>
            </Space>
        </>
    );
};
