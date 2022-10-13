import { Atom } from '@cn-ui/use';
import { JSX, JSXElement } from 'solid-js';
import { Color, SizeTrans } from './design';

export interface BaseButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    children?: JSXElement;

    outline?: boolean;
    round?: boolean;
    square?: boolean;
    color?: keyof typeof Color;
    /**
     * @zh 按钮的尺寸
     * @en Size of the button
     * @defaultValue default
     */
    size?: keyof typeof SizeTrans;

    /**
     * @zh 是否禁用
     * @en Whether to disable the button
     */
    disabled?: boolean;

    /**
     * @zh 设置按钮的图标
     * @en Icon of the button
     */
    icon?: JSXElement;

    /**
     * @zh 按钮宽度随容器自适应。
     * @en Whether the width of the button should adapt to the container.
     */
    block?: boolean;
    loading?: boolean | Atom<boolean>;
}

export type AnchorButtonProps = {
    href: string;
    target?: string;
    anchorProps?: JSX.HTMLAttributes<HTMLAnchorElement>;
} & BaseButtonProps &
    Omit<JSX.HTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick' | 'className'>;

export type FinalButtonProps = {
    /**
     * @zh 按钮原生的 html type 类型
     * @en html button type
     * @defaultValue button
     */
    htmlType?: 'button' | 'submit' | 'reset';
} & BaseButtonProps &
    Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'className'>;

/**
 * @title Button
 */
export type ButtonProps = Partial<FinalButtonProps & AnchorButtonProps>;
