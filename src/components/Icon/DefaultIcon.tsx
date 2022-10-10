import { Component, JSX } from 'solid-js';
import { Icon } from './index';
import { IconProps } from './interface';

export const DefaultIcon: Component<
    IconProps & { color: 'red' | 'green' | 'orange' | 'gray' | 'blue' }
> = (props) => {
    return (
        <span
            class="cn-icon-wrapper p-2 inline-flex justify-center items-center rounded-full cursor-pointer"
            classList={{
                'bg-red-100 text-red-500': props.color === 'red',
                'bg-green-100 text-green-500': props.color === 'green',
                'bg-orange-100 text-orange-500': props.color === 'orange',
                'bg-slate-100 text-slate-500': props.color === 'gray',
                'bg-blue-100 text-blue-500': props.color === 'blue',
            }}
            onClick={props.onClick}
        >
            <Icon {...{ ...props, onClick: undefined }}></Icon>
        </span>
    );
};
