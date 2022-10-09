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
import { OriginComponent } from '@cn-ui/use';

/** @zh 将组件内部变为绝对定位, 可以配合 Position 实现角落位置 */
export const Mask = OriginComponent<MaskProps & { children: JSXElement }, HTMLDivElement>(
    (props) => {
        const { componentConfig, rtl } = GlobalConfigStore;

        props = mergeProps(componentConfig?.Mask, props);
        const [events, others] = splitProps(props, [
            'onClick',
            'onDrop',
            'onDragOver',
            'onDragLeave',
        ]);

        return (
            <div
                class={props.class('cn-mask relative')}
                classList={{
                    rtl: rtl,
                }}
                style={props.style}
                ref={props.ref}
                {...events}
            >
                {props.children}
            </div>
        );
    }
);
