import { createSignal } from 'solid-js';
import { Button } from '@cn-ui/core';
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'disabled',
    },
    {
        type: 'switch',
        default: false,
        prop: 'iconOnly',
    },
    {
        type: 'switch',
        default: false,
        prop: 'loading',
    },
    {
        type: 'select',
        default: 'square',
        prop: 'shape',
        options: ['square', 'circle', 'round'].map((i) => ({ value: i })),
    },
    {
        type: 'select',
        default: 'default',
        prop: 'size',
        options: ['mini', 'small', 'default', 'large'].map((i) => ({ value: i })),
    },
    {
        type: 'select',
        default: 'primary',
        prop: 'type',
        options: ['primary', 'secondary', 'text', 'outline'].map((i) => ({
            value: i,
        })),
    },
    {
        type: 'select',
        default: 'default',
        prop: 'status',
        options: ['default', 'warning', 'danger', 'success'].map((i) => ({
            value: i,
        })),
    },
];
export default (props) => {
    const [type, setType] = createSignal<'success' | 'danger'>('success');
    const [loading, setLoading] = createSignal(false);
    console.log('刷新组件');
    return (
        <>
            <Button {...props}>按钮一个</Button>
            <br />
            <Button {...props} block>
                按钮一个
            </Button>
            <Button
                status={type()}
                loading={loading()}
                block
                onclick={() => {
                    setLoading((i) => {
                        setType(i ? 'success' : 'danger');
                        return !i;
                    });
                }}
            >
                按钮一个
            </Button>
        </>
    );
};
