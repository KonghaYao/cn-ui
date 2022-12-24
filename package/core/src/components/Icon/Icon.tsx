import { Component, createMemo } from 'solid-js';
import './style/index.css';
import { IconProps } from './interface';
import { extendsEvent, OriginComponent } from '@cn-ui/use';
export const Icon = OriginComponent<IconProps, HTMLElement>((props) => {
    const fontSize = createMemo(() => {
        return typeof props.size === 'number' ? props.size + 'px' : props.size;
    });
    return (
        <div
            ref={props.ref}
            class={props.class(
                'cn-icon-font flex flex-none origin-center select-none items-center justify-center align-bottom',
                {
                    spin: props.spin ?? false,
                }
            )}
            style={{ 'line-height': '1em', ...props.style, 'font-size': fontSize() }}
            {...extendsEvent(props)}
            onClick={props.onClick}
        >
            {props.name}
            {props.children}
        </div>
    );
});
