import { toCSSPx } from '@cn-ui/reactive'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { BodyRow } from './slot/BodyRow'
import { Key } from '@solid-primitives/keyed'
export function MagicTableBody<T>(props: { rowAbsolute: boolean; position: 'center' | 'right' | 'left' }) {
    const { rowVirtualizer, columnVirtualizer, rowVirtualPadding } = MagicTableCtx.use<MagicTableCtxType<T>>()

    return (
        <tbody
            style={{
                display: 'block',
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: toCSSPx(props.rowAbsolute ? columnVirtualizer.getTotalSize() : 'fit-content'),
                position: 'relative'
            }}
        >
            {!props.rowAbsolute && rowVirtualPadding().start ? (
                //fake empty column to the left for virtualization scroll padding
                <td class="block w-full" style={{ height: toCSSPx(rowVirtualPadding().start) }} />
            ) : null}
            <Key by="key" each={rowVirtualizer.getVirtualItems()}>
                {(virtualRow) => {
                    return <BodyRow position={props.position} absolute={props.rowAbsolute} bindScroll={props.rowAbsolute} virtualRow={virtualRow()}></BodyRow>
                }}
            </Key>
            {!props.rowAbsolute && rowVirtualPadding().end ? (
                //fake empty column to the left for virtualization scroll padding
                <td class="block w-full" style={{ height: toCSSPx(rowVirtualPadding().end) }} />
            ) : null}
        </tbody>
    )
}
