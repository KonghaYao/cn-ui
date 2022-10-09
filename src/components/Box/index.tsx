import { Component, JSX, JSXElement } from 'solid-js';
import { OriginComponent } from '@cn-ui/use';

export interface BoxProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: JSXElement;
    title?: string;
    subTitle?: string;
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
                'cn-box h-full box-border flex flex-col justify-center items-center bg-slate-50'
            )}
            style={props.style}
        >
            <div class="flex flex-col items-center overflow-hidden">
                {props.icon}
                <div class="text-slate-600 font-bold my-2">{props.title}</div>
                <div class="description text-sm font-thin text-slate-400">{props.subTitle}</div>
                {props.children}
            </div>
        </div>
    );
});
