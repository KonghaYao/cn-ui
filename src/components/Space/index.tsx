import cs from '../_util/classNames';
import { SpaceSize, SpaceProps } from './interface';
import { Component, createMemo, For, mergeProps, JSX, onMount, children } from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import './style/index.less';
import { TransitionGroup } from '../../Transition/TransitionGroup';
const defaultProps: SpaceProps = {
    size: 'mini',
};

export const Space: Component<SpaceProps> = (baseProps) => {
    const { componentConfig, rtl } = GlobalConfigStore;
    const props: SpaceProps = mergeProps(defaultProps, componentConfig?.Space, baseProps);

    const style = createMemo(() => {
        const size =
            typeof props.size === 'string' ? `var(--spacing-${props.size})` : props.size + 'px';
        return { ...props.style, '--space-size': size };
    });

    return (
        <div
            class={cs('cn-space', 'flex items-center', props.className)}
            classList={{
                vertical: props.vertical,
                [`wrap`]: props.wrap,
                [`rtl`]: rtl,
            }}
            {...props}
            style={style()}
        >
            {props.transition ? (
                <TransitionGroup {...props.transition}>{props.children}</TransitionGroup>
            ) : (
                props.children
            )}
        </div>
    );
};
