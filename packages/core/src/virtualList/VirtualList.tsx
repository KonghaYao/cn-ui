import {
    type Atom,
    type JSXSlot,
    NullAtom,
    OriginComponent,
    type OriginComponentInputType,
    OriginDiv,
    atom,
    classNames,
    ensureFunctionResult,
    toCSSPx,
} from "@cn-ui/reactive";
import { Key } from "@solid-primitives/keyed";
import {
    type Accessor,
    type JSXElement,
    type Setter,
    Show,
    createEffect,
    createMemo,
} from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import { useAutoResize } from "../table/hook/useAutoResize";
import { type CNVirtualizer, createVirtualizer } from "../table/virtual/createVirtualizer";
export interface VirtualListExpose {
    virtualizer: CNVirtualizer<HTMLDivElement, Element>;
}
export interface VirtualListProps<T> {
    /**
     * 需要渲染的数组
     * @tested
     */
    each: T[];
    /**
     * 翻转渲染方向。比如原来从上至下，现在从下至上渲染。
     * @tested
     */
    reverse?: boolean;
    /**
     * 当没有数据时的渲染
     */
    fallback?: JSXSlot;
    /**
     * 预估每一项的高度
     * @tested
     */
    estimateSize?: number;
    /**
     * 覆盖自动计算的容器高度
     */
    containerHeight?: number;
    /**
     * 是否是横向滚动
     * @tested
     */
    horizontal?: boolean;
    /** 标识其 Key 值的属性，为了保证渲染的高效 */
    getItemKey?: (index: number) => number | string;
    /**
     * 每一项的渲染组件
     * @tested
     */
    children: (
        item: T,
        index: Accessor<number>,
        context: {
            itemClass: Atom<string>;
            itemRef: Atom<HTMLDivElement | null>;
        },
    ) => JSXElement;
    /** transition 动画需要的样式 */
    transitionName?: string;
    /**
     * 视图之外预先渲染的数据量
     * @tested
     */
    overscan?: number;
    /**
     * 暴露一些内部方法
     * @tested
     */
    expose?: Setter<VirtualListExpose>;
    /**
     * @dev
     */
    onVirtualScrollEnd?: () => void;
}

export const VirtualList = OriginComponent(function <T>(
    props: OriginComponentInputType<VirtualListProps<T>, HTMLDivElement, unknown>,
) {
    const tableContainerRef = NullAtom<HTMLDivElement>(null);
    const virtualizer = createVirtualizer({
        get count() {
            return props.each.length;
        },
        getItemKey: props.getItemKey,
        estimateSize() {
            return props.estimateSize ?? 24;
        },
        getScrollElement: () => tableContainerRef(),
        get horizontal() {
            return !!props.horizontal;
        },
        get overscan() {
            return props.overscan ?? Math.min(20, Math.floor(Math.sqrt(props.each.length)));
        },
    });
    props.expose?.({ virtualizer });
    const { height, width } = useAutoResize(() => tableContainerRef());

    const CoreList = () => {
        return (
            <Key
                by="key"
                each={virtualizer.getVirtualItems()}
                fallback={ensureFunctionResult(props.fallback)}
            >
                {(virtualRow) => {
                    const itemClass = atom("");
                    const itemRef = NullAtom<HTMLDivElement>(null);
                    const context = { itemClass, itemRef };

                    /** 当数据错位时，将使用上次的数据定位 */
                    const child = createMemo<JSXElement>((last) => {
                        if (props.each[virtualRow().index] === undefined) return last;
                        return props.children(
                            props.each[virtualRow().index],
                            () => virtualRow().index,
                            context,
                        );
                    });
                    return (
                        <div
                            class={classNames(
                                "cn-virtual-list-item absolute ",
                                props.horizontal ? "h-full" : "w-full",
                                itemClass(),
                            )}
                            data-index={virtualRow().index} //needed for dynamic row height measurement
                            ref={(node) => {
                                itemRef(node);
                                queueMicrotask(() => virtualizer.measureElement(node));
                            }}
                            style={{
                                [props.horizontal
                                    ? props.reverse
                                        ? "right"
                                        : "left"
                                    : props.reverse
                                      ? "bottom"
                                      : "top"]: `${virtualRow().start}px`,
                            }}
                        >
                            {child()}
                        </div>
                    );
                }}
            </Key>
        );
    };
    return (
        <OriginDiv
            prop={props}
            ref={tableContainerRef}
            class={classNames(
                "cn-virtual-list overflow-auto relative",
                props.horizontal ? "h-full" : "w-full",
                props.reverse
                    ? `cn-virtual-list-reverse flex ${
                          props.horizontal ? "flex-row-reverse" : "flex-col-reverse"
                      }`
                    : "cn-virtual-list-normal",
                props.horizontal,
            )}
            data-height={height()}
            style={{
                width: props.horizontal ? toCSSPx(width(), "400px") : "auto",
                height: props.horizontal
                    ? "auto"
                    : toCSSPx(props.containerHeight ?? height(), "400px"),
            }}
        >
            <div
                class="cn-virtual-list-container flex-none relative"
                style={{
                    width: props.horizontal ? `${virtualizer.getTotalSize()}px` : "100%",
                    height: props.horizontal ? "100%" : `${virtualizer.getTotalSize()}px`,
                }}
            >
                {props.transitionName ? (
                    <TransitionGroup name={props.transitionName}>
                        <CoreList></CoreList>
                    </TransitionGroup>
                ) : (
                    <CoreList></CoreList>
                )}
            </div>
        </OriginDiv>
    );
});
