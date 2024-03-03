import { Atom, OriginComponent, OriginComponentInputType, ResourceAtom, StoreToAtom, autoResource, createCtx, extendsEvent } from '@cn-ui/reactive'
import { Row } from '../../RowAndCol'
import { For, createEffect, createMemo } from 'solid-js'
import { FormCore } from './FromCore'
import { ColumnDef } from '@tanstack/solid-table'
import { SetStoreFunction } from 'solid-js/store'
import { RootColumnDef, getKeyFromRootColumnDef } from './utils'
import { useValidator } from './useValidator'
import { RuleItem } from 'async-validator'

export const MagicFormCtx = createCtx<{
    originData: unknown
    disabled?: boolean
    index?: number
    validResult?: ResourceAtom<{
        errors: RuleItem[]
        fields: Record<string, RuleItem[]>
    } | null>
}>(undefined, true)

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
    const { validator } = useValidator(props.config as RootColumnDef<T, D>[], props.originData, props.index ?? 0)
    const validResult = autoResource(() =>
        validator()
            .validate(props.originData as any)
            .then(
                (data) => {
                    return null
                },
                (e: { errors: RuleItem[]; fields: Record<string, RuleItem[]> }) => {
                    return e
                }
            )
    )
    createEffect(() => {
        console.log(props.originData)
    })
    return (
        <MagicFormCtx.Provider
            value={{
                validResult,
                originData: props.originData,
                disabled: props.disabled,
                index: props.index
            }}
        >
            <form class={props.class()} style={props.style()} {...extendsEvent(props)}>
                <Row bottomSpace={0}>
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
