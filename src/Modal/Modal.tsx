import { OriginComponent, OriginComponentInputType, classNames, toCSSPx, useMapper } from '@cn-ui/reactive'
import { Accessor, JSXElement, Show } from 'solid-js'
import { VirtualList } from '../virtualList'
import './index.css'
export type ModalPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom'

export interface ModalProps<T> {
    maxStackItem?: number
    each: T[]
    by: (item: T, index: number) => string | number
    children: (item: T, index: Accessor<number>) => JSXElement
    stack?: boolean
    position?: ModalPosition
    itemSize?: {
        width: number
        height: number
    }
}

export const Modal = OriginComponent(function <T>(props: OriginComponentInputType<ModalProps<T>, HTMLDivElement, boolean>) {
    const { position, modalShowPosition } = useModalPosition(props)
    return (
        <Show when={props.model() && props.each.length}>
            <div
                class={classNames(
                    props.stack !== false && props.each.length >= (props.maxStackItem ?? 5) && 'cn-modal-stack',
                    'cn-modal fixed z-50 overflow-y-auto overflow-x-visible h-fit w-96 ',
                    position()
                )}
                style={{
                    '--modal-show-position': modalShowPosition(),
                    width: toCSSPx(props.itemSize?.width, '24rem')
                }}
            >
                <VirtualList
                    each={props.each}
                    reverse={props.position?.startsWith('bottom')}
                    getItemKey={(index) => props.by(props.each[index], index)}
                    estimateSize={props.itemSize?.height ?? 64}
                >
                    {(item, index, { itemClass }) => {
                        itemClass('px-3 py-2')
                        return (
                            <div
                                style={{
                                    height: toCSSPx(props.itemSize?.height, '48px')
                                }}
                                class={classNames('w-full rounded-xl flex-none shadow-1 bg-design-card')}
                            >
                                {props.children(item, index)}
                            </div>
                        )
                    }}
                </VirtualList>
            </div>
        </Show>
    )
})
function useModalPosition(props: { position?: ModalPosition }) {
    const position = useMapper(() => props.position ?? 'top-left', {
        'top-left': 'top-4 left-0',
        'top-right': 'top-4 right-0',
        'bottom-left': 'bottom-4 left-0',
        'bottom-right': 'bottom-4 right-0',
        top: 'top-4 left-[50%] -translate-x-1/2',
        bottom: 'bottom-4 left-[50%] -translate-x-1/2'
    })
    const modalShowPosition = useMapper(() => props.position ?? 'top-left', {
        'top-left': '-120px',
        'top-right': '120px',
        'bottom-left': '-120px',
        'bottom-right': '120px',
        top: '0 -120px',
        bottom: '0 120px'
    })
    return { position, modalShowPosition }
}
