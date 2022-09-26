import { Component, useContext } from 'solid-js';

import { Mask } from '../Mask/index';
import { Position } from '../Mask/Position';
let zIndex = 1000;

export const GlobalLayer: Component = () => {
    return <Mask style={{ 'z-index': zIndex }}>{}</Mask>;
};
