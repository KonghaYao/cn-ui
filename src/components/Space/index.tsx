import cs from '../_util/classNames';
import { SpaceSize, SpaceProps } from './interface';
import { Component, createMemo, For, mergeProps, JSX, onMount, children } from 'solid-js';
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

    const classNames = createMemo(() => cs('cn-space', props.className));

    const childrenList = createMemo(() => {
        const child = children(() => props.children);
        return child.toArray();
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
                    const main = <div class="cn-space-item">{child}</div>;

                    return (
                        <>
                            {main}
                            {index() !== childrenList.length - 1 && props.split}
                        </>
                    );
                }}
            </For>
        </div>
    );
};
