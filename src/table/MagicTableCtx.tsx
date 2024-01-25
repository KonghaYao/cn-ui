import { Atom, createCtx } from '@cn-ui/reactive'
import { RowSelectionState, Table } from '@tanstack/solid-table'
import { useVirtual } from './useVirtual'
import { useScroll } from 'solidjs-use'

export type MagicTableCtxType<T = unknown> = {
    table: Table<T>
    rowSelection: Atom<RowSelectionState>
    tableScroll: ReturnType<typeof useScroll>
} & ReturnType<typeof useVirtual<T>>

export const MagicTableCtx = createCtx<MagicTableCtxType>()
