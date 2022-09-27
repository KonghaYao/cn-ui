// import { CSSProperties, ReactNode } from 'react';

import { JSXElement } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

export type SpaceSize = 'mini' | 'small' | 'medium' | 'large' | number;

/**
 * @title Space
 */
export interface SpaceProps {
    style?: JSX.CSSProperties;
    className?: string | string[];
    /**
     * @zh 对齐方式
     * @en Alignment of items
     */
    align?: 'start' | 'end' | 'center' | 'baseline';
    /**
     * @zh 间距方向
     * @en The space direction
     * @defaultValue horizontal
     */
    vertical?: boolean;
    /**
     * @zh 尺寸。( `2.15.0` 开始支持数组形式 )
     * @en The space size. ( Array format add in `2.15.0` )
     * @defaultValue small
     */
    size?: SpaceSize | SpaceSize[];
    /**
     * @zh 环绕类型的间距，用于折行的场景。
     * @en Whether to wrap line automatic
     */
    wrap?: boolean;
    /**
     * @zh 设置分隔符
     * @en Set separator
     * @version 2.22.0
     */
    split?: JSXElement;

    /** 动画类名 */
    animate?: string;
    children?: JSXElement;
}
