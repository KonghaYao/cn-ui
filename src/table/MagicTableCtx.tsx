import { createCtx } from '@cn-ui/reactive'
import { Table } from '@tanstack/solid-table'
import { useVirtual } from './useVirtual'

export type MagicTableCtxType<T = unknown> = {
    table: Table<T>
} & ReturnType<typeof useVirtual<T>>
export const MagicTableCtx = createCtx<MagicTableCtxType>()
