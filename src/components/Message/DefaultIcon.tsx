import { Component, JSX } from 'solid-js';
import { Icon } from '../Icon';
import { IconNames } from '../Icon/IconNames';

export const DefaultIcon: Component<
    JSX.HTMLAttributes<HTMLSpanElement> & { name: IconNames; color: string; spin?: boolean }
> = (props) => {
    return (
        <span
            class="cn-icon-wrapper h-5 w-5 inline-flex justify-center items-center rounded-full cursor-pointer"
            classList={{
                'bg-red-100 text-red-500': props.color === 'red',
                'bg-green-100 text-green-500': props.color === 'green',
                'bg-orange-100 text-orange-500': props.color === 'orange',
                'bg-gray-100 text-gray-500': props.color === 'gray',
                'bg-blue-100 text-blue-500': props.color === 'blue',
            }}
            {...props}
        >
            <Icon name={props.name} spin={props.spin}></Icon>
        </span>
    );
};
