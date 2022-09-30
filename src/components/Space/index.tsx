import { SpaceSize, SpaceProps } from './interface';
import { Component, createMemo, For, mergeProps, JSX, onMount, children } from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import './style/index.less';
import { TransitionGroup } from '../../Transition/TransitionGroup';
import { OriginComponent } from '../_util/OriginComponent';
const defaultProps: SpaceProps = {
    size: 'mini',
};

export const Space = OriginComponent<SpaceProps>((baseProps) => {
    const { componentConfig, rtl } = GlobalConfigStore;
    const props = mergeProps(defaultProps, componentConfig?.Space, baseProps);

    const style = createMemo(() => {
        // 需要在 CSS 中进行层叠计算，故使用变量方式
        const size =
            typeof props.size === 'string' ? `var(--spacing-${props.size})` : props.size + 'px';
        return { ...props.style, '--space-size': size };
    });

    return (
        <div
            class={props.class('cn-space', 'flex items-center')}
            classList={{
                vertical: props.vertical,
                [`wrap`]: props.wrap,
                [`rtl`]: rtl,
            }}
            style={style()}
        >
            {props.transition ? (
                <TransitionGroup {...props.transition}>{props.children}</TransitionGroup>
            ) : (
                props.children
            )}
        </div>
    );
});
