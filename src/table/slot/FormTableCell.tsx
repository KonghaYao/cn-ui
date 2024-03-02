import { computed, useEffectWithoutFirst } from '@cn-ui/reactive'
import { Show, createMemo } from 'solid-js'
import { FormCore } from '../../control/form/FromCore'
import { defaultBodyCell } from './BodyCell'
import { CellContext } from '@tanstack/solid-table'

export function FormTableCell<T, D>(props: CellContext<T, D>) {
    const ctx = createMemo(() => props.cell.getContext())
    const config = createMemo(() => props.cell.column.columnDef)
    const model = computed(() => props.cell.getValue())
    const onChange = (value: any) => {
        props.table.options.meta?.updateData!(props.row.index, props.column.id, value)
    }
    useEffectWithoutFirst(() => {
        onChange(model())
    }, [model])
    return (
        <Show when={config().type} fallback={defaultBodyCell<unknown>(ctx() as CellContext<unknown, string>)}>
            <FormCore span={24} label={false} v-model={model} config={config()}></FormCore>
        </Show>
    )
}
