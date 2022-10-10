import { Component, mergeProps } from 'solid-js';
import { Mask } from '../Mask';
import { Position } from '../Mask/Position';

import { CardProps } from './interface';

import { OriginComponent } from '@cn-ui/use';
export const Card = OriginComponent<CardProps, HTMLDivElement>((props) => {
    props = mergeProps({}, props);
    const defaultPos = { left: '0', right: '0' };

    return (
        <Mask ref={props.ref} class={props.class('cn-card')} style={props.style}>
            <Position
                z-index="0"
                {...defaultPos}
                style={{
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                {props.background}
            </Position>
            <Position z-index="1" {...defaultPos} full>
                {props.children}
            </Position>
        </Mask>
    );
});
