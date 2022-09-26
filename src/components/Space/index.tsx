import cs from '../_util/classNames';
import { SpaceSize, SpaceProps } from './interface';
import { Component, createMemo, For, mergeProps, JSX } from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import './style/index.less';
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
    const innerAlign = props.align || 'center';

    const classNames = createMemo(() => cs('cn-space', props.className));

    const childrenList = createMemo<JSX.ArrayElement>(() => {
        return (
            props.children.hasOwnProperty('length') ? props.children : [props.children]
        ) as JSX.ArrayElement;
    });

    return (
        <div
            class={classNames()}
            classList={{
                vertical: props.vertical,
                [`wrap`]: props.wrap,
                [`rtl`]: rtl,
            }}
            {...props}
            style={style()}
        >
            <For each={childrenList()}>
                {(child, index) => {
                    return (
                        <>
                            <div class="cn-space-item">{child}</div>
                            {index() !== childrenList.length - 1 && props.split}
                        </>
                    );
                }}
            </For>
        </div>
    );
};
