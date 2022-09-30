// import { CSSProperties, ReactNode } from 'react';

import { JSX, JSXElement } from 'solid-js';
import { IconNames } from './IconNames';
/**
 * @title Icon
 */
export interface IconProps extends JSX.HTMLAttributes<HTMLDivElement> {
    size?: string | number;
    name: IconNames;
    spin?: boolean;
}
