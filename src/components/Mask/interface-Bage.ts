import { JSXElement } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

/**
 * @title Badge
 */
export interface BadgeProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /**
     * @zh 徽标显示的数字
     * @en Number to show in badge
     * @defaultValue 0
     */
    count?: number | JSXElement;
    /**
     * @zh 自定义提示内容
     * @en Set the display text of the status dot
     */
    text?: string;
    /**
     * @zh 显示为小红点
     * @en Whether to display a red dot instead of `count`
     */
    dot?: boolean;
    /**
     * @zh 徽标的样式
     * @en Customize Badge dot style
     */
    dotStyle?: JSX.CSSProperties;

    /**
     * @zh 徽标最大显示数值，如果 count 超过这个数值会显示为 `${maxCount}+`
     * @en Max count to show. If count is larger than this value, it will be displayed as `${maxCount}+`
     * @defaultValue 99
     */
    maxCount?: number;
    /**
     * @zh 设置徽标位置的偏移
     * @en Set offset of the badge dot
     */
    offset?: [number, number];
    /**
     * @zh 内置的一些颜色
     * @en Customize dot color
     */
    color?:
        | 'red'
        | 'orangered'
        | 'orange'
        | 'gold'
        | 'lime'
        | 'green'
        | 'cyan'
        | 'arcoblue'
        | 'purple'
        | 'pinkpurple'
        | 'magenta'
        | 'gray'
        | string;
    /**
     * @zh 徽标的状态类型
     * @en Set badge as a status dot
     */
    status?: 'default' | 'processing' | 'success' | 'warning' | 'error';
    children?: JSXElement;
}
