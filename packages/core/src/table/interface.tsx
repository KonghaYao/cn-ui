import type { JSX } from "solid-js";
import type { MagicTableCtxType } from "./MagicTableCtx";
import type { CellContext, ColumnDef } from "./solidTable";
import type { useTableVirtual } from "./useVirtual";

export interface MagicTableProps<T> {
    data: T[];
    columns: ColumnDef<T, unknown>[];
    height?: number | string;
    selection?: boolean | "single" | "multi";
    index?: boolean;
    estimateHeight?: number;
    expandable?: boolean;
    getSubRows?: (item: T, index: number) => T[];
    defaultCell?: <T, D>(props: CellContext<T, D>) => JSX.Element;
    expose?: (expose: MagicTableExpose<T>) => void;
    onUpdateData?: (rowIndex: number, columnId: string, value: any) => void;
    /** 自动根据外部适配大小 */
    autoSize?: boolean;
    /** 使用虚拟列表 */
    virtual?: typeof useTableVirtual;
}

export interface MagicTableExpose<T> extends MagicTableCtxType<T> {
    clearSelection: () => void;
    getSelectionRows: () => T[];
    toggleRowSelection: (index: number | string, selected?: boolean) => void;
    toggleAllSelection: (selected?: boolean) => void;
}
