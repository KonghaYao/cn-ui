import { Component, Match, Switch } from 'solid-js';
import { BadgeProps } from './interface-Bage';
import './style/index.less';
const preCount = (count: number, maxCount: number = 99) => {
    return count > maxCount ? maxCount + '+' : count.toString();
};
/** @zh 将组件布局到指定的位置 */
export const Badge: Component<BadgeProps> = (props) => {
    return (
        <>
            <Switch fallback={<span class="cn-badge">{props.children}</span>}>
                <Match when={props.dot}>
                    <div class="cn-badge dot"></div>
                </Match>
                <Match when={typeof props.count === 'string' || typeof props.count === 'number'}>
                    <div class="cn-badge">{preCount(props.count as number, props.maxCount)}</div>
                </Match>
            </Switch>
        </>
    );
};
