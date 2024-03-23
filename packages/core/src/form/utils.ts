import { AccessorFnColumnDef, AccessorKeyColumnDef } from '@tanstack/solid-table'
export type RootColumnDef<T, D> = AccessorFnColumnDef<T, D> | AccessorKeyColumnDef<T, D>

export const getKeyFromRootColumnDef = <T, D>(column: RootColumnDef<T, D>, row: T, index: number) => {
    if ('accessorKey' in column) {
        return column.accessorKey as string
    } else {
        return column.accessorFn(row, index) as string
    }
}
