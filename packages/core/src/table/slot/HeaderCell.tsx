import { classHelper, classNames, toCSSPx } from "@cn-ui/reactive";
import { AiOutlineSwapRight } from "solid-icons/ai";
import { Show, createMemo } from "solid-js";
import { MagicTableCtx } from "../MagicTableCtx";
import { type Header, flexRender } from "../solidTable";
import type { VirtualItem } from "../virtual";
import { getCommonPinningStyles } from "./getCommonPinningStyles";

export function HeaderCell<T, D>(props: {
    paddingLeft: number;
    absolute: boolean;
    header: Header<T, D>;
    item: VirtualItem;
    level?: number;
    useHeaderStart?: boolean;
}) {
    const { estimateHeight, table, paddingLeft } = MagicTableCtx.use();
    const header = createMemo(() => props.header);
    const column = createMemo(() => header().column);
    return (
        <th
            class={classHelper.base(
                "pointer-events-auto block bg-gray-100 py-2 text-sm border-b border-r border-solid border-gray-300/80 ",
            )(
                column().getIsPinned() && "sticky",
                props.absolute !== false && "absolute",
                "relative",
            )}
            style={{
                width: toCSSPx(header().getSize()),
                height: toCSSPx(estimateHeight(), "48px"),
                left: !props.absolute
                    ? "relative"
                    : props.useHeaderStart
                      ? toCSSPx(props.paddingLeft + header().getStart() + paddingLeft())
                      : toCSSPx(props.paddingLeft + props.item.start),
                ...getCommonPinningStyles(column(), props.paddingLeft, true),
            }}
        >
            <div class={column().getCanSort() ? " select-none" : " "}>
                <Show when={!header().isPlaceholder}>
                    {flexRender(column().columnDef.header, header().getContext())}
                </Show>
            </div>
            {/* 拖动设置宽度 */}
            <Show when={column().getCanResize()}>
                <div
                    ondblclick={() => header().column.resetSize()}
                    onMouseDown={header().getResizeHandler()}
                    onTouchStart={header().getResizeHandler()}
                    class={classNames(
                        "absolute top-0 right-0 h-full hover:w-1 transition-colors hover:bg-primary-600 select-none touch-none cursor-col-resize",
                        header().column.getIsResizing()
                            ? "cn-table-header-is-resizing bg-primary-600 w-1 z-10"
                            : " bg-transparent w-px",
                    )}
                    style={{
                        transform: header().column.getIsResizing()
                            ? `translateX(${
                                  (table.options.columnResizeDirection === "rtl" ? -1 : 1) *
                                  (table.getState().columnSizingInfo.deltaOffset ?? 0)
                              }px)`
                            : "",
                    }}
                />
            </Show>
            {/*  排序 */}
            <Show when={!header().isPlaceholder && column().getCanSort()}>
                <SortingStateIcon
                    state={column().getIsSorted()}
                    onClick={column().getToggleSortingHandler()}
                />
            </Show>
        </th>
    );
}

export const SortingStateIcon = (props: {
    state: "asc" | "desc" | false;
    onClick?: (event: unknown) => void;
}) => {
    return (
        <div
            class="absolute justify-center right-1 top-0 h-full w-4 flex flex-col cursor-pointer w-4 h-4"
            onClick={props.onClick}
        >
            {/* TODO Fallback 情况 */}
            <AiOutlineSwapRight
                class={classNames(
                    props.state ? "fill-primary-600" : "fill-gray-500",
                    props.state === "asc" ? "rotate-90" : "-rotate-90",
                )}
                style={{
                    scale: props.state === "asc" ? "" : "-1 1",
                }}
                size={16}
            />
        </div>
    );
};
