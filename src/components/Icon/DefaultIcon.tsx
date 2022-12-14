import { extendsEvent, OriginComponent } from '@cn-ui/use';
import { Component, createMemo, JSX } from 'solid-js';
import { Color } from '../_util/design';
import { Icon } from './Icon';
import { IconProps } from './interface';

export interface DefaultIconProps extends IconProps {
    color: keyof typeof Color;
}
export const DefaultIcon = OriginComponent<DefaultIconProps>((props) => {
    const fontSize = createMemo(() => {
        return typeof props.size === 'number' ? props.size + 'px' : props.size;
    });
    return (
        <span
            class={props.class(
                'cn-icon-wrapper inline-flex h-[1.5em] w-[1.5em] cursor-pointer items-center justify-center rounded-full bg-gradient-to-b p-2',
                Color[props.color]
            )}
            style={{ ...props.style, 'font-size': fontSize() }}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            <Icon name={props.name} size={props.size} spin={props.spin}></Icon>
        </span>
    );
});
