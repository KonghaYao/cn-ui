import { Accordion } from '@ark-ui/solid'
import { AiFillCaretDown } from 'solid-icons/ai'
import { For, JSXElement } from 'solid-js'
import './index.css'
import { Atom, OriginComponent, classNames, ensureFunctionResult, extendsEvent } from '@cn-ui/reactive'
export interface CollapseProps {
    activeKey?: Atom<string>
    collapsible?: boolean
    lazyMount?: boolean
    multiple?: boolean
    disabled?: boolean
    unmountOnExit?: boolean
    items: { key: string; label: JSXElement | (() => JSXElement); children: JSXElement }[]
}

export const Collapse = OriginComponent<CollapseProps, HTMLElement, string[]>((props) => {
    return (
        <Accordion.Root
            class={props.class('cn-collapse')}
            style={props.style()}
            value={props.model() ?? []}
            onValueChange={(value) => {
                props.model(value.value)
            }}
            unmountOnExit={props.unmountOnExit}
            multiple={props.multiple}
            disabled={props.disabled}
            collapsible={props.collapsible ?? true}
            lazyMount={props.lazyMount}
            {...extendsEvent(props)}
        >
            <For each={props.items}>
                {(item) => {
                    return (
                        <Accordion.Item value={item.key}>
                            {(api) => {
                                return (
                                    <>
                                        <Accordion.ItemTrigger class="flex justify-between w-full items-center bg-design-card">
                                            <span class="text-xl py-4">{ensureFunctionResult(item.label)}</span>
                                            <Accordion.ItemIndicator>
                                                <AiFillCaretDown
                                                    size={20}
                                                    class={classNames(' text-design-text transition-transform duration-300', api().isOpen ? 'rotate-180' : '')}
                                                ></AiFillCaretDown>
                                            </Accordion.ItemIndicator>
                                        </Accordion.ItemTrigger>
                                        <div
                                            class={classNames(
                                                'cn-collapse-container duration-300 transition-all grid  text-design-text',
                                                api().isOpen ? 'pb-4' : 'pointer-events-none'
                                            )}
                                            style={
                                                api().isOpen
                                                    ? {
                                                          'grid-template-rows': '1fr',
                                                          opacity: 1
                                                      }
                                                    : {
                                                          'grid-template-rows': '0fr',
                                                          opacity: 0
                                                      }
                                            }
                                        >
                                            {item.children}
                                        </div>
                                    </>
                                )
                            }}
                        </Accordion.Item>
                    )
                }}
            </For>
        </Accordion.Root>
    )
})
