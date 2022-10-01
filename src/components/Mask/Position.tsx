import { Component, JSX, JSXElement, mergeProps, splitProps } from 'solid-js';
import { OriginComponent } from '../_util/OriginComponent';
import './style/index.less';
export interface PositionProps extends JSX.HTMLAttributes<HTMLSpanElement> {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    /** @zh Mask 覆盖整个外框 */
    full?: boolean;

    zIndex?: number;
    children: JSXElement;
}
/** @zh 将组件布局到指定的位置 */
export const Position = OriginComponent<PositionProps>((props) => {
    const [style, others] = splitProps(props, ['left', 'right', 'top', 'bottom', 'zIndex']);
    let Style = mergeProps(style, others.style, {
        width: props.full && '100%',
        height: props.full && '100%',
    });
    return (
        <span ref={props.ref} class={others.class('cn-position absolute')} style={Style}>
            {others.children}
        </span>
    );
});
