import { extendsEvent, OriginComponent } from '@cn-ui/use';
import { Component, createMemo, JSX } from 'solid-js';
import { Icon } from './Icon';
import { IconProps } from './interface';

export interface DefaultIconProps extends IconProps {
    color: 'red' | 'green' | 'orange' | 'gray' | 'blue';
}
export const DefaultIcon = OriginComponent<DefaultIconProps>((props) => {
    const fontSize = createMemo(() => {
        return typeof props.size === 'number' ? props.size + 'px' : props.size;
    });
    return (
        <span
            class={props.class(
                'cn-icon-wrapper inline-flex h-[1.5em] w-[1.5em] cursor-pointer items-center justify-center rounded-full p-2'
            )}
            style={{ ...props.style, 'font-size': fontSize() }}
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
