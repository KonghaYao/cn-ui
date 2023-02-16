import { createSignal } from 'solid-js';
import { Button, Gradient, SizeTrans, sleep } from '@cn-ui/core';
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'disabled',
    },
    {
        type: 'switch',
        default: false,
        prop: 'round',
    },
    {
        type: 'switch',
        default: false,
        prop: 'square',
    },

    {
        type: 'switch',
        default: false,
        prop: 'text',
    },

    {
        type: 'select',
        default: 'normal',
        prop: 'size',
        options: Object.keys(SizeTrans).map((i) => ({ value: i })),
    },

    {
        type: 'select',
        default: 'blue',
        prop: 'color',
        options: Object.keys(Gradient).map((i) => ({
            value: i,
        })),
    },
];
export default (props:any) => {
    const [type, setType] = createSignal<'red' | 'green'>('red');

    console.log('刷新组件');
    return (
        <div class="flex items-center gap-2 p-2">
            <Button {...props}>按钮一个</Button>
            <Button {...props} block>
                按钮一个
            </Button>
            <Button
                color={type()}
                onClick={async () => {
                    return sleep(1000).then(() => {
                        setType((old) => {
                            return old === 'green' ? 'red' : 'green';
                        });
                    });
                }}
            >
                按钮一个
            </Button>
        </div>
    );
};