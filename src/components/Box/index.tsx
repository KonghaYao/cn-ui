import { Component, JSXElement } from 'solid-js';

/**
 * @zh Box 是将内部元素居中显示的展示组件, 一般用于空状态使用
 */
export const Box: Component<{
    children?: JSXElement;
    description?: string;
    icon: JSXElement;
}> = (props) => {
    return (
        <div class="cn-box h-full box-border flex flex-col justify-center items-center bg-gray-50">
            <div class="flex flex-col items-center overflow-hidden">
                {props.icon}
                <div class="description text-sm font-thin text-gray-400">{props.description}</div>
                {props.children}
            </div>
        </div>
    );
};
