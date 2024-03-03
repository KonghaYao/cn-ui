import { Atom, OriginComponent, OriginComponentInputType, StoreToAtom, createCtx, extendsEvent } from '@cn-ui/reactive'
import { Row } from '../../RowAndCol'
import { For, createMemo } from 'solid-js'
import { FormCore } from './FromCore'
import { ColumnDef } from '@tanstack/solid-table'
import { SetStoreFunction, createStore } from 'solid-js/store'
import { RootColumnDef, getKeyFromRootColumnDef } from './utils'

export const MagicFormCtx = createCtx<{
    originData: unknown
    disabled?: boolean
    index?: number
}>()

export const MagicForm = OriginComponent(function <T, D>(
    props: OriginComponentInputType<
        {
            config: ColumnDef<T, D>[]
            disabled?: boolean
            index?: number
            originData: T
            setOriginData: SetStoreFunction<T>
        },
        HTMLFormElement,
        any
    >
) {
    const flattenColumns = createMemo(() => getFlattenColumnConfig(props.config))
    return (
        <MagicFormCtx.Provider value={{ originData: props.originData, disabled: props.disabled, index: props.index }}>
            <form class={props.class()} style={props.style()} {...extendsEvent(props)}>
                <Row>
                    <For each={flattenColumns()}>
                        {(item) => {
                            const model = StoreToAtom(
                                [props.originData, props.setOriginData],
                                /** @ts-ignore */
                                () => {
                                    return getKeyFromRootColumnDef(item, props.originData, props.index ?? 0)
                                }
                            ) as unknown as Atom<any>
                            return <FormCore disabled={props.disabled} showLabel config={item} v-model={model}></FormCore>
                        }}
                    </For>
                </Row>
            </form>
        </MagicFormCtx.Provider>
    )
})

/** 判断列配置中是否为底层列 */
export function isAccessorColumn<T, D>(column: ColumnDef<T, D>): column is RootColumnDef<T, D> {
    return 'accessorKey' in column || 'accessorFn' in column
}

/** 扁平化列配置 */
export function getFlattenColumnConfig<T, D>(columns: ColumnDef<T, D>[]) {
    return columns.reduce((col, cur) => {
        if ('columns' in cur && cur.columns) {
            /** 忽略这个层叠头部配置 */
            col.push(...getFlattenColumnConfig(cur.columns))
        } else if (isAccessorColumn(cur)) {
            col.push(cur)
        }
        return col
    }, [] as RootColumnDef<T, D>[])
}
