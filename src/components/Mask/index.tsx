import cs from '../_util/classNames';
import { Component, createEffect, JSXElement, mergeProps, createMemo, JSX } from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import './style/index.less';
import { MaskProps } from './interface';

/** @zh 将组件内部变为绝对定位, 可以配合 Position 实现角落位置 */
export const Mask: Component<MaskProps & { children: JSXElement }> = (props) => {
    const { componentConfig, rtl } = GlobalConfigStore;

    const merged = mergeProps(componentConfig?.Mask, props);

    return (
        <div
            classList={{
                rtl: rtl,
            }}
            class={cs('cn-mask relative w-fit h-fit', merged.className)}
            {...merged}
        >
            {props.children}
        </div>
    );
};
