import { Component, createMemo } from 'solid-js';
import './style/index.css';

import { loadLink } from '../_util/loadLink';
import { IconProps } from './interface';
import { OriginComponent } from '@cn-ui/use';
export const Icon = OriginComponent<IconProps, HTMLElement>((props) => {
    const fontSize = createMemo(() => {
        return typeof props.size === 'number' ? props.size + 'px' : props.size;
    });
    return (
        <nav
            ref={props.ref}
            class={props.class(
                'cn-icon-font inline-flex items-center justify-center select-none leading-none origin-center',
                {
                    spin: props.spin ?? false,
                }
            )}
            style={{ ...props.style, 'font-size': fontSize() }}
            onClick={props.onClick}
            onMouseMove={props.onMouseMove}
        >
            {props.name}
            {props.children}
        </nav>
    );
});
