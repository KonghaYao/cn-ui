import { Component, Match, Switch } from 'solid-js';
import { BadgeProps } from './interface-Bage';
import './style/index.less';
const preCount = (count: number, maxCount: number = 99) => {
    return count > maxCount ? maxCount + '+' : count.toString();
};
/** @zh 将组件布局到指定的位置 */
export const Badge: Component<BadgeProps> = (props) => {
    const className =
        'cn-badge flex justify-center items-center rounded-full select-none text-sm px-1 bg-red-400 text-white';
    return (
        <>
            <Switch fallback={<span class={className}>{props.children}</span>}>
                <Match when={props.dot}>
                    <div class={className} classList={{ dot: true }}></div>
                </Match>
                <Match when={typeof props.count === 'string' || typeof props.count === 'number'}>
                    <div class={className}>{preCount(props.count as number, props.maxCount)}</div>
                </Match>
            </Switch>
        </>
    );
};
