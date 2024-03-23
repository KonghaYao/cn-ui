import { Accessor, children, createContext, createEffect, For, JSX, JSXElement, mergeProps, useContext } from 'solid-js'
import SortableCore from 'sortablejs'
import { OriginComponent, Atom, atomization, extendsEvent, useEffectWithoutFirst, OriginComponentInputType, OriginComponentOutputType } from '@cn-ui/reactive'
import { useSortable } from './useSortable'
export { SortableCore }
/** Sortable 组件的公共参数 */
export const SortableShared = createContext<{
    /** 当使用 sharedList 的时候进行数据的统一 */
    sharedData?: Atom<any[]>[]
    /** 默认参数 */
    options?: SortableCore.Options
}>({})

/* TODO 还有很多示例未完成数据统一化 */
export interface SortableListProps<T extends { id: string }> {
    fallback?: JSX.Element
    /** 获取 each 中的元素的 id 的方法，默认获取 */
    getId?: (item: T) => string
    children: (item: T, index: Accessor<number>) => JSXElement
    options?: SortableCore.Options
    disabled?: Atom<boolean>
    setData?: (data: DataTransfer, el: HTMLElement) => void
}

export type SortableListType = <
    T extends {
        id: string
    }
>(
    props: OriginComponentOutputType<SortableListProps<T>, HTMLElement, string>
) => JSX.Element

/**
 * @zh 使用响应式对象操控可排序列表, 内部列表不用再写 data-id 属性
 */
export const SortableList = OriginComponent(function <T extends { id: string }>(
    baseProps: OriginComponentInputType<SortableListProps<T>, HTMLDivElement, T[]>
) {
    const context = useContext(SortableShared)!
    const props = mergeProps(
        {
            options: context?.options ?? {}
        },
        baseProps
    )
    const each = atomization(props.model)
    const VoidId = Math.random().toString()

    const getId = props.getId || ((item) => item.id.toString())
    const disabled = atomization(props.disabled ?? false)

    const getRealIdList = () => {
        const arr: string[] = getSortable().toArray()
        return arr.filter((i, index) => i !== VoidId && arr.indexOf(i) === index)
    }

    useEffectWithoutFirst(() => {
        const sortable = getSortable()
        sortable && sortable.option('disabled', disabled())
    }, [disabled])
    /** 向外注入数据 */
    const RefreshData = () => {
        const sortable = getRealIdList()

        each(() => {
            const groupData = context.sharedData?.flatMap((i) => i() as T[]) || each()
            return sortable
                .map((id) => {
                    return groupData.find((item) => getId(item) === id)!
                })
                .filter((i) => i)
        })
    }
    const { initSort, getSortable } = useSortable({
        animation: 150,
        ...props.options,
        // animation: 0,
        // swap: false,
        // delayOnTouchOnly: true, // only delay if user is using touch
        // delay: 100,
        setData: props.setData,
        onSort() {
            props.options?.onSort?.apply(this, arguments as any)
            // console.log(sortable);
            RefreshData()
        }
    })
    const resort = () => {
        const sortable = getSortable()
        if (sortable) {
            const IdMap = each().map((i) => getId(i))
            const sortableTag = getRealIdList().join(',')
            if (sortableTag !== IdMap.join(',')) {
                // console.log('外部导入', IdMap);
                sortable.sort(IdMap)
            }
        }
    }
    createEffect(resort)
    // fixed 把元素放置在末尾会发生 bug
    // 多添加一个空白的数据，让最后一个不能移动就行了
    return (
        <div
            ref={(i) => {
                initSort(i)
            }}
            /** @ts-ignore */
            class={props.class('cn-sortable')}
            style={props.style()}
            {...extendsEvent(props)}
        >
            <For each={[...each(), null]} fallback={props.fallback}>
                {(item, index) => {
                    if (item === null) return <div data-id={VoidId}></div>
                    const dom = children(() => props.children(item, index))() as HTMLElement
                    dom.dataset.id = getId(item)
                    return dom
                }}
            </For>
        </div>
    )
})
