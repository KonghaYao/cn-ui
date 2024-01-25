import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { For } from 'solid-js'
import { HeaderCell } from './slot/HeaderCell'

export function MagicTableHeader<T>() {
    const { virtualPadding, virtualColumnsIndex, table } = MagicTableCtx.use<MagicTableCtxType<T>>()
    return (
        <thead
            style={{
                display: 'grid',
                position: 'sticky',
                top: 0,
                'z-index': 1
            }}
        >
            <For each={table.getHeaderGroups()}>
                {(headerGroup) => {
                    const headers = headerGroup.headers
                    return (
                        <tr style={{ display: 'flex', width: '100%' }}>
                            {virtualPadding().left ? (
                                //fake empty column to the left for virtualization scroll padding
                                <th style={{ display: 'flex', width: virtualPadding().left + 'px' }} />
                            ) : null}
                            <For each={virtualColumnsIndex()}>
                                {(index) => {
                                    const header = headers[index]
                                    return <HeaderCell header={header}></HeaderCell>
                                }}
                            </For>

                            {virtualPadding().right ? (
                                //fake empty column to the right for virtualization scroll padding
                                <th style={{ display: 'flex', width: virtualPadding().right + 'px' }} />
                            ) : null}
                        </tr>
                    )
                }}
            </For>
        </thead>
    )
}
