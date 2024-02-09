import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { For } from 'solid-js'
import { BodyRow } from './slot/BodyRow'

export function MagicTableBody<T>() {
    const { rowVirtualizer, virtualRows } = MagicTableCtx.use<MagicTableCtxType<T>>()

    return (
        <tbody
            style={{
                display: 'grid',
                height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                position: 'relative' //needed for absolute positioning of rows
            }}
        >
            <For each={virtualRows()}>
                {(virtualRow) => {
                    return <BodyRow padding virtualRow={virtualRow}></BodyRow>
                }}
            </For>
        </tbody>
    )
}
