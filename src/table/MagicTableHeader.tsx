import { toCSSPx, useMapper } from '@cn-ui/reactive'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { HeaderRow } from './slot/HeaderRow'
import { Key } from '@solid-primitives/keyed'
import { createMemo } from 'solid-js'

export function MagicTableHeader<T>(props: { rowAbsolute: boolean; position: 'center' | 'left' | 'right' }) {
    const { table, columnVirtualizer } = MagicTableCtx.use<MagicTableCtxType<T>>()
    const headerGroups = createMemo(() => {
        switch (props.position) {
            case 'center':
                return table.getCenterHeaderGroups()
            case 'left':
                return table.getLeftHeaderGroups()
            case 'right':
                return table.getRightHeaderGroups()
            default:
                return table.getHeaderGroups()
        }
    })
    return (
        <thead
            class="sticky top-0 z-10 block"
            style={{
                width: toCSSPx(props.rowAbsolute ? columnVirtualizer.getTotalSize() : 'fit-content')
            }}
        >
            <Key by="id" each={headerGroups()}>
                {(group, index) => {
                    return (
                        <HeaderRow
                            position={props.position}
                            absolute={props.rowAbsolute}
                            headers={group().headers}
                            level={index()}
                            isLastRow={headerGroups().length - 1 === index()}
                        ></HeaderRow>
                    )
                }}
            </Key>
        </thead>
    )
}
