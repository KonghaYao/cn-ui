import { toCSSPx, useMapper } from '@cn-ui/reactive'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { HeaderRow } from './slot/HeaderRow'
import { Key } from '@solid-primitives/keyed'
import { Show, createMemo } from 'solid-js'

export function MagicTableHeader<T>(props: { rowAbsolute: boolean }) {
    const { table, tableWidth, width, paddingRight } = MagicTableCtx.use<MagicTableCtxType<T>>()

    return (
        <thead
            class="sticky top-0 z-10 block"
            style={{
                width: toCSSPx(props.rowAbsolute ? tableWidth() : 'fit-content')
            }}
        >
            <Show when={table.getLeftLeafColumns().length}>
                <Key by="id" each={table.getLeftHeaderGroups()}>
                    {(group, index) => {
                        return (
                            <HeaderRow
                                position={'left'}
                                absolute={true}
                                headers={group().headers}
                                level={index()}
                                isLastRow={table.getLeftHeaderGroups().length - 1 === index()}
                            ></HeaderRow>
                        )
                    }}
                </Key>
            </Show>
            <Key by="id" each={table.getCenterHeaderGroups()}>
                {(group, index) => {
                    return (
                        <HeaderRow
                            position={'center'}
                            absolute={props.rowAbsolute}
                            headers={group().headers}
                            level={index()}
                            isLastRow={table.getCenterHeaderGroups().length - 1 === index()}
                        ></HeaderRow>
                    )
                }}
            </Key>
            <Show when={table.getRightLeafColumns().length}>
                <Key by="id" each={table.getRightHeaderGroups()}>
                    {(group, index) => {
                        return (
                            <HeaderRow
                                position={'right'}
                                absolute
                                headers={group().headers}
                                level={index()}
                                isLastRow={table.getRightHeaderGroups().length - 1 === index()}
                            ></HeaderRow>
                        )
                    }}
                </Key>
            </Show>
        </thead>
    )
}
