import { atom, toCSSPx, useEffect } from '@cn-ui/reactive'
import {
    getSortedRowModel,
    getCoreRowModel,
    createSolidTable,
    RowSelectionState,
    SortingState,
    ColumnOrderState,
    OnChangeFn,
    ColumnSizingState,
    VisibilityState,
    getExpandedRowModel,
    ExpandedState
} from '@tanstack/solid-table'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { useVirtual } from './useVirtual'
import { MagicTableHeader } from './MagicTableHeader'
import { MagicTableBody } from './MagicTableBody'
import { expandingConfig, indexConfig, selectionConfig } from './defaultConfig'
import { useScroll } from 'solidjs-use'
import { createMemo, createSignal } from 'solid-js'
import { MagicColumnConfig } from '.'
import { useAutoResize } from './hook/useAutoResize'
export interface MagicTableProps<T> {
    data: T[]
    columns: MagicColumnConfig<T, unknown>[]
    height?: number | string
    selection?: boolean | 'single' | 'multi'
    index?: boolean
    estimateHeight?: number
    expandable?: boolean
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
function createStateLinker<T>(init: T) {
    const state = atom(init)
    return [
        state,
        function (updateOrValue) {
            state((selection) => (typeof updateOrValue === 'function' ? (updateOrValue as (a: T) => T)(selection) : updateOrValue))
        } as OnChangeFn<T>
    ] as const
}
export function MagicTable<T>(props: MagicTableProps<T>) {
    const [rowSelection, onRowSelectionChange] = createStateLinker<RowSelectionState>({})
    const [sorting, onSortingChange] = createStateLinker<SortingState>([])
    const [columnVisibility, onColumnVisibilityChange] = createStateLinker<VisibilityState>({})
    const [columnSizing, onColumnSizingChange] = createStateLinker<ColumnSizingState>({})
    const [expanded, onExpandedChange] = createStateLinker<ExpandedState>({})
    const [columnOrder, onColumnOrderChange] = createStateLinker<ColumnOrderState>([])
    const composedColumns = createMemo<MagicColumnConfig<T>[]>(() =>
        /** @ts-ignore */
        [props.selection && selectionConfig, props.index && indexConfig, props.expandable && expandingConfig, ...props.columns].filter((i) => i)
    )

    const table = createSolidTable<T>({
        get data() {
            return props.data
        },
        get columns() {
            return composedColumns()
        },
        state: {
            get columnSizing() {
                return columnSizing()
            },
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
            },
            get expanded() {
                return expanded()
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),

        onColumnSizingChange,
        columnResizeMode: 'onEnd',
        columnResizeDirection: 'ltr',

        onExpandedChange,
        getSubRows: (row) => row.subRows,
        onColumnVisibilityChange,
        onColumnOrderChange,
        enableExpanding: !!props.expandable,
        enableRowSelection: !!props.selection,
        onRowSelectionChange,
        onSortingChange,
        debugTable: true
    })

    const tableContainerRef = atom<HTMLDivElement | null>(null)
    const virtualSettings = useVirtual<T>(table, tableContainerRef, { composedColumns, estimateHeight: () => props.estimateHeight })
    const tableBox = atom<HTMLDivElement | null>(null)
    const { height, width } = useAutoResize(tableBox)
    const tableScroll = useScroll(tableContainerRef)

    const context: MagicTableCtxType<T> = {
        rowSelection,
        table,
        width,
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
            <div class="relative flex h-full w-full" ref={tableBox}>
                <table
                    style={{
                        display: 'block',
                        overflow: 'auto',
                        position: 'relative',
                        width: toCSSPx(width(), '400px'),
                        height: toCSSPx(props.height ?? height(), '400px')
                    }}
                    ref={tableContainerRef}
                >
                    <MagicTableHeader rowAbsolute></MagicTableHeader>
                    <MagicTableBody rowAbsolute></MagicTableBody>
                </table>
            </div>
        </MagicTableCtx.Provider>
    )
}
