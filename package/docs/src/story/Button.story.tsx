import { createSignal } from 'solid-js';
import {
    Button,
    Gradient,
    SizeTrans,
    sleep,
    PureButton,
    GradientButton,
    ColorButton,
} from '@cn-ui/core';
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
export default (props: any) => {
    const [type, setType] = createSignal<'red' | 'green'>('red');
    const onClick = () => console.log('点击成功');
    console.log('刷新组件');
    return (
        <>
            <div class="flex  items-start gap-2 p-2">
                <PureButton size="sm">纯粹按钮</PureButton>
                <PureButton>纯粹按钮</PureButton>
                <PureButton size="lg">纯粹按钮</PureButton>
                <PureButton size="xl">纯粹按钮</PureButton>
            </div>
            <div class="flex  items-start gap-2 p-2">
                <GradientButton color="blue" size="sm">
                    渐变按钮
                </GradientButton>
                <GradientButton color="amber">渐变按钮</GradientButton>
                <GradientButton color="emerald" size="lg">
                    渐变按钮
                </GradientButton>
                <GradientButton color="rose" size="xl">
                    渐变按钮
                </GradientButton>
            </div>
            <div class="flex  items-start gap-2 p-2">
                <ColorButton onclick={onClick} color="indigo" size="sm">
                    颜色按钮
                </ColorButton>
                <ColorButton onclick={onClick} color="orange">
                    颜色按钮
                </ColorButton>
                <ColorButton onClick={onClick} color="emerald" size="lg">
                    颜色按钮
                </ColorButton>
                <ColorButton onClick={onClick} color="rose" size="xl">
                    颜色按钮
                </ColorButton>
            </div>
            <div class="flex  items-start gap-2 p-2">
                <ColorButton onclick={onClick} disabled color="indigo" size="sm">
                    失活组件
                </ColorButton>
                <ColorButton onclick={onClick} disabled color="orange">
                    失活组件
                </ColorButton>
                <ColorButton onClick={onClick} disabled color="emerald" size="lg">
                    失活组件
                </ColorButton>
                <ColorButton onClick={onClick} disabled color="rose" size="xl">
                    失活组件
                </ColorButton>
            </div>
        </>
    );
};
