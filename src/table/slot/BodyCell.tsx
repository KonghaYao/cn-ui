import { Cell, CellContext, flexRender } from '@tanstack/solid-table'
import { MagicTableCtx } from '../MagicTableCtx'
import { Atom, atom, createCtx, toCSSPx } from '@cn-ui/reactive'
import { onMount } from 'solid-js'
import { checkEllipsis } from '../hook/useCheckEllipsis'
export const MagicTableCellCtx = createCtx<{
    contain: Atom<HTMLElement | null>
}>()

export function BodyCell<T, D>(props: { cell: Cell<T, D> }) {
    const ctx = props.cell.getContext()
    const defaultCell = ctx.table._getDefaultColumnDef().cell
    const cell = props.cell.column.columnDef.cell
    const { estimateHeight } = MagicTableCtx.use()
    const contain = atom<HTMLElement | null>(null)
    return (
        <MagicTableCellCtx.Provider value={{ contain }}>
            <td
                class="flex"
                ref={contain}
                style={{
                    width: toCSSPx(props.cell.column.getSize()),
                    height: toCSSPx(estimateHeight(), '48px')
                }}
            >
                {flexRender(cell === defaultCell ? defaultBodyCell : cell, ctx)}
            </td>
        </MagicTableCellCtx.Provider>
    )
}

function defaultBodyCell<T>(ctx: CellContext<T, string>) {
    const cellCtx = MagicTableCellCtx.use()
    const cell = atom<HTMLElement | null>(null)
    const isEllipsis = atom(false)
    onMount(() => {
        isEllipsis(() => checkEllipsis(cell()!, cellCtx.contain()!))
    })
    return (
        // TODO: ellipsis
        <div class="w-full h-full flex-1 p-2 overflow-hidden text-ellipsis text-nowrap" ref={cell} title={isEllipsis() ? ctx.getValue() : undefined}>
            {ctx.getValue()}
        </div>
    )
}
