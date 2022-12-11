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

/** 创建 Template 函数，只需要输入默认的组件即可创建异步组件 */
export function createAC(Default: Pick<ASProps<unknown>, 'children' | 'error' | 'loading'>) {
    return function <T>(
        props: Partial<Omit<ASProps<T>, 'resource'>> & { resource: ResourceAtom<T> }
    ) {
        return (
            <AS
                resource={props.resource}
                loading={props.loading ?? Default.loading}
                error={props.error ?? Default.error}
                children={props.children ?? Default.children}
            ></AS>
        );
    };
}
