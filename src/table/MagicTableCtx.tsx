import { Atom, createCtx } from '@cn-ui/reactive'
import { RowSelectionState, Table } from '@tanstack/solid-table'
import { useVirtual } from './useVirtual'
import { useScroll } from 'solidjs-use'
import { Accessor } from 'solid-js'
import { MagicTableProps } from '.'

export type MagicTableCtxType<T = unknown> = {
    table: Table<T>
    rowSelection: Atom<RowSelectionState>
    tableScroll: ReturnType<typeof useScroll>
    selection: Accessor<MagicTableProps<T>['selection']>
    estimateHeight: Accessor<number | undefined>
    width: Accessor<number>
} & ReturnType<typeof useVirtual<T>>

export const MagicTableCtx = createCtx<MagicTableCtxType>()
