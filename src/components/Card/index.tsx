import { Component, mergeProps } from 'solid-js';
import { Mask } from '../Mask';
import { Position } from '../Mask/Position';

import { CardProps } from './interface';
import cs from '../_util/classNames';
import { OriginComponent } from '../_util/OriginComponent';
export const Card: Component<CardProps> = OriginComponent((baseProps) => {
    const props = mergeProps({}, baseProps);
    const defaultPos = { left: '0', right: '0' };
    const classNames = cs('cn-card', props.className, props.class);
    return (
        <Mask className={classNames} style={props.style}>
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
