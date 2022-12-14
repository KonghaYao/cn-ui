import { Atom } from '@cn-ui/use';
import { JSX, JSXElement } from 'solid-js';
import { Color, SizeTrans } from '../_util/design';

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    children?: JSXElement;
    text?: boolean;
    type?: 'submit' | 'button' | 'reset';
    round?: boolean;
    square?: boolean;
    color?: keyof typeof Color;
    /**
     * @zh 按钮的尺寸
     */
    size?: keyof typeof SizeTrans;

    /**
     * @zh 是否禁用
     */
    disabled?: boolean;

    /**
     * @zh 设置按钮的图标
     */
    icon?: JSXElement;

    /**
     * @zh 按钮宽度随容器自适应。
     */
    block?: boolean;
    loading?: boolean | Atom<boolean>;
}
