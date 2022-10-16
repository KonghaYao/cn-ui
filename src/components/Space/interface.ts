// import { CSSProperties, ReactNode } from 'react';

import { JSXElement } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { TransitionGroupProps } from '@cn-ui/core';

export type SpaceSize = 'mini' | 'small' | 'medium' | 'large' | number;

/**
 * @title Space
 */
export interface SpaceProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /**
     * @zh 附加动画
     *  */
    transition?: TransitionGroupProps;

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

    children?: JSXElement;
}
