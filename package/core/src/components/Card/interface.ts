import { JSX, JSXElement } from 'solid-js';

/**
 * @title Card
 */
export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
    style?: JSX.CSSProperties;
    className?: string | string[];
    background?: JSXElement;
    children?: JSXElement;
}
