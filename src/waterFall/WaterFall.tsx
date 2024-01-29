import { Atom, atomization, OriginComponentInputType, extendsEvent, OriginComponent, reflect, classNames, OriginComponentOutputType } from '@cn-ui/reactive'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Accessor, For, JSXElement, createMemo } from 'solid-js'
export interface WaterFallProps<T> {
    items: T[] | Atom<T[]>
    column?: number | Atom<number>
    children: (data: T, index?: Accessor<number>) => JSXElement
    // 控制列的 class
    colClass?: string
    fallback?: () => JSXElement
}

/**
 * 进行瀑布流式布局的组件库
 */
export const WaterFall = OriginComponent(function <T>(props: OriginComponentInputType<WaterFallProps<T>>) {
    const items = atomization(props.items)
    const column = atomization(props.column ?? 3)
    const columnItems = reflect(() => {
        return items().reduce(
            (col, item, index) => {
                col[index % column()].push(item)
                return col
            },
            [...Array(column()).keys()].map(() => [] as T[])
        )
    })
  
    return (
        <section class={props.class('flex')} style={props.style()} {...extendsEvent(props)}>
            <For each={columnItems()} fallback={props.fallback && props.fallback()}>
                {(items, colIndex) => {
                    return (
                        <div class={classNames('flex flex-1 flex-col ', props.colClass)}>
                            <For each={items}>
                                {(item, rowIndex) =>
                                    props.children(
                                        item,
                                        createMemo(() => rowIndex() * column() + colIndex())
                                    )
                                }
                            </For>
                        </div>
                    )
                }}
            </For>
        </section>
    )
})
