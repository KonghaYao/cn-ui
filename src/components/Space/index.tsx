import { SpaceProps } from './interface';
export * from './interface';
import { Component, createMemo, For, mergeProps, JSX, onMount, children } from 'solid-js';
import './style/index.less';
import { TransitionGroup } from '@cn-ui/core';
import { extendsEvent, OriginComponent } from '@cn-ui/use';
const defaultProps: SpaceProps = {
    size: 'mini',
};

const spaceSize = {
    mini: 0.25,
    small: 0.5,
    medium: 0.75,
    large: 1,
};
export const Space = OriginComponent<SpaceProps, HTMLDivElement>((baseProps) => {
    const props = mergeProps(defaultProps, baseProps);

    const style = createMemo(() => {
        // 需要在 CSS 中进行层叠计算，故使用变量方式
        const size = (typeof props.size === 'string' ? spaceSize[props.size] : props.size) + 'em';
        return { ...props.style, '--space-size': size };
    });

    return (
        <div
            ref={props.ref}
            class={props.class(
                'cn-space',
                props.vertical && 'inline-flex flex-col',
                'flex items-center',
                props.wrap && 'flex-wrap'
            )}
            {...extendsEvent(props)}
            style={style()}
        >
            {props.children}
        </div>
    );
});
