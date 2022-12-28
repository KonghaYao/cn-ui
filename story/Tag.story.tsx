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
import { Animate } from '@cn-ui/animate';

export default (props) => {
    const data = atom(
        [...Array(20).keys()].map((i) => {
            return {
                name: 'tag ' + i,
                value: atom(true),

                color: COLORS[i % COLORS.length],
            };
        })
    );

    return (
        <>
            <div class="flex flex-wrap gap-2">
                <Animate group anime="zoom">
                    <For each={data()}>
                        {(item) => {
                            return (
                                <Tag
                                    color={item.color}
                                    onClose={() => {
                                        data((i) => {
                                            return i.filter((ii) => ii !== item);
                                        });
                                    }}
                                    {...props}
                                >
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
