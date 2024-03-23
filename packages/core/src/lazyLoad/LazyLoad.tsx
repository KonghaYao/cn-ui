import {  atom, DefaultAC, OriginDiv, OriginComponent, OriginComponentInputType } from '@cn-ui/reactive'
import { debounce } from 'lodash-es'
import { children as getChildren, Component, createEffect, JSXElement, lazy, onMount, Suspense, Show, mergeProps } from 'solid-js'
import { ensureFunctionResult } from '@cn-ui/reactive/src/utils/ensureFunctionResult'

interface LazyLoadProps<T extends Record<string, Component | any>> extends IntersectionObserverInit {
    /** 未进入 loading 态时的操作 */
    children?: JSXElement
    load: () => Promise<T>
    loadKey?: keyof T
    /** 加载态 */
    loading?: Component
    error?: Component
    /** 是否只在第一次进行加载 */
    loadOnce?: boolean
    debounceTime?: number
}

export const LazyLoad = OriginComponent(function <T extends Record<string, Component | any>>(props: OriginComponentInputType<LazyLoadProps<T>>) {
    props = mergeProps(
        {
            loading: DefaultAC.loading,
            error: DefaultAC.error
        } as OriginComponentInputType<LazyLoadProps<T>>,
        props
    )
    const fallback = props.children ? getChildren(() => props.children) : ensureFunctionResult(DefaultAC.fallback) ?? ensureFunctionResult(DefaultAC.children)
    const visible = atom(false)
    let observer: IntersectionObserver
    const ref = atom<HTMLDivElement | null>(null)
    onMount(() => {
        if (observer) observer.disconnect()
        // 处理用户手速太快划过去的问题
        const visibleDebounce = debounce(visible, props.debounceTime ?? 150, { leading: false })
        observer = new IntersectionObserver(([entries]) => {
            visibleDebounce(entries.isIntersecting)
        }, props)
        observer.observe(ref()!)
    })
    // 第一次见到的时候，删除监听，则不会再次触发
    props.loadOnce &&
        createEffect(() => {
            visible() && observer && observer.disconnect()
        })
    const item = (
        <Suspense fallback={props.loading && props.loading({})}>
            {lazy(async () => {
                try {
                    const modules = await props.load()
                    return { default: modules[props.loadKey ?? 'default'] as Component }
                } catch (e) {
                    return { default: props.error! }
                }
            })({})}
        </Suspense>
    )
    return (
        <OriginDiv prop={props} ref={ref}>
            <Show when={visible()} fallback={fallback as any}>
                {item}
            </Show>
        </OriginDiv>
    )
})
