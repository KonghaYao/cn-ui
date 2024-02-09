import { createVirtualizer } from '../table/virtual/createVirtualizer'
import { Atom, JSXSlot, NullAtom, atom, classNames, ensureFunctionResult, toCSSPx } from '@cn-ui/reactive'
import { Accessor, JSXElement, Show } from 'solid-js'
import { useAutoResize } from '../table/hook/useAutoResize'
import { Key } from '@solid-primitives/keyed'
interface VirtualListProps<T> {
    each: T[]
    fallback?: JSXSlot
    estimateSize?: number
    containerHeight?: number
    horizontal?: boolean
    /** 标识其 Key 值的属性，为了保证渲染的高效 */
    getItemKey?: (index: number) => number | string
    children: (
        item: T,
        index: Accessor<number>,
        context: {
            itemClass: Atom<string>
            itemRef: Atom<HTMLDivElement | null>
        }
    ) => JSXElement
}

export function VirtualList<T>(props: VirtualListProps<T>) {
    const tableContainerRef = NullAtom<HTMLDivElement>(null)
    const virtualizer = createVirtualizer({
        get count() {
            return props.each.length
        },
        getItemKey: props.getItemKey,
        estimateSize(index) {
            return props.estimateSize ?? 24
        }, //average column width in pixels
        getScrollElement: () => tableContainerRef(),
        get horizontal() {
            return !!props.horizontal
        },
        overscan: 12,
        gridSize: () => props.each.length
    })
    const { height } = useAutoResize(() => tableContainerRef()?.parentElement!)
    return (
        <div
            ref={tableContainerRef}
            class="cn-virtual-list"
            style={{
                width: '100%',
                'overflow-x': 'hidden', //our scrollable table container
                'overflow-y': 'auto', //our scrollable table container
                position: 'relative', //needed for sticky header
                height: toCSSPx(height() || props.containerHeight, '400px') //should be a fixed height
            }}
        >
            <div
                class="cn-virtual-list-container"
                style={{
                    height: `${virtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                    position: 'relative' //needed for absolute positioning of rows
                }}
            >
                <Key by="key" each={virtualizer.getVirtualItems()} fallback={ensureFunctionResult(props.fallback)}>
                    {(virtualRow) => {
                        const itemClass = atom('')
                        const itemRef = NullAtom<HTMLDivElement>(null)
                        const context = { itemClass, itemRef }
                        return (
                            <div
                                class={classNames('cn-virtual-list-item absolute w-full duration-300 transition-colors', itemClass())}
                                data-index={virtualRow().index} //needed for dynamic row height measurement
                                ref={(node) => {
                                    itemRef(node)
                                    queueMicrotask(() => virtualizer.measureElement(node))
                                }}
                                style={{
                                    transform: `translateY(${virtualRow().start}px)`
                                }}
                            >
                                <Show when={props.each[virtualRow().index]}>
                                    {props.children(props.each[virtualRow().index], () => virtualRow().index, context)}
                                </Show>
                            </div>
                        )
                    }}
                </Key>
            </div>
        </div>
    )
}
