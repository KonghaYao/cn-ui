import { ResourceAtom } from '@cn-ui/use';
import { JSXElement, Match, Switch } from 'solid-js';
export interface ASProps<T> {
    resource: ResourceAtom<T>;
    children?: JSXElement | ((data: T) => JSXElement);
    loading?: (data: ResourceAtom<T>) => JSXElement;
    error?: (data: ResourceAtom<T>) => JSXElement;
}

/** 专门为异步加载设计的状态组件 */
export const AS = function <T>(props: ASProps<T>) {
    return (
        <Switch>
            <Match when={props.resource.isReady()}>
                {typeof props.children === 'function'
                    ? props.children(props.resource())
                    : props.children}
            </Match>
            <Match when={props.resource.loading()}>{props.loading(props.resource)}</Match>
            <Match when={props.resource.error()}>{props.error(props.resource)}</Match>
        </Switch>
    );
};
