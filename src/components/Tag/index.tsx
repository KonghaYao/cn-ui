// import React, { useState, useContext, forwardRef, CSSProperties } from 'react';
import cs from '../_util/classNames';

import { TagProps } from './interface';
import { GlobalConfigStore } from '../GlobalConfigStore';
import { Component, createMemo, createResource, mergeProps, Show } from 'solid-js';
import { atom } from 'solid-use';
import { Icon } from '../Icon';

// 色板里的 12 个颜色
export const COLORS = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'purple',
    'magenta',
    'gray',
];

const defaultProps: TagProps = {
    size: 'default',
    visible: true,
    checked: false,
};
import './style/index.less';
export const Tag: Component<TagProps> = (baseProps) => {
    const { componentConfig, rtl } = GlobalConfigStore;

    const props: TagProps = mergeProps(defaultProps, componentConfig?.Tag, baseProps);

    const visible = atom<boolean>(props.visible);
    const checked =
        typeof props.checked === 'boolean' ? atom<boolean>(props.checked) : props.checked;

    let firstTime = true;
    const [closing, { refetch: Close }] = createResource(async (e) => {
        if (firstTime) {
            firstTime = false;
            return;
        }
        props.onClose && (await props.onClose(e));
        visible(false);
        console.log('关闭自己');
    });

    const _color = createMemo(() => {
        const color = props.color;
        return color ? (COLORS.indexOf(color) !== -1 ? color : '') : '';
    });

    const classNames = cs('cn-tag', props.size, props.className);

    if (visible() === false) return null;
    const style = createMemo(() => {
        const Color = {
            '--background-color': `var(--${_color()}-10)`,
            '--background-color-checked': `var(--${_color()}-9)`,
            '--color': `var(--${_color()}-3)`,
        };
        return {
            ...props.style,
            ...(_color() ? Color : {}),
        };
    });
    return (
        <Show when={visible()}>
            <div
                style={style()}
                className={classNames}
                classList={{
                    [`loading`]: closing.loading,

                    [`checked`]: checked(),
                    [`bordered`]: props.bordered,
                    [`rtl`]: rtl,
                }}
                onClick={() => {
                    const state = !checked();
                    checked(state);
                    props.onCheck && props.onCheck(state);
                }}
                {...props}
            >
                <span class={`content`}>{props.children}</span>
                {props.closable && !closing.loading && props.closeIcon !== null && (
                    <Icon name="close" class={`close-icon`} onClick={Close} />
                )}
                {closing.loading && <Icon name="refresh" spin class={`loading-icon`} />}
            </div>
        </Show>
    );
};
