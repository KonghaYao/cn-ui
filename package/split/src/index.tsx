import { Atom, atom, atomization, extendsEvent, OriginComponent } from '@cn-ui/use';
import { createEffect, onCleanup, JSX, JSXElement, onMount, untrack, splitProps } from 'solid-js';
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
    let ref: HTMLDivElement;

    let lastSplit = { destroy() {} };
    const childBind = getChildren(() => props.children);
    createEffect(() => {
        const children = childBind.toArray();

        if (children.length) {
            console.log('开始 split');
            //! 注意，props.children 是一个非常特殊的属性，
            //! 触发其 Getter 的时候会重新绘制整个页面
            const [_, others] = splitProps(props, ['children']);
            const message = {
                ...others,
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
                lastSplit = OriginSplit(children as any as HTMLElement[], message);
            }, 10);
        }
    });
    onCleanup(() => lastSplit.destroy());
    return (
        <div
            role="presentation"
            ref={(container: HTMLDivElement) => {
                ref = container;
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
