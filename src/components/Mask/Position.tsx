import { Component, JSX, JSXElement, mergeProps, splitProps } from 'solid-js';
import { OriginComponent } from '@cn-ui/use';
import './style/index.less';
export interface PositionProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    inset?: JSX.CSSProperties['inset'];
    /** @zh Mask 覆盖整个外框 */
    full?: boolean;

    /** @zh 是否触发 pointer-event */
    inactive?: boolean;
    'z-index'?: string;
    children: JSXElement;
}
/** @zh 将组件布局到指定的位置 */
export const Position = OriginComponent<PositionProps>((props) => {
    const [style, others] = splitProps(props, [
        'left',
        'right',
        'top',
        'bottom',
        'z-index',
        'inset',
    ]);
    let Style = mergeProps(style, others.style, {
        width: props.full && '100%',
        height: props.full && '100%',
    });
    return (
        <span
            ref={props.ref}
            class={others.class('cn-position absolute')}
            classList={{ 'pointer-events-none': props.inactive }}
            style={Style}
        >
            {others.children}
        </span>
    );
});
