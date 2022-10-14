import { Component, createMemo } from 'solid-js';
import '@fontsource/material-icons-rounded/index.css';
import './style/index.css';
import { IconProps } from './interface';
import { extendsEvent, OriginComponent } from '@cn-ui/use';
export const Icon = OriginComponent<IconProps, HTMLElement>((props) => {
    const fontSize = createMemo(() => {
        return typeof props.size === 'number' ? props.size + 'px' : props.size;
    });
    return (
        <nav
            ref={props.ref}
            class={props.class(
                'cn-icon-font inline-flex origin-center select-none items-center justify-center align-bottom',
                {
                    spin: props.spin ?? false,
                }
            )}
            style={{ ...props.style, 'font-size': fontSize() }}
            {...extendsEvent(props)}
        >
            {props.name}
            {props.children}
        </nav>
    );
});
