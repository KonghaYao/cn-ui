import { JSX, JSXElement } from 'solid-js';
/**
 * @title Mask
 */
export interface MaskProps {
    style?: JSX.CSSProperties;

    className?: string | string[];

    /**
     * @zh 点击回调
     * @en Callback when avatar is clicked
     */
    onClick?: (e) => void;
}
