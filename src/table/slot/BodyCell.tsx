import { Cell, CellContext, flexRender } from '@tanstack/solid-table'
import { MagicTableCtx } from '../MagicTableCtx'
import { Atom, atom, classNames, createCtx, toCSSPx } from '@cn-ui/reactive'
import { createMemo, onMount } from 'solid-js'
import { checkEllipsis } from '../hook/useCheckEllipsis'
import { VirtualItem } from '@tanstack/solid-virtual'
export const MagicTableCellCtx = createCtx<{
    contain: Atom<HTMLElement | null>
}>()

export function BodyCell<T, D>(props: { absolute?: boolean; cell: Cell<T, D>; item: VirtualItem }) {
    const { estimateHeight, columnVirtualizer } = MagicTableCtx.use()
    const ctx = createMemo(() => props.cell.getContext())
    const defaultCell = createMemo(() => ctx().table._getDefaultColumnDef().cell)
    const cell = createMemo(() => props.cell.column.columnDef.cell)
    const contain = atom<HTMLElement | null>(null)
    return (
        <MagicTableCellCtx.Provider value={{ contain }}>
            <td
                class={classNames(props.absolute !== false && 'absolute', 'block')}
                data-index={props.item.index}
                ref={(el) => {
                    contain(el)
                    queueMicrotask(() => columnVirtualizer.measureElement(el))
                }}
                style={{
                    width: toCSSPx(props.cell.column.getSize()),
                    height: toCSSPx(estimateHeight(), '48px'),
                    left: toCSSPx(props.item.start)
                }}
            >
                {flexRender(cell() === defaultCell() ? defaultBodyCell : cell(), ctx())}
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
