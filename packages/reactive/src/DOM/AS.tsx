import { ResourceAtom } from '../atom/resource';
import { JSXElement, Match, Switch } from 'solid-js';
export interface ASProps<T> {
    resource: ResourceAtom<T>;
    children?: JSXElement | ((data: T) => JSXElement);
    loading?: (data: ResourceAtom<T>) => JSXElement;
    error?: (data: ResourceAtom<T>) => JSXElement;
}

/**
 *  专门为异步加载设计的状态组件
 * @example
 * import { resource, AS } from '@cn-ui/reactive';
 * const res = resource(api);
 * const App = () => (
 *     <AS resource={res} loading={() => <div>加载中</div>} error={() => <div>加载失败</div>}>
 *         <div>加载成功</div>
 *     </AS>
 * );
 */
export const AS = function <T>(props: ASProps<T>) {
    return (
        <Switch>
            <Match when={props.resource.isReady()}>{typeof props.children === 'function' ? props.children(props.resource()) : props.children}</Match>
            <Match when={props.resource.loading()}>{props.loading && props.loading(props.resource)}</Match>
            <Match when={props.resource.error()}>{props.error && props.error(props.resource)}</Match>
        </Switch>
    );
};

/** 只需要输入默认的组件即可创建异步组件 */
function createAC(Default: Pick<ASProps<unknown>, 'children' | 'error' | 'loading'>) {
    return function <T>(props: ASProps<T>) {
        return (
            <AS resource={props.resource} loading={props.loading ?? (Default.loading as any)} error={props.error ?? (Default.error as any)}>
                {props.children ?? Default.children}
            </AS>
        );
    };
}

export const DefaultAC: Pick<ASProps<unknown>, 'children' | 'error' | 'loading'> = {
    children: () => null,
    error: () => null,
    loading: () => null,
};
/** 默认异步组件 */
export function AC<T>(props: ASProps<T>) {
    return createAC(DefaultAC)(props);
}
/**
 * @zh 设置全局统一的 AC 默认 error、loading 等
 */
export const DefineAC = (DefaultACConfig: Partial<Pick<ASProps<unknown>, 'children' | 'error' | 'loading'>>) => {
    return Object.assign(DefaultAC, DefaultACConfig);
};
export type ACType = ReturnType<typeof createAC>;
