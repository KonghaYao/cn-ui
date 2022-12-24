import { For } from 'solid-js';
import { atom } from '@cn-ui/use';
import { Tag, sleep } from '@cn-ui/core';
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

import '@cn-ui/animate/src/zoom.css';
import { Gradient } from '@cn-ui/core';
import { Animate } from '@cn-ui/animate/src';

export default (props) => {
    const data = atom(
        [...Array(20).keys()].map((i) => {
            return {
                name: 'tag ' + i,
                value: atom(true),
                onClose: () => {
                    return sleep(i * 100).then((res) => {
                        console.log('触发关闭', i * 100);
                        data((it) => {
                            it.splice(i, 1);
                            return [...it];
                        });
                    });
                },
                color: COLORS[i % COLORS.length],
            };
        })
    );

    return (
        <>
            <div class="flex flex-wrap gap-2">
                <Animate group anime="zoom">
                    {/*  必须使用 For 循环才能使用动画 */}
                    <For each={data()}>
                        {(item) => {
                            return (
                                <Tag color={item.color} onClose={item.onClose} {...props}>
                                    {item.name}
                                </Tag>
                            );
                        }}
                    </For>
                </Animate>
            </div>
        </>
    );
};
