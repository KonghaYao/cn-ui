import { atom, toCSSPx } from '@cn-ui/reactive'
import { getSortedRowModel, getCoreRowModel, createSolidTable, RowSelectionState, SortingState, ColumnOrderState } from '@tanstack/solid-table'
import { Table } from '@tanstack/solid-table'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { useVirtual } from './useVirtual'
import { MagicTableHeader } from './MagicTableHeader'
import { MagicTableBody } from './MagicTableBody'
import { indexConfig, selectionConfig } from './defaultConfig'
import { useScroll } from 'solidjs-use'
import { createMemo, createSignal } from 'solid-js'
import { MagicColumnConfig } from '.'
import { StickyViewBody } from './sticky/StickyView'
import { useAutoResize } from './hook/useAutoResize'
export interface MagicTableProps<T> {
    data: T[]
    columns: MagicColumnConfig<T, unknown>[]
    height?: number | string
    selection?: boolean | 'single' | 'multi'
    index?: boolean
    estimateHeight?: number
    expose?: (expose: MagicTableExpose<T>) => void
}

export interface MagicTableExpose<T> extends MagicTableCtxType<T> {
    clearSelection: () => void
    getSelectionRows: () => T[]
    toggleRowSelection: (index: number | string, selected?: boolean) => void
    toggleAllSelection: (selected?: boolean) => void
    // setCurrentRow: (row: T) => void
    // clearSort: () => void
    // clearFilter: (columnKeys?: string[]) => void
    // sort: (prop: string, order: 'ascend' | 'descend') => void
    // scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void
    // setScrollTop: (top: number) => void
    // setScrollLeft: (left: number) => void
}

export function MagicTable<T>(props: MagicTableProps<T>) {
    const rowSelection = atom<RowSelectionState>({})
    const [sorting, setSorting] = createSignal<SortingState>([])
    const [columnVisibility, setColumnVisibility] = createSignal({})
    const [columnOrder, setColumnOrder] = createSignal<ColumnOrderState>([])
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
            },
            get sorting() {
                return sorting()
            },
            get columnVisibility() {
                return columnVisibility()
            },
            get columnOrder() {
                return columnOrder()
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        enableRowSelection: true,
        onRowSelectionChange: (updateOrValue) => {
            rowSelection((selection) => (typeof updateOrValue === 'function' ? updateOrValue(selection) : updateOrValue))
        },
        onSortingChange: setSorting,
        debugTable: true
    })

    const tableContainerRef = atom<HTMLDivElement | null>(null)
    const virtualSettings = useVirtual<T>(table, tableContainerRef, { composedColumns, estimateHeight: () => props.estimateHeight })
    const tableBox = atom<HTMLDivElement | null>(null)
    const { height } = useAutoResize(tableBox)
    const tableScroll = useScroll(tableContainerRef)

    const context: MagicTableCtxType<T> = {
        rowSelection,
        table: table,
        ...virtualSettings,
        tableScroll,
        selection: () => props.selection,
        estimateHeight: () => props.estimateHeight
    }
    const expose: MagicTableExpose<T> = {
        ...context,
        clearSelection() {
            table.resetRowSelection()
        },
        getSelectionRows() {
            return table.getFilteredSelectedRowModel().rows.map((i) => i.original)
        },
        toggleAllSelection(selected) {
            table.toggleAllRowsSelected(selected)
        },
        toggleRowSelection(row, selected) {
            table.setRowSelection((selectedObj) => {
                selectedObj[row.toString()] = selected ?? !selectedObj[row.toString()]
                return selectedObj
            })
        }
    }
    props.expose?.(expose)
    return (
        <MagicTableCtx.Provider value={context as unknown as MagicTableCtxType}>
            <div class="relative h-full w-full" ref={tableBox}>
                <table
                    style={{
                        display: 'block',
                        overflow: 'auto', //our scrollable table container
                        position: 'relative', //needed for sticky header
                        height: toCSSPx(props.height ?? height(), '400px') //should be a fixed height
                    }}
                    ref={tableContainerRef}
                >
                    <MagicTableHeader></MagicTableHeader>
                    <MagicTableBody></MagicTableBody>
                </table>
                <StickyViewBody></StickyViewBody>
            </div>
        </MagicTableCtx.Provider>
    )
}
