import { toCSSPx } from '@cn-ui/reactive'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { HeaderRow } from './slot/HeaderRow'
import { Key } from '@solid-primitives/keyed'

export function MagicTableHeader<T>() {
    const { table, columnVirtualizer } = MagicTableCtx.use<MagicTableCtxType<T>>()
    return (
        <thead
            class="sticky top-0 z-10 block"
            style={{
                width: toCSSPx(columnVirtualizer.getTotalSize())
            }}
        >
            <Key by="id" each={table.getHeaderGroups()}>
                {(headerGroup, index) => {
                    return (
                        <HeaderRow
                            absolute
                            headers={headerGroup().headers}
                            level={index()}
                            isLastRow={table.getHeaderGroups().length - 1 === index()}
                        ></HeaderRow>
                    )
                }}
            </Key>
        </thead>
    )
}
