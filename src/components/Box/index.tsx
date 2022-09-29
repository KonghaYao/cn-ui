import { Component, JSXElement } from 'solid-js';
// import './style/index.less';
export const Box: Component<{
    children?: JSXElement;
    description?: string;
    icon: JSXElement;
}> = (props) => {
    return (
        <div class="cn-box h-full box-border flex flex-col justify-center items-center">
            <div class="container flex flex-col items-center">
                {props.icon}
                <div class="description text-sm font-thin">{props.description}</div>
                {props.children}
            </div>
        </div>
    );
};
