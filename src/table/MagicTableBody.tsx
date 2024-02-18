import { toCSSPx } from '@cn-ui/reactive'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { BodyRow } from './slot/BodyRow'
import { Key } from '@solid-primitives/keyed'
export function MagicTableBody<T>(props: { rowAbsolute: boolean }) {
    const { rowVirtualizer, tableWidth } = MagicTableCtx.use<MagicTableCtxType<T>>()

    return (
        <tbody
            style={{
                display: 'block',
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: toCSSPx(props.rowAbsolute ? tableWidth() : 'fit-content'),
                position: 'relative'
            }}
        >
            <Key by="key" each={rowVirtualizer.getVirtualItems()}>
                {(virtualRow) => {
                    return <BodyRow absolute={props.rowAbsolute} bindScroll={props.rowAbsolute} virtualRow={virtualRow()}></BodyRow>
                }}
            </Key>
        </tbody>
    )
}
