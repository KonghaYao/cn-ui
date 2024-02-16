import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { BodyRow } from './slot/BodyRow'
import { Key } from '@solid-primitives/keyed'
export function MagicTableBody<T>() {
    const { rowVirtualizer, columnVirtualizer } = MagicTableCtx.use<MagicTableCtxType<T>>()

    return (
        <tbody
            style={{
                display: 'block',
                height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                width: `${columnVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                position: 'relative' //needed for absolute positioning of rows
            }}
        >
            <Key by="key" each={rowVirtualizer.getVirtualItems()}>
                {(virtualRow) => {
                    return <BodyRow virtualRow={virtualRow()}></BodyRow>
                }}
            </Key>
        </tbody>
    )
}
