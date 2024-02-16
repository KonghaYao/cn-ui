// from @tanstack/solid-table
// add throttle for performance
import { throttle } from 'lodash-es'
import {
    elementScroll,
    observeElementOffset,
    observeElementRect,
    observeWindowOffset,
    observeWindowRect,
    PartialKeys,
    Virtualizer,
    VirtualizerOptions,
    windowScroll
} from './core/index'
export * from './core/index'

import { createSignal, onMount, onCleanup, createComputed, mergeProps, startTransition, batch } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { nextTick } from 'solidjs-use'

export interface CNVirtualizer<TScrollElement extends Element | Window, TItemElement extends Element> extends Virtualizer<TScrollElement, TItemElement> {
    updateView(instance: Virtualizer<TScrollElement, TItemElement>, sync: boolean): void
}

function createVirtualizerBase<TScrollElement extends Element | Window, TItemElement extends Element>(
    options: VirtualizerOptions<TScrollElement, TItemElement>
): CNVirtualizer<TScrollElement, TItemElement> {
    const resolvedOptions: VirtualizerOptions<TScrollElement, TItemElement> = mergeProps(options)

    const instance = new Virtualizer<TScrollElement, TItemElement>(resolvedOptions)

    const [virtualItems, setVirtualItems] = createStore(instance.getVirtualItems())
    const [totalSize, setTotalSize] = createSignal(instance.getTotalSize())

    const handler = {
        get(target: Virtualizer<TScrollElement, TItemElement>, prop: keyof Virtualizer<TScrollElement, TItemElement>) {
            switch (prop) {
                case 'getVirtualItems':
                    return () => virtualItems
                case 'getTotalSize':
                    return () => totalSize()
                default:
                    return Reflect.get(target, prop)
            }
        }
    }

    const virtualizer = new Proxy(instance, handler)
    virtualizer.setOptions(resolvedOptions)

    onMount(() => {
        const cleanup = virtualizer._didMount()
        virtualizer._willUpdate()
        onCleanup(cleanup)
    })

    const updateView = (instance: Virtualizer<TScrollElement, TItemElement>, sync: boolean) => {
        instance._willUpdate()
        startTransition(() => {
            setVirtualItems(
                reconcile(instance.getVirtualItems(), {
                    key: 'index'
                })
            )
        })
        setTotalSize(instance.getTotalSize())
        options.onChange?.(instance, sync)
    }

    createComputed(() => {
        virtualizer.setOptions(
            mergeProps(resolvedOptions, options, {
                // onChange: throttle(updateView, 10, {
                //     trailing: true
                // })
                onChange: updateView
            })
        )
        // 防止与 sorting 冲突导致无限循环
        nextTick(() => {
            virtualizer.measure()
        })
    })

    return { ...virtualizer, updateView } as unknown as CNVirtualizer<TScrollElement, TItemElement>
}

export function createVirtualizer<TScrollElement extends Element, TItemElement extends Element>(
    options: PartialKeys<VirtualizerOptions<TScrollElement, TItemElement>, 'observeElementRect' | 'observeElementOffset' | 'scrollToFn'>
): CNVirtualizer<TScrollElement, TItemElement> {
    return createVirtualizerBase<TScrollElement, TItemElement>(
        mergeProps(
            {
                observeElementRect: observeElementRect,
                observeElementOffset: observeElementOffset,
                scrollToFn: elementScroll
            },
            options
        )
    )
}

export function createWindowVirtualizer<TItemElement extends Element>(
    options: PartialKeys<VirtualizerOptions<Window, TItemElement>, 'getScrollElement' | 'observeElementRect' | 'observeElementOffset' | 'scrollToFn'>
): CNVirtualizer<Window, TItemElement> {
    return createVirtualizerBase<Window, TItemElement>(
        mergeProps(
            {
                getScrollElement: () => (typeof document !== 'undefined' ? window : null),
                observeElementRect: observeWindowRect,
                observeElementOffset: observeWindowOffset,
                scrollToFn: windowScroll,
                initialOffset: typeof document !== 'undefined' ? window.scrollY : undefined
            },
            options
        )
    )
}
