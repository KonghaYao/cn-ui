import { JSX, JSXElement } from 'solid-js';
/**
 * @title Avatar
 */
export interface AvatarProps {
    style?: JSX.CSSProperties;
    src?: string;
    className?: string | string[];
    /**
     * @zh 头像的形状，有圆形(circle)和正方形(square)两种
     * @en The shape of the avatar. Two shapes are available: `circle` and `square`
     * @defaultValue circle
     */
    shape?: 'circle' | 'square';
    /**
     * @zh 头像的尺寸大小，单位是 `px`
     * @en The size of the avatar in `px`
     */
    size?: number | string;
    /**
     * @zh 是否自动根据头像尺寸调整字体大小。
     * @en Whether to automatically adjust the font size according to the size of the avatar.
     * @defaultValue true
     */
    autoFixFontSize?: boolean;

    /**
     * @zh 点击回调
     * @en Callback when avatar is clicked
     */
    onClick?: (e) => void;
}
