import { OriginComponent, OriginComponentInputType, classNames, useMapper } from '@cn-ui/reactive'
import { Accessor, JSXElement, Show } from 'solid-js'
import { VirtualList } from '../virtualList'
import './index.css'
export type ModalPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom'

export interface ModalProps<T> {
    maxStackItem?: number
    each: T[]
    by: (item: T) => string | number
    children: (item: T, index: Accessor<number>) => JSXElement
    estimateSize?: number
    stack?: boolean
    position?: ModalPosition
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
                    '--modal-show-position': modalShowPosition()
                }}
            >
                <VirtualList
                    each={props.each}
                    reverse={props.position?.startsWith('bottom')}
                    getItemKey={(index) => props.by(props.each[index])}
                    estimateSize={props.estimateSize ?? 64}
                >
                    {(item, index, { itemClass }) => {
                        itemClass('pl-6 py-2')
                        return <div class={classNames('w-full h-12 rounded-xl flex-none shadow-md bg-white')}>{props.children(item, index)}</div>
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
