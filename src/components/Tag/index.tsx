// import React, { useState, useContext, forwardRef, CSSProperties } from 'react';

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
import { atom } from '@cn-ui/use';
import { Icon } from '../Icon';

// 色板里的 12 个颜色
export const COLORS = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
];

const defaultProps: TagProps = {
    size: 'default',
    visible: true,
    checked: false,
};
import './style/index.less';
import { OriginComponent } from '@cn-ui/use';
export const Tag = OriginComponent<TagProps, HTMLDivElement>((baseProps) => {
    const props = mergeProps(defaultProps, baseProps);

    const visible =
        typeof props.visible === 'boolean' ? atom<boolean>(props.visible) : props.visible;
    const checked =
        typeof props.checked === 'boolean' ? atom<boolean>(props.checked) : props.checked;

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
    return (
        <Show when={visible()}>
            <div
                ref={props.ref}
                style={props.style}
                class={props.class(
                    'cn-tag',
                    'inline-flex box-border items-center px-2 py-1 rounded-md font-light text-sm leading-none select-none cursor-pointer ',
                    {
                        [`loading`]: closing(),

                        [`checked`]: checked(),
                        [`bordered`]: props.bordered,
                    },
                    props.size,
                    props.className,
                    _color()
                )}
                onClick={() => {
                    if (props.checkable) {
                        const state = !checked();
                        checked(state);
                        props.onCheck && props.onCheck(state);
                    }
                }}
            >
                <div class="content">{props.children}</div>
                <Switch>
                    <Match when={closing()}>
                        <Icon name="refresh" spin class="loading-icon" />
                    </Match>
                    <Match when={props.closable && props.closeIcon !== null}>
                        <Icon name="close" class={`close-icon`} onClick={Close} />
                    </Match>
                </Switch>
            </div>
        </Show>
    );
});
