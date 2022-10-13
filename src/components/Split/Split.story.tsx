export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'vertical',
    },
];
import { Split } from '@cn-ui/split/src/index';
import { atom } from '@cn-ui/use';
import { For, onMount } from 'solid-js';
import { Button } from '../Button';
export default (props) => {
    const list = atom([...Array(2).keys()].map((i) => i));
    return (
        <>
            <span>
                <Button
                    onClick={() => {
                        list((i) => [...i, 1]);
                    }}
                >
                    Add Number
                </Button>
            </span>
            {(() => {
                onMount(() => {
                    console.log('渲染 out');
                });
                return <div></div>;
            })()}
            <Split
                class="h-1/2 w-full bg-slate-50 "
                {...props}
                minSize={0}
                // gutterSize={5}
                snapOffset={50}
                expandToMin={true}
            >
                <For each={list()}>
                    {(item) => {
                        return <span>{item}</span>;
                    }}
                </For>
            </Split>
        </>
    );
};
