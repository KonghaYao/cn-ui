import { OriginComponent, atom, classNames, resource } from '@cn-ui/reactive'
import Mock from 'mockjs-ts'
import { Show } from 'solid-js'
import { Flex } from '../container'
import { VirtualList } from '../virtualList'
import './index.css'
import { nextTick } from 'solidjs-use'
export const Modal = OriginComponent<{}, HTMLDivElement, boolean>((props) => {
    const maxStackItem = 5
    const data = atom<{ name: string }[]>([], { equals: false })
    return (
        <>
            <Flex>
                <button
                    onclick={() =>
                        data((i) => {
                            i.unshift({ name: Mock.mock('@id') })
                            return i
                        })
                    }
                >
                    修复
                </button>
            </Flex>
            <Show when={props.model()}>
                <div
                    class={classNames(
                        data().length >= maxStackItem && 'cn-modal-stack',
                        'cn-modal fixed top-0 left-0 z-50 overflow-y-auto overflow-x-visible  h-[80vh] w-96 p-4 '
                    )}
                >
                    <VirtualList each={data()} getItemKey={(index) => data()[index].name} estimateSize={52}>
                        {(item, index, { itemClass }) => {
                            itemClass('p-2')
                            return (
                                <div
                                    class={classNames('w-full h-12 rounded-xl flex-none shadow-md bg-white')}
                                    onclick={() => {
                                        nextTick(() => {
                                            data((arr) => arr.filter((i) => i !== item))
                                        })
                                    }}
                                >
                                    {item.name}
                                </div>
                            )
                        }}
                    </VirtualList>
                </div>
            </Show>
        </>
    )
})
