import { Component, createMemo } from 'solid-js';
import { OutSpace } from '../GlobalConfigStore';
import { Position } from '../Mask';
import { classNames } from '@cn-ui/use';
import { Gradient } from '../_util';
import { Divider } from '../Divider';
import { createStore } from 'solid-js/store';
import { Animate } from '@cn-ui/animate/src/index';

// 最小化动画载入
import '@cn-ui/animate/src/slide.css';

export const [ModelManage, setModelM] = createStore({
    cb: (isConfirm: boolean) => {},
    comp: null,
});
const ModelLayer = () => {
    let dom: HTMLDivElement;
    const trigger = createMemo(() => ModelManage.comp);
    // console.log(ModelManage.comp);
    return (
        <Position
            full
            class=" flex select-none items-center justify-center  "
            ref={dom}
            classList={{
                'pointer-events-auto': ModelManage.comp,
                'pointer-events-none': !ModelManage.comp,
            }}
            onClick={(e) => {
                e.target === dom && ModelManage.cb(false);
            }}
        >
            <Animate anime="slide" trigger={trigger as any}>
                <ModelManage.comp></ModelManage.comp>
            </Animate>
        </Position>
    );
};

export const Confirm = async (message: string, description?: string) => {
    OutSpace.init();
    OutSpace.addLayerLikeSet(ModelLayer);
    return new Promise<boolean>((res) => {
        setModelM({
            cb: res,
            comp: preConfirmBox({
                message,
                description,
            }),
        });
    }).finally(() => {
        setModelM({
            cb: () => {},
            comp: null,
        });
    });
};

export const preConfirmBox: (props: { message: string; description?: string }) => Component = ({
    message,
    description,
}) => {
    return () => {
        return (
            <div
                class={classNames(
                    'flex w-60 flex-col gap-2 overflow-hidden rounded-xl text-center shadow-suit md:w-80 md:gap-4 md:rounded-3xl md:text-lg',
                    Gradient.position,
                    Gradient.white
                )}
            >
                <nav class="flex flex-col gap-2 px-4 pt-4">
                    <header class="text-lg font-bold md:text-xl">{message}</header>
                    <div class=" font-thin">{description}</div>
                </nav>
                <nav>
                    <Divider></Divider>
                    <div class="flex  text-purple-600 ">
                        <nav
                            class="h-full w-full flex-1 cursor-pointer  p-2 transition-all hover:backdrop-brightness-95"
                            onClick={() => ModelManage.cb(false)}
                        >
                            取消
                        </nav>
                        <nav
                            class="h-full w-full flex-1 cursor-pointer  p-2 transition-all hover:backdrop-brightness-95"
                            onClick={() => ModelManage.cb(true)}
                        >
                            确认
                        </nav>
                    </div>
                </nav>
            </div>
        );
    };
};
