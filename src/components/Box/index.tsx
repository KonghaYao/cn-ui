import { Component, JSXElement } from 'solid-js';
import './style/index.less';
export const Box: Component<{
    children?: JSXElement;
    description?: string;
    icon: JSXElement;
}> = (props) => {
    return (
        <div class="cn-box">
            <div class="container">
                {props.icon}
                <div class="description">{props.description}</div>
                {props.children}
            </div>
        </div>
    );
};
