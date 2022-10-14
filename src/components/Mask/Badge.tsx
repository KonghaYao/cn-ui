import { Component, JSXElement, JSX } from 'solid-js';
import { extendsEvent, OriginComponent } from '@cn-ui/use';

/**
 * @title Badge
 */
export interface BadgeProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /**
     * @zh 徽标显示的数字, 超出 max-width 将会修改原始的数字
     * @en Number to show in badge
     * @defaultValue 0
     */
    count?: number | JSXElement;

    /**
     * @zh 显示为小红点
     * @en Whether to display a red dot instead of `count`
     */
    dot?: boolean;

    /**
     * @zh 徽标最大显示数值，如果 count 超过这个数值会显示为 `${maxCount}+`
     * @en Max count to show. If count is larger than this value, it will be displayed as `${maxCount}+`
     * @defaultValue 99
     */
    maxCount?: number;

    children?: JSXElement;
}

import './style/index.css';
const preCount = (count: number, maxCount: number = 99) => {
    return count > maxCount ? maxCount + '+' : count.toString();
};
/** @zh 小红点 */
export const Badge = OriginComponent<BadgeProps, HTMLDivElement>((props) => {
    const className =
        'cn-badge flex justify-center items-center rounded-full select-none text-xs px-1 bg-red-400 text-white';
    return (
        <div
            class={props.class(className)}
            classList={{ dot: true }}
            ref={props.ref}
            style={props.style}
            {...extendsEvent(props)}
        >
            {typeof props.count === 'string' || typeof props.count === 'number'
                ? preCount(props.count as number, props.maxCount)
                : props.children}
        </div>
    );
});
