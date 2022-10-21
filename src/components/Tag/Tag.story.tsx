import { For, onMount } from 'solid-js';
import { atom } from '@cn-ui/use';
import { Space, COLORS, Tag, Anime } from '@cn-ui/core';
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
    {
        type: 'select',
        default: 'default',
        prop: 'color',
        options: COLORS.map((i) => ({ value: i })),
    },
];

import 'animate.css/source/bouncing_entrances/bounceIn.css';
import 'animate.css/source/bouncing_exits/bounceOut.css';
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
export default (props) => {
    const data = [...Array(5).keys()].map((i) => {
        return {
            name: 'tag ' + i,
            value: atom(true),
            visible: atom(true),
            onClose: () => {
                return sleep(i * 100).then((res) => {
                    console.log('触发关闭', i * 100);
                });
            },
            color: COLORS[i % 10],
        };
    });
    // 想要获取 所有标签的打开值:
    //  data.map((i) => i.value());
    const Value = data[0].value;

    return (
        <>
            <button onclick={() => Value(!Value())}>受控标签: {Value() ? 'true' : 'false'}</button>
            <Tag>这是一个标签</Tag>
            <Space size="mini">
                <Anime group in="bounceIn" out="bounceOut">
                    {/*  必须使用 For 循环才能使用动画 */}
                    <For each={data}>
                        {(item) => {
                            return (
                                <Tag
                                    color={item.color}
                                    checked={item.value}
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
            </Space>
        </>
    );
};
