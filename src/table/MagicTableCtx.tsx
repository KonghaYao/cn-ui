import { Atom, createCtx } from '@cn-ui/reactive'
import { CellContext, RowSelectionState, Table } from '@tanstack/solid-table'
import { useVirtual } from './useVirtual'
import { useScroll } from 'solidjs-use'
import { Accessor } from 'solid-js'
import { MagicTableProps } from '.'
import { JSX } from 'solid-js'
export type MagicTableCtxType<T = unknown> = {
    table: Table<T>
    rowSelection: Atom<RowSelectionState>
    tableScroll: ReturnType<typeof useScroll>
    selection: Accessor<MagicTableProps<T>['selection']>
    estimateHeight: Accessor<number | undefined>
    width: Accessor<number>
    defaultCell?: <T, D>(props: CellContext<T, D>) => JSX.Element
} & ReturnType<typeof useVirtual<T>>

export const MagicTableCtx = createCtx<MagicTableCtxType>()
