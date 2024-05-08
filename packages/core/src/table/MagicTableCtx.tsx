import { type Atom, createCtx } from "@cn-ui/reactive";
import type { Accessor } from "solid-js";
import type { JSX } from "solid-js";
import type { useScroll } from "solidjs-use";
import type { MagicTableProps } from "./interface";
import type { CellContext, RowSelectionState, Table } from "./solidTable";
import type { useStaticTableDefine } from "./useStaticTableDefine";
import type { useSticky } from "./useSticky";
import type { useTableVirtual } from "./useVirtual";

export interface MagicTableCtxType<T = unknown>
    extends ReturnType<typeof useSticky>,
        ReturnType<typeof useStaticTableDefine<T>> {
    tableProps: MagicTableProps<T>;
    table: Table<T>;
    rowSelection: Atom<RowSelectionState>;
    tableScroll: ReturnType<typeof useScroll>;
    selection: Accessor<MagicTableProps<T>["selection"]>;
    estimateHeight: Accessor<number | undefined>;
    width: Accessor<number>;
    defaultCell?: <T, D>(props: CellContext<T, D>) => JSX.Element;
}

export const MagicTableCtx = /* @__PURE__ */ createCtx<MagicTableCtxType>();

export const MagicVirtualTableCtx = /* @__PURE__ */ createCtx<
    ReturnType<typeof useTableVirtual<unknown>>
>(undefined, true);
