import { atom, toCSSPx } from '@cn-ui/reactive'
import { getSortedRowModel, getCoreRowModel, createSolidTable, RowSelectionState } from '@tanstack/solid-table'
import { Table } from '@tanstack/solid-table'
import { MagicTableCtx } from './MagicTableCtx'
import { useVirtual } from './useVirtual'
import { MagicTableHeader } from './MagicTableHeader'
import { MagicTableBody } from './MagicTableBody'
import { indexConfig, selectionConfig } from './defaultConfig'
import { useScroll } from 'solidjs-use'
import { createMemo } from 'solid-js'
import { MagicColumnConfig } from '.'
import { StickyViewBody } from './sticky/StickyView'
import { useAutoResize } from './hook/useAutoResize'
export interface MagicTableProps<T> {
    data: T[]
    columns: MagicColumnConfig<T, unknown>[]
    height?: number | string
    selection?: boolean | 'single' | 'multi'
    index?: boolean
}

export function MagicTable<T>(props: MagicTableProps<T>) {
    const rowSelection = atom<RowSelectionState>({})
    const composedColumns = createMemo<MagicColumnConfig<T>[]>(() =>
        /** @ts-ignore */
        [props.selection && selectionConfig, props.index && indexConfig, ...props.columns].filter((i) => i)
    )
    const table = createSolidTable<T>({
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
    const tableBox = atom<HTMLDivElement | null>(null)
    const { width, height } = useAutoResize(tableBox)
    const tableScroll = useScroll(tableContainerRef)
    return (
        <MagicTableCtx.Provider
            value={{
                rowSelection,
                table: table as Table<unknown>,
                ...virtualSettings,
                tableScroll
            }}
        >
            <div class="relative h-full w-full" ref={tableBox}>
                <div
                    style={{
                        overflow: 'auto', //our scrollable table container
                        position: 'relative', //needed for sticky header
                        height: toCSSPx(props.height ?? height(), '400px') //should be a fixed height
                    }}
                    ref={tableContainerRef}
                >
                    <table class="border border-gray-200 " style={{ display: 'grid', 'table-layout': 'fixed' }}>
                        <MagicTableHeader table={table}></MagicTableHeader>
                        <MagicTableBody selection={!!props.selection} table={table}></MagicTableBody>
                    </table>
                </div>
                <StickyViewBody selection={!!props.selection} table={table}></StickyViewBody>
            </div>
        </MagicTableCtx.Provider>
    )
}
