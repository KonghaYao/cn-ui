import { For } from 'solid-js';
import { ArrayAtom, atom } from '@cn-ui/use';
import { Colors, Tag } from '@cn-ui/core';
import '@cn-ui/animate/src/zoom.css';
import { Animate } from '@cn-ui/animate';

const COLORS = Object.keys(Colors);
export default () => {
    const data = ArrayAtom(
        [...Array(20).keys()].map((i) => {
            return {
                name: 'tag ' + i,
                value: atom(true),

                color: COLORS[i % COLORS.length] as keyof typeof Colors,
            };
        })
    );

    return (
        <>
            <div class="flex flex-wrap gap-2">
                <Animate group anime="zoom">
                    <For each={data()}>
                        {(item) => {
                            return <Tag color={item.color}>{item.name}</Tag>;
                        }}
                    </For>
                </Animate>
                <Animate group anime="zoom">
                    <For each={data()}>
                        {(item) => {
                            return (
                                <Tag color={item.color} size="lg" gradient>
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
