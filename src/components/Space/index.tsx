// import React, { useContext, Fragment, forwardRef, ReactElement } from 'react';
import cs from '../_util/classNames';
import { SpaceSize, SpaceProps } from './interface';
import { Component, createMemo, mergeProps } from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import './style/index.less';
const defaultProps: SpaceProps = {
    size: 'mini',
};

export const Space: Component<SpaceProps> = (baseProps) => {
    const { componentConfig, rtl } = GlobalConfigStore;
    const props = mergeProps(defaultProps, componentConfig?.Space, baseProps);

    const style = createMemo(() => {
        const size =
            typeof props.size === 'string' ? `var(--spacing-${props.size})` : props.size + 'px';
        return { ...props.style, '--space-size': size };
    });
    const innerAlign = props.align || 'center';

    const classNames = createMemo(() => cs('cn-space', props.className));

    const childrenList = props.children;

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
            {childrenList.map((child, index) => {
                return (
                    <>
                        <div class="cn-space-item">{child}</div>
                        {index !== childrenList.length - 1 && props.split}
                    </>
                );
            })}
        </div>
    );
};
