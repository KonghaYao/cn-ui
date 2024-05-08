import { createMemo } from "solid-js";
import type { Table } from "./solidTable";

export function useSticky<T>(table: Table<T>) {
    const paddingLeft = createMemo(() => {
        const last = table.getLeftLeafColumns().at(-1);
        if (!last) return 0;
        return last.getSize() + last.getStart("left");
    });
    const paddingRight = createMemo(() => {
        const last = table.getRightLeafColumns().at(-1);
        if (!last) return 0;
        return last.getSize() + last.getStart("right");
    });
    // 添加初始化 fixed 特性
    table.getLeafHeaders().forEach((i) => {
        const position = i.column.columnDef.fixed;
        if (position) i.column.pin(position);
    });
    return {
        paddingLeft,
        paddingRight,
    };
}
