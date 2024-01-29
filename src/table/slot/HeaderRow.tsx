import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { For } from 'solid-js'
import { HeaderCell } from './HeaderCell'
import { Header } from '@tanstack/solid-table'

export function HeaderRow<T>(props: { padding: boolean; columns?: number[]; headers: Header<T, unknown>[] }) {
    const { virtualPadding, virtualColumnsIndex } = MagicTableCtx.use<MagicTableCtxType<T>>()
    return (
        <tr class="flex w-full">
            {props.padding && virtualPadding().left ? (
                //fake empty column to the left for virtualization scroll padding
                <th style={{ display: 'flex', width: virtualPadding().left + 'px' }} />
            ) : null}
            <For each={props.columns ?? virtualColumnsIndex()}>
                {(index) => {
                    const header = props.headers[index]
                    return <HeaderCell header={header}></HeaderCell>
                }}
            </For>

            {props.padding && virtualPadding().right ? (
                //fake empty column to the right for virtualization scroll padding
                <th style={{ display: 'flex', width: virtualPadding().right + 'px' }} />
            ) : null}
        </tr>
    )
}
