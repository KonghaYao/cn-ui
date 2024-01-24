import { atom, toCSSPx } from '@cn-ui/reactive'
import { getSortedRowModel, getCoreRowModel, ColumnDef, createSolidTable, RowSelectionState } from '@tanstack/solid-table'
import { Table } from '@tanstack/solid-table'
import { MagicTableCtx } from './MagicTableCtx'
import { useVirtual } from './useVirtual'
import { MagicTableHeader } from './MagicTableHeader'
import { MagicTableBody } from './MagicTableBody'
import { selectionConfig } from './defaultConfig'
import { useResizeObserver } from 'solidjs-use'
import { createMemo } from 'solid-js'
export interface MagicTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
    height?: number | string
}

export function MagicTable<T>(props: MagicTableProps<T>) {
    const rowSelection = atom<RowSelectionState>({})
    const composedColumns = createMemo(() => [selectionConfig, ...props.columns])
    const table = createSolidTable({
        get data() {
            return props.data
        },
        get columns() {
            return composedColumns()
        },
        state: {
            get rowSelection() {
                return rowSelection()
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableRowSelection: true,
        onRowSelectionChange: (updateOrValue) => {
            rowSelection((selection) => (typeof updateOrValue === 'function' ? updateOrValue(selection) : updateOrValue))
        }
    })

    const tableContainerRef = atom<HTMLDivElement | null>(null)
    const virtualSettings = useVirtual<T>(table, tableContainerRef, { composedColumns })
    const boxHeight = atom(400)

    useResizeObserver(tableContainerRef, (entries) => {
        const [entry] = entries
        const { width, height } = entry.contentRect
        boxHeight(height)
    })
    return (
        <MagicTableCtx.Provider
            value={{
                rowSelection,
                table: table as Table<unknown>,
                ...virtualSettings
            }}
        >
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
