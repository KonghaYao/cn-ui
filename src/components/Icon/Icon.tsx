import { Component } from 'solid-js';
import './Icon.css';
import { IconNames } from './IconNames';
export const Icon: Component<{
    size?: string;
    name: IconNames;
    spin?: boolean;
}> = (props) => {
    return (
        <nav
            class="cn-icon-font"
            classList={{
                'cn-icon-spin': props.spin ?? false,
            }}
            style={{ 'font-size': props.size }}
        >
            {props.name}
        </nav>
    );
};
