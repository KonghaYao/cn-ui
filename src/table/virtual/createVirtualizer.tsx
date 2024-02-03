// from @tanstack/solid-table
// add throttle for performance
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
} from '@tanstack/virtual-core'
import { throttle } from './debounce'
export * from '@tanstack/virtual-core'

import { createSignal, onMount, onCleanup, createComputed, mergeProps } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'

function createVirtualizerBase<TScrollElement extends Element | Window, TItemElement extends Element>(
    options: VirtualizerOptions<TScrollElement, TItemElement> & { gridSize: () => number }
): Virtualizer<TScrollElement, TItemElement> {
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

    createComputed(() => {
        virtualizer.setOptions(
            mergeProps(resolvedOptions, options, {
                onChange: throttle(
                    (instance: Virtualizer<TScrollElement, TItemElement>, sync: boolean) => {
                        instance._willUpdate()
                        setVirtualItems(
                            reconcile(instance.getVirtualItems(), {
                                key: 'index'
                            })
                        )
                        setTotalSize(instance.getTotalSize())
                        options.onChange?.(instance, sync)
                    },
                    () => {
                        const time = Math.min(Math.ceil(options.gridSize() / 7000), 500)
                        return time
                    },
                    {
                        trailing: true
                    }
                )
            })
        )
        virtualizer.measure()
    })

    return virtualizer
}

export function createVirtualizer<TScrollElement extends Element, TItemElement extends Element>(
    options: PartialKeys<VirtualizerOptions<TScrollElement, TItemElement>, 'observeElementRect' | 'observeElementOffset' | 'scrollToFn'> & {
        gridSize: () => number
    }
): Virtualizer<TScrollElement, TItemElement> {
    return createVirtualizerBase<TScrollElement, TItemElement>(
        mergeProps(
            {
                observeElementRect: observeElementRect,
                observeElementOffset: observeElementOffset,
                scrollToFn: elementScroll,
                gridSize: options.gridSize
            },
            options
        )
    )
}

export function createWindowVirtualizer<TItemElement extends Element>(
    options: PartialKeys<VirtualizerOptions<Window, TItemElement>, 'getScrollElement' | 'observeElementRect' | 'observeElementOffset' | 'scrollToFn'> & {
        gridSize: () => number
    }
): Virtualizer<Window, TItemElement> {
    return createVirtualizerBase<Window, TItemElement>(
        mergeProps(
            {
                getScrollElement: () => (typeof document !== 'undefined' ? window : null),
                observeElementRect: observeWindowRect,
                observeElementOffset: observeWindowOffset,
                scrollToFn: windowScroll,
                initialOffset: typeof document !== 'undefined' ? window.scrollY : undefined,
                gridSize: options.gridSize
            },
            options
        )
    )
}
