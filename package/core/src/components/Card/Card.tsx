import { Component, mergeProps } from 'solid-js';

import { CardProps } from './interface';

import { OriginComponent } from '@cn-ui/use';
import { Relative } from '../Mask/Relative';
import { Position } from '../Mask/Position';
export const Card = OriginComponent<CardProps, HTMLDivElement>((props) => {
    props = mergeProps({}, props);
    const defaultPos = { left: '0', right: '0' };

    return (
        <Relative ref={props.ref} class={props.class('cn-card')} {...props}>
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
        </Relative>
    );
});
