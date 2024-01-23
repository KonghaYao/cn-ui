import { atom, toCSSPx } from '@cn-ui/reactive'
import { getSortedRowModel, getCoreRowModel, ColumnDef, createSolidTable } from '@tanstack/solid-table'
import { Table } from '@tanstack/solid-table'
import { MagicTableCtx } from './MagicTableCtx'
import { useVirtual } from './useVirtual'
import { MagicTableHeader } from './MagicTableHeader'
import { MagicTableBody } from './MagicTableBody'

export interface MagicTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
    height?: number | string
}

export function MagicTable<T>(props: MagicTableProps<T>) {
    const table = createSolidTable({
        get data() {
            return props.data
        },
        get columns() {
            return props.columns
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    const tableContainerRef = atom<HTMLDivElement | null>(null)
    const virtualSettings = useVirtual<T>(table, tableContainerRef, props)
    return (
        <MagicTableCtx.Provider value={{ table: table as Table<unknown>, ...virtualSettings }}>
            <div
                style={{
                    overflow: 'auto', //our scrollable table container
                    position: 'relative', //needed for sticky header
                    height: toCSSPx(props.height, '400px') //should be a fixed height
                }}
                ref={tableContainerRef}
            >
                <table class="border border-gray-200 " style={{ display: 'grid', 'table-layout': 'fixed' }}>
                    <MagicTableHeader table={table}></MagicTableHeader>
                    <MagicTableBody table={table}></MagicTableBody>
                </table>
            </div>
        </MagicTableCtx.Provider>
    )
}
