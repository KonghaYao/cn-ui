import { Atom, atom } from '@cn-ui/use';
import { Button, FloatPanel, FloatPanelWithAnimate } from '@cn-ui/core';
export const Controller = [];
import '@cn-ui/animate/src/scale.css';
import '@cn-ui/animate/src/base.css';
import { Show } from 'solid-js';
export default (props: any) => {
    const disabled = atom(false);
    const inner = () => (
        <div class="m-2 h-full w-60 rounded-md ring-2 ring-slate-300 ">
            这是显示面板<br></br>
            <input placeholder="这里应该锁定"></input>
            还有一行
        </div>
    );
    /** 无动画弹出 */
    const popup = ({ show }: { show: Atom<boolean> }) => (
        <Show when={show()}>
            {/* 可以通过 margin 来改变与触发点的距离 */}
            {inner()}
        </Show>
    );

    return (
        <div class="grid w-full scale-50 grid-cols-5 place-content-center gap-2 p-4">
            <div></div>
            <FloatPanelWithAnimate
                animateProps={{
                    anime: 'scale',
                }}
                disabled={disabled}
                position="tl"
                popup={inner}
            >
                <Button class="w-full">tl</Button>
            </FloatPanelWithAnimate>
            <FloatPanel disabled={disabled} position="t" popup={popup}>
                <Button class="w-full">t</Button>
            </FloatPanel>
            <FloatPanel disabled={disabled} position="tr" popup={popup}>
                <Button class="w-full">tr</Button>
            </FloatPanel>
            <div></div>

            <FloatPanel disabled={disabled} position="lt" popup={popup}>
                <Button class="w-full">lt</Button>
            </FloatPanel>
            <div></div>
            <div></div>
            <div></div>
            <FloatPanel disabled={disabled} position="rt" popup={popup}>
                <Button class="w-full">rt</Button>
            </FloatPanel>

            <FloatPanel disabled={disabled} position="l" popup={popup}>
                <Button class="w-full">l</Button>
            </FloatPanel>
            <div></div>
            <div></div>
            <div></div>
            <FloatPanel disabled={disabled} position="r" popup={popup}>
                <Button class="w-full">r</Button>
            </FloatPanel>

            <FloatPanel disabled={disabled} position="lb" popup={popup}>
                <Button class="w-full">lb</Button>
            </FloatPanel>
            <div></div>
            <div></div>
            <div></div>
            <FloatPanel disabled={disabled} position="rb" popup={popup}>
                <Button class="w-full">rb</Button>
            </FloatPanel>

            <div></div>
            <FloatPanel disabled={disabled} position="bl" popup={popup}>
                <Button class="w-full">bl</Button>
            </FloatPanel>
            <FloatPanel disabled={disabled} position="b" popup={popup}>
                <Button class="w-full">b</Button>
            </FloatPanel>
            <FloatPanel disabled={disabled} position="br" popup={popup}>
                <Button class="w-full">br</Button>
            </FloatPanel>
            <div></div>
        </div>
    );
};
