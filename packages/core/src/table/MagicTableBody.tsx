import { toCSSPx } from "@cn-ui/reactive";
import { Key } from "@solid-primitives/keyed";
import { createMemo } from "solid-js";
import { MagicTableCtx, type MagicTableCtxType, MagicVirtualTableCtx } from "./MagicTableCtx";
import { BodyRow } from "./slot/BodyRow";
import type { Row } from "./solidTable";
import type { VirtualItem } from "./virtual";
export function MagicTableBody<T>(props: { rowAbsolute: boolean }) {
    const vTable = MagicVirtualTableCtx.use();
    const { table } = MagicTableCtx.use<MagicTableCtxType<T>>();
    const renderingRows = createMemo<(VirtualItem | Row<unknown>)[]>(() =>
        props.rowAbsolute
            ? vTable.rowVirtualizer.getVirtualItems()
            : (table.getCenterRows() as Row<unknown>[]),
    );
    return (
        <tbody
            class="block relative border-x border-gray-200"
            style={
                props.rowAbsolute
                    ? {
                          height: `${vTable.rowVirtualizer.getTotalSize()}px`,
                          width: toCSSPx(props.rowAbsolute ? vTable.tableWidth() : "fit-content"),
                      }
                    : undefined
            }
        >
            <Key by={(i) => (i as any).key ?? (i as Row<unknown>).id} each={renderingRows()}>
                {(virtualRow) => {
                    return (
                        <BodyRow
                            absolute={props.rowAbsolute}
                            bindScroll={props.rowAbsolute}
                            virtualRow={virtualRow()}
                        />
                    );
                }}
            </Key>
        </tbody>
    );
}
