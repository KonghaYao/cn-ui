import type { Atom } from "@cn-ui/reactive";
import { type Accessor, createMemo } from "solid-js";
import type { ColumnDef, Table } from "./solidTable";
import type { useSticky } from "./useSticky";
import { createVirtualizer } from "./virtual/createVirtualizer";

export function useTableVirtual<T>(
    table: Table<T>,
    tableContainerRef: Atom<HTMLDivElement | null>,
    data: {
        composedColumns: Accessor<ColumnDef<T>[]>;
        estimateHeight: Accessor<number | undefined>;
    } & ReturnType<typeof useSticky>,
) {
    const columnVirtualizer = createVirtualizer({
        get count() {
            const count = table.getCenterVisibleLeafColumns().length;
            return count;
        },
        estimateSize(index) {
            return table.getCenterVisibleLeafColumns()[index].columnDef.size ?? 100;
        },
        getScrollElement: () => tableContainerRef(),
        horizontal: true,
        overscan: 12,
        get paddingStart() {
            return data.paddingLeft();
        },
        get paddingEnd() {
            return data.paddingRight();
        },
    });

    const rowVirtualizer = createVirtualizer({
        get count() {
            return table.getCenterRows().length;
        },
        estimateSize: () => data.estimateHeight() ?? 48,
        getScrollElement: () => tableContainerRef(),
        measureElement:
            typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
                ? (element) => element?.getBoundingClientRect().height
                : undefined,
        overscan: 12,
    });
    const rows = createMemo(() => {
        return table.getRowModel().rows;
    });

    return {
        rowVirtualizer,
        columnVirtualizer,
        tableWidth() {
            return columnVirtualizer.getTotalSize();
        },
        rows,
    };
}
