// import { CSSProperties, ReactNode } from 'react';

import { JSX, JSXElement } from 'solid-js';
import { IconNames } from './IconNames';
/**
 * @title Icon
 */
export interface IconProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'className' | 'ref'> {
    size?: string | number;
    name: IconNames;
    spin?: boolean;
    style?: JSX.CSSProperties;
}
