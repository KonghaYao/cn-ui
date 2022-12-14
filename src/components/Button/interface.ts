import { JSX, JSXElement } from 'solid-js';

export interface BaseButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    children?: JSXElement;
    /**
     * @zh
     * 按钮主要分为六种按钮类型：主要按钮、次级按钮、虚框按钮、文字按钮、线性按钮，`default` 为次级按钮。
     * @en
     * A variety of button types are available: `primary`, `secondary`, `dashed`,
     * `text`, `linear` and `default` which is the secondary.
     * @defaultValue default
     */
    type?: 'primary' | 'secondary' | 'dashed' | 'text' | 'outline';
    /**
     * @zh 按钮状态
     * @en Status of the button
     * @defaultValue default
     */
    status?: 'warning' | 'danger' | 'success';
    /**
     * @zh 按钮的尺寸
     * @en Size of the button
     * @defaultValue default
     */
    size?: 'mini' | 'small' | 'normal' | 'large';
    /**
     * @zh 按钮形状，`circle` - 圆形， `round` - 全圆角， `square` - 长方形
     * @en Three button shapes are available: `circle`, `round` and `square`
     * @defaultValue square
     */
    shape?: 'circle' | 'round' | 'square';

    /**
     * @zh a 链接的 target 属性，href 存在时生效
     * @en The target attribute of the link, which takes effect when href exists.
     */
    target?: string;

    /**
     * @zh 是否禁用
     * @en Whether to disable the button
     */
    disabled?: boolean;
    /**
     * @zh 按钮是否是加载状态
     * @en Whether the button is in the loading state
     */
    loading?: boolean;

    /**
     * @zh 设置按钮的图标
     * @en Icon of the button
     */
    icon?: JSXElement;
    /**
     * @zh 只有图标，按钮宽高相等。如果指定 `icon` 且没有 children，`iconOnly` 默认为 true
     * @en Whether to show icon only, in which case the button width and height are equal. If `icon` is specified and there are no children, `iconOnly` defaults to `true`
     */
    iconOnly?: boolean;
    /**
     * @zh 按钮宽度随容器自适应。
     * @en Whether the width of the button should adapt to the container.
     */
    block?: boolean;
    /**
     * @zh 点击按钮的回调
     * @en Callback fired when the button is clicked
     */
    onClick?: (e: Event) => void;
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
