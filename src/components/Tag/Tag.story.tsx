import { For, onMount } from 'solid-js';
import { atom } from '@cn-ui/use';
import { Space, Tag, Collapse } from '@cn-ui/core';
import { Anime } from '@cn-ui/transition';
const COLORS = Object.keys(Gradient);
export const Controller = [
    {
        type: 'switch',
        default: true,
        prop: 'closable',
    },
    {
        type: 'switch',
        default: false,
        prop: 'bordered',
    },
];

import 'animate.css/source/bouncing_entrances/bounceIn.css';
import 'animate.css/source/bouncing_exits/bounceOut.css';
import { Gradient } from '../_util/design';
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
export default (props) => {
    const data = [...Array(20).keys()].map((i) => {
        return {
            name: 'tag ' + i,
            value: atom(true),
            visible: atom(true),
            onClose: () => {
                return sleep(i * 100).then((res) => {
                    console.log('触发关闭', i * 100);
                });
            },
            color: COLORS[i % COLORS.length],
        };
    });
    console.log(data);
    // 想要获取 所有标签的打开值:
    //  data.map((i) => i.value());
    const Value = data[0].visible;

    return (
        <>
            <button onclick={() => Value(!Value())}>受控标签: {Value() ? 'true' : 'false'}</button>
            <Tag>这是一个标签</Tag>
            <div class="flex flex-wrap gap-2">
                <Anime group in="bounceIn" out="bounceOut">
                    {/*  必须使用 For 循环才能使用动画 */}
                    <For each={data}>
                        {(item) => {
                            return (
                                <Tag
                                    color={item.color}
                                    visible={item.visible}
                                    onClose={item.onClose}
                                    {...props}
                                >
                                    {item.name}
                                </Tag>
                            );
                        }}
                    </For>
                </Anime>
            </div>
        </>
    );
};
