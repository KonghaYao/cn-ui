import { Atom, atom, atomization, extendsEvent, OriginComponent } from '@cn-ui/use';
import { createEffect, onCleanup, JSX, JSXElement } from 'solid-js';
import OriginSplit from 'split.js';
import './style.css';

export interface SplitProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /**
     * @zh 初始每个部分的百分比占比
     */
    sizes?: number[];
    /** @zh 每个部分的最小大小 */
    minSize?: number | number[];
    /** @zh 每个部分的最大大小 */
    maxSize?: number | number[];
    expandToMin?: boolean;
    /** @zh 分割部分的大小 */
    gutterSize?: number;
    /** @zh 分割部分的对齐方式 */
    gutterAlign?: 'center' | 'start' | 'end';
    /** @zh 自动缩回的距离 */
    snapOffset?: number | number[];
    dragInterval?: number;

    // Cursor to display while dragging.
    cursor?: string;
    children: JSXElement;
    vertical?: boolean;
}
import { children as getChildren } from 'solid-js';
/**
 * @zh 分割面板，使用 split.js 作为基础进行封装
 */
export const Split = OriginComponent<SplitProps>((props) => {
    const ref = atom<HTMLDivElement | null>(null);

    let lastSplit = { destroy() {} };
    const childBind = getChildren(() => props.children);
    createEffect(() => {
        const children = childBind.toArray();

        if (children.length) {
            const message = {
                ...props,
                direction: props.vertical ? 'vertical' : 'horizontal',
                elementStyle(dimension, size, gutterSize) {
                    return {
                        'flex-basis': 'calc(' + size + '%)',
                    };
                },
                gutterStyle(dimension, gutterSize) {
                    return {
                        'flex-basis': gutterSize + 'px',
                    };
                },
            } as any as OriginSplit.Options;
            // 推迟更新，等待 DOM 完成挂载
            setTimeout(() => {
                lastSplit.destroy();
                console.log('重构', children.length);
                lastSplit = OriginSplit(children as any as HTMLElement[], message);
            }, 10);
        }
    });
    onCleanup(() => lastSplit.destroy());
    return (
        <div
            role="presentation"
            ref={(container: HTMLDivElement) => {
                ref(container);
            }}
            class={props.class('flex')}
            classList={{
                'flex-col': props.vertical,
            }}
            style={props.style}
            {...extendsEvent(props)}
        >
            {childBind()}
        </div>
    );
});
