import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { For } from 'solid-js'
import { HeaderRow } from './slot/HeaderRow'

export function MagicTableHeader<T>() {
    const { table } = MagicTableCtx.use<MagicTableCtxType<T>>()
    return (
        <thead class="sticky top-0 z-10 block">
            <For each={table.getHeaderGroups()}>
                {(headerGroup) => {
                    return <HeaderRow headers={headerGroup.headers}></HeaderRow>
                }}
            </For>
        </thead>
    )
}
