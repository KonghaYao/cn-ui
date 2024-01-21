import { Atom, atom, DefaultAC, extendsEvent, OriginComponent, OriginComponentInputType } from '@cn-ui/reactive';
import { debounce } from 'lodash-es';
import { children as getChildren, Component, createEffect, JSXElement, lazy, onMount, Suspense, Show, mergeProps } from 'solid-js';

interface LazyLoadProps<T extends Record<string, Component | any>> extends IntersectionObserverInit {
    /** 未进入 loading 态时的操作 */
    children?: JSXElement;
    load: () => Promise<T>;
    loadKey?: keyof T;
    /** 加载态 */
    loading?: Component;
    error?: Component;
    /** 是否只在第一次进行加载 */
    once?: boolean;
}

export const LazyLoad = OriginComponent(function <T extends Record<string, Component | any>>(props: OriginComponentInputType<LazyLoadProps<T>>) {
    props = mergeProps(
        {
            loading: DefaultAC.loading,
            error: DefaultAC.error,
        } as OriginComponentInputType<LazyLoadProps<T>>,
        props
    );
    const fallback = getChildren(() => props.children);
    const visible = atom(false);
    let observer: IntersectionObserver;
    const ref = atom<HTMLDivElement | null>(null);
    onMount(() => {
        if (observer) observer.disconnect();
        // 处理用户手速太快划过去的问题
        const visibleDebounce = debounce(visible, 150) as any as Atom<boolean>;
        observer = new IntersectionObserver(([entries]) => {
            visibleDebounce(entries.isIntersecting);
        }, props);
        observer.observe(ref()!);
    });
    props.once &&
        createEffect(() => {
            visible() && observer && observer.disconnect();
        });
    const item = (
        <Suspense fallback={props.loading && props.loading({})}>
            {lazy(async () => {
                try {
                    const modules = await props.load();
                    return { default: modules[props.loadKey ?? 'default'] as Component };
                } catch (e) {
                    return { default: props.error! };
                }
            })({})}
        </Suspense>
    );
    return (
        <div class={props.class()} style={props.style} {...extendsEvent(props)} ref={ref}>
            <Show when={visible()} fallback={fallback as any}>
                {item}
            </Show>
        </div>
    );
});
