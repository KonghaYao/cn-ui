import { ColumnDef } from '@tanstack/solid-table'

export * from './Table'
export type MagicColumnConfig<IData = unknown, IValue = unknown> = ColumnDef<IData, IValue> & {
    sticky?: 'left' | 'right'
}
