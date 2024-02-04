import { extendsEvent, OriginComponent } from '@cn-ui/reactive'
import { createEffect, onCleanup, JSX, JSXElement, splitProps } from 'solid-js'
import OriginSplit from 'split.js'
import './style.css'

export interface SplitterProps extends JSX.HTMLAttributes<HTMLElement> {
    /**
     * @zh 初始每个部分的百分比占比
     */
    sizes?: number[]
    /** @zh 每个部分的最小大小 */
    minSize?: number | number[]
    /** @zh 每个部分的最大大小 */
    maxSize?: number | number[]
    expandToMin?: boolean
    /** @zh 分割部分的大小 */
    gutterSize?: number
    /** @zh 分割部分的对齐方式 */
    gutterAlign?: 'center' | 'start' | 'end'
    /** @zh 自动缩回的距离 */
    snapOffset?: number | number[]
    dragInterval?: number

    // Cursor to display while dragging.
    cursor?: string
    children: JSXElement
    vertical?: boolean
}
import { children as getChildren } from 'solid-js'
/**
 * @zh 分割面板，使用 split.js 作为基础进行封装
 */
export const Splitter = OriginComponent<SplitterProps>((props) => {
    let lastSplit = { destroy() {} } as unknown as OriginSplit.Instance
    const childBind = getChildren(() => props.children)
    createEffect(() => {
        const children = childBind.toArray()

        if (children.length) {
            //! 注意，props.children 是一个非常特殊的属性，
            //! 触发其 Getter 的时候会重新绘制整个页面
            const [_, others] = splitProps(props, ['children'])
            const message = {
                ...others,
                direction: props.vertical ? 'vertical' : 'horizontal',
                elementStyle(_dimension, size, _gutterSize) {
                    return {
                        'flex-basis': 'calc(' + size + '%)'
                    }
                },
                gutterStyle(_dimension, gutterSize) {
                    return {
                        'flex-basis': gutterSize + 'px'
                    }
                }
            } as OriginSplit.Options
            // 推迟更新，等待 DOM 完成挂载
            setTimeout(() => {
                lastSplit.destroy()
                lastSplit = OriginSplit(children as HTMLElement[], message)
            }, 10)
        }
    })
    onCleanup(() => lastSplit.destroy())
    return (
        <section
            role="presentation"
            ref={props.ref}
            class={props.class('flex', 'cn-ui-split')}
            classList={{
                'flex-col': props.vertical
            }}
            style={props.style()}
            {...extendsEvent(props)}
        >
            {childBind()}
        </section>
    )
})
