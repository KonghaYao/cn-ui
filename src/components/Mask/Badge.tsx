import { Component, Match, Switch } from 'solid-js';
import { OriginComponent } from '../_util/OriginComponent';
import { BadgeProps } from './interface-Bage';
import './style/index.less';
const preCount = (count: number, maxCount: number = 99) => {
    return count > maxCount ? maxCount + '+' : count.toString();
};
/** @zh 将组件布局到指定的位置 */
export const Badge = OriginComponent<BadgeProps, HTMLDivElement>((props) => {
    const className =
        'cn-badge flex justify-center items-center rounded-full select-none text-xs px-1 bg-red-400 text-white';
    return (
        <>
            <Switch fallback={<span class={props.class(className)}>{props.children}</span>}>
                <Match when={props.dot}>
                    <div
                        class={props.class(className)}
                        ref={props.ref}
                        classList={{ dot: true }}
                    ></div>
                </Match>
                <Match when={typeof props.count === 'string' || typeof props.count === 'number'}>
                    <div class={props.class(className)} ref={props.ref}>
                        {preCount(props.count as number, props.maxCount)}
                    </div>
                </Match>
            </Switch>
        </>
    );
});
