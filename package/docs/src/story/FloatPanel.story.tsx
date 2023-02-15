import { atom } from '@cn-ui/use';
import { Button, FloatPanel, FloatPanelWithAnimate } from '@cn-ui/core';
import { Animate } from '@cn-ui/animate';
export const Controller = [];
import '@cn-ui/animate/src/scale.css';
import '@cn-ui/animate/src/base.css';
export default (props) => {
    const visible = atom(true);
    const disabled = atom(false);
    const inner = () => (
        <div class="m-2 h-full w-60 rounded-md ring-2 ring-slate-300 ">
            这是显示面板<br></br>
            还有一行
        </div>
    );
    const popup = ({ show, transformOrigin, TailwindOriginClass }) => (
        // 可以外扩一层 Animate 控制显示动画
        <Animate
            trigger={show}
            anime="scale"
            // 如果需要设定动画方向的话，可以这样使用
            extraClass={'animate-duration-300 ' + TailwindOriginClass}
        >
            {/* 可以通过 margin 来改变与触发点的距离 */}
            {inner()}
        </Animate>
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
