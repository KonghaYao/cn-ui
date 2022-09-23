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
            class="px-icon-font"
            classList={{
                'px-icon-spin': props.spin ?? false,
            }}
            style={{ 'font-size': props.size ?? '1rem' }}
        >
            {props.name}
        </nav>
    );
};
