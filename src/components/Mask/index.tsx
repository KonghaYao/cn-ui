import cs from '../_util/classNames';
import {
    Component,
    createEffect,
    JSXElement,
    mergeProps,
    createMemo,
    JSX,
    splitProps,
} from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import './style/index.less';
import { MaskProps } from './interface';
import { Icon } from '../Icon';

export const Mask: Component<MaskProps & { children: JSXElement }> = (props) => {
    const { componentConfig, rtl } = GlobalConfigStore;

    const merged = mergeProps(componentConfig?.Mask, props);

    const classNames = createMemo(() => cs('cn-mask', merged.className));

    return (
        <div
            classList={{
                rtl: rtl,
            }}
            class={classNames()}
            {...merged}
        >
            {props.children}
        </div>
    );
};

export const Position: Component<{
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    full?: boolean;
    children: JSXElement;
}> = (props) => {
    const [style, others] = splitProps(props, ['left', 'right', 'top', 'bottom']);
    let Style = mergeProps(style, { width: props.full && '100%', height: props.full && '100%' });
    return <span class="position" style={Style} {...others}></span>;
};
