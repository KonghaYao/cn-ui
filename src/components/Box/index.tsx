import { Component, JSX, JSXElement } from 'solid-js';
import { OriginComponent } from '../_util/OriginComponent';

interface BoxProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: JSXElement;
    description?: string;
    icon: JSXElement;
}
/**
 * @zh Box 是将内部元素居中显示的展示组件, 一般用于空状态使用
 */
export const Box = OriginComponent<BoxProps, HTMLDivElement>((props) => {
    return (
        <div
            ref={props.ref}
            class={props.class(
                'cn-box h-full box-border flex flex-col justify-center items-center bg-gray-50'
            )}
            style={props.style}
        >
            <div class="flex flex-col items-center overflow-hidden">
                {props.icon}
                <div class="description text-sm font-thin text-gray-400">{props.description}</div>
                {props.children}
            </div>
        </div>
    );
});
