import { Atom, atom, toCSSPx } from '@cn-ui/reactive'
import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { MagicTableHeader } from '../MagicTableHeader'
import { MagicTableBody } from '../MagicTableBody'
import { useScroll, watch } from 'solidjs-use'
import { MagicTableProps } from '../Table'

export function StickyView<T>(props: MagicTableProps<T>, height: Atom<number>) {
    const { tableScroll } = MagicTableCtx.use<MagicTableCtxType<T>>()
    const receiverTable = atom<HTMLElement | null>(null)
    const tbodyScroll = useScroll(receiverTable)
    watch([tableScroll.y], () => {
        tbodyScroll.setY(tableScroll.y())
    })
    watch([tbodyScroll.y], () => {
        tableScroll.setY(tbodyScroll.y())
    })
    return (
        <table
            class="cn-table-fixed-left block relative flex-none scrollbar-none"
            style={{
                overflow: 'auto',
                height: toCSSPx(props.height ?? height(), '400px')
            }}
            ref={receiverTable}
        >
            <MagicTableHeader rowAbsolute={false} position="left"></MagicTableHeader>
            <MagicTableBody rowAbsolute={false} position="left"></MagicTableBody>
        </table>
    )
}
