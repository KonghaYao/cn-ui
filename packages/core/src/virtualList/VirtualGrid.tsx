import { type Atom, type JSXSlot, NullAtom, atom, classNames, toCSSPx } from "@cn-ui/reactive";
import { Key } from "@solid-primitives/keyed";
import { type Accessor, For, type JSXElement, Show, createMemo } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import { useAutoResize } from "../table/hook/useAutoResize";
import { createVirtualizer } from "../table/virtual/createVirtualizer";

export interface VirtualGridProps<T> {
    each: T[][];
    colSize?: number;
    reverse?: boolean;
    fallback?: JSXSlot;
    estimateHeight?: number;
    estimateWidth?: number;
    /** 标识其 Key 值的属性，为了保证渲染的高效 */
    getItemKey?: (index: number) => number | string;
    children: (
        item: T,
        index: Accessor<number>,
        context: {
            itemClass: Atom<string>;
            itemRef: Atom<HTMLDivElement | null>;
        },
    ) => JSXElement;
    transitionName?: string;
    overscan?: number;
}

export function VirtualGrid<T>(props: VirtualGridProps<T>) {
    const tableContainerRef = NullAtom<HTMLDivElement>(null);
    const virtualizer = createVirtualizer({
        get count() {
            return props.each.length;
        },
        getItemKey: props.getItemKey,
        estimateSize() {
            return props.estimateWidth ?? 24;
        },
        measureElement:
            typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
                ? (element) => element?.getBoundingClientRect().height
                : undefined,
        getScrollElement: () => tableContainerRef(),
        overscan: props.overscan ?? 3,
    });
    const colVirtualizer = createVirtualizer({
        get count() {
            return props.colSize ?? props.each[0].length;
        },
        getItemKey: props.getItemKey,
        estimateSize() {
            return props.estimateHeight ?? 24;
        },
        getScrollElement: () => tableContainerRef(),
        horizontal: true,
        get overscan() {
            return props.overscan ?? Math.min(20, Math.floor(Math.sqrt(props.each.length)));
        },
    });
    const { height, width } = useAutoResize(() => tableContainerRef()?.parentElement!);
    const CoreList = (
        <Key by="key" each={virtualizer.getVirtualItems()}>
            {(virtualRow) => {
                const itemClass = atom("");
                const itemRef = NullAtom<HTMLDivElement>(null);
                const context = { itemClass, itemRef };
                const row = createMemo((last) => props.each[virtualRow().index] ?? last);
                return (
                    <div
                        class={classNames("cn-virtual-list-item absolute w-full", itemClass())}
                        data-index={virtualRow().index} //needed for dynamic row height measurement
                        ref={(node) => {
                            itemRef(node);
                            queueMicrotask(() => {
                                colVirtualizer.measureElement(node);
                            });
                        }}
                        style={{
                            [props.reverse ? "bottom" : "top"]: `${virtualRow().start}px`,
                        }}
                    >
                        <For each={colVirtualizer.getVirtualItems()}>
                            {(item) => {
                                const child = createMemo<JSXElement>((last) => {
                                    if (row()[virtualRow().index] === undefined) return last;
                                    return props.children(
                                        row()[item.index],
                                        () => virtualRow().index,
                                        context,
                                    );
                                });
                                return (
                                    <div
                                        class="absolute"
                                        data-index={item.index}
                                        ref={(node) => {
                                            queueMicrotask(() => {
                                                colVirtualizer.measureElement(node);
                                            });
                                        }}
                                        style={{
                                            left: `${item.start}px`,
                                        }}
                                    >
                                        {child()}
                                    </div>
                                );
                            }}
                        </For>
                    </div>
                );
            }}
        </Key>
    );
    return (
        <div
            ref={tableContainerRef}
            class={classNames(
                "cn-virtual-list",
                props.reverse
                    ? "cn-virtual-list-reverse flex flex-col-reverse"
                    : "cn-virtual-list-normal",
            )}
            style={{
                overflow: "auto",
                position: "relative",
                height: toCSSPx(height(), "400px"),
                width: toCSSPx(width(), "400px"), //should be a fixed height
            }}
        >
            <div
                class="cn-virtual-list-container flex-none"
                style={{
                    width: `${colVirtualizer.getTotalSize()}px`,
                    height: `${virtualizer.getTotalSize()}px`,
                    position: "relative", //needed for absolute positioning of rows
                }}
            >
                {props.transitionName ? (
                    <TransitionGroup name={props.transitionName}>{CoreList}</TransitionGroup>
                ) : (
                    CoreList
                )}
            </div>
        </div>
    );
}
