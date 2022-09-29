// import React, { useState, useContext, forwardRef, CSSProperties } from 'react';
import cs from '../_util/classNames';

import { TagProps } from './interface';
import { GlobalConfigStore } from '../GlobalConfigStore';
import {
    Component,
    createEffect,
    createMemo,
    createResource,
    createSignal,
    Match,
    mergeProps,
    Show,
    Switch,
} from 'solid-js';
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

    const visible =
        typeof props.visible === 'boolean' ? atom<boolean>(props.visible) : props.visible;
    const checked =
        typeof props.checked === 'boolean' ? atom<boolean>(props.checked) : props.checked;

    let firstTime = true;
    const closing = atom(false);
    const Close = async (e) => {
        closing(true);
        if (props.onClose) await props.onClose(e);
        visible(false);
        closing(false);
    };

    const _color = createMemo(() => {
        const color = props.color;
        return color ? (COLORS.indexOf(color) !== -1 ? color : '') : '';
    });

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
                className={cs(
                    'cn-tag',
                    'inline-flex box-border items-center px-2 py-1 rounded-md font-light text-sm leading-none select-none cursor-pointer ',
                    props.size,
                    props.className
                )}
                classList={{
                    [`loading`]: closing(),

                    [`checked`]: checked(),
                    [`bordered`]: props.bordered,
                    [`rtl`]: rtl,
                }}
                onClick={() => {
                    const state = !checked();
                    checked(state);
                    props.onCheck && props.onCheck(state);
                    console.log('click');
                }}
                {...props}
            >
                <div class="content">{props.children}</div>
                <Switch>
                    <Match when={closing()}>
                        <Icon name="refresh" spin class={`loading-icon`} />
                    </Match>
                    <Match when={props.closable && props.closeIcon !== null}>
                        <Icon name="close" class={`close-icon`} onClick={() => Close()} />
                    </Match>
                </Switch>
            </div>
        </Show>
    );
};
