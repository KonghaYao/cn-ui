import { extendsEvent, OriginComponent } from '@cn-ui/use';
import { Component, JSX } from 'solid-js';
import { Icon } from './Icon';
import { IconProps } from './interface';

export interface DefaultIconProps extends IconProps {
    color: 'red' | 'green' | 'orange' | 'gray' | 'blue';
}
export const DefaultIcon = OriginComponent<DefaultIconProps>((props) => {
    return (
        <span
            class={props.class(
                'cn-icon-wrapper inline-flex cursor-pointer items-center justify-center rounded-full p-2 '
            )}
            style={props.style}
            ref={props.ref}
            classList={{
                'bg-red-50 text-red-500': props.color === 'red',
                'bg-green-50 text-green-500': props.color === 'green',
                'bg-orange-50 text-orange-500': props.color === 'orange',
                'bg-slate-50 text-slate-500': props.color === 'gray',
                'bg-blue-50 text-blue-500': props.color === 'blue',
            }}
            {...extendsEvent(props)}
        >
            <Icon name={props.name} size={props.size}></Icon>
        </span>
    );
});
