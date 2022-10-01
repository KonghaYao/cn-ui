import { Component, mergeProps } from 'solid-js';
import { Mask } from '../Mask';
import { Position } from '../Mask/Position';

import { CardProps } from './interface';

import { OriginComponent } from '../_util/OriginComponent';
export const Card: Component<CardProps> = OriginComponent((baseProps) => {
    const props = mergeProps({}, baseProps);
    const defaultPos = { left: '0', right: '0' };
    return (
        <Mask ref={props.ref} class={props.class('cn-card')} style={props.style}>
            <Position
                zIndex={0}
                {...defaultPos}
                style={{
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                {props.background}
            </Position>
            <Position zIndex={1} {...defaultPos} full>
                {props.children}
            </Position>
        </Mask>
    );
});
