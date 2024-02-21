import { JSXSlot, OriginComponent, createCtx, ensureFunctionResult } from '@cn-ui/reactive'
import { Button, ButtonProps } from '../button'
import { Flex } from '../container'
import { For, Show } from 'solid-js'
import { Icon } from '../icon/Icon'
import { AiOutlineClose } from 'solid-icons/ai'

export interface FloatingButtonProps extends ButtonProps {
    absolute?: boolean
    children?: JSXSlot
}

export const FloatingButton = OriginComponent<FloatingButtonProps>((props) => {
    const groupCtx = FloatingGroupCtx.use()
    return (
        <Button
            circle
            type="text"
            {...(props as any)}
            class={props.class(
                ' h-10 w-10 p-2 right-4 bottom-4 shadow-3 z-10 active:scale-75 transition-transform',
                groupCtx ? '' : props.absolute ? 'absolute' : 'fixed'
            )}
            style={props.style()}
        >
            {ensureFunctionResult(props.children)}
        </Button>
    )
})
export const FloatingGroupCtx = createCtx<{}>(undefined, true)
export const FloatingButtonGroup = OriginComponent<{ options: FloatingButtonProps[]; icon?: FloatingButtonProps }, HTMLDivElement, boolean>(
    (props) => {
        const closeBtn = () => (
            <Icon>
                <AiOutlineClose></AiOutlineClose>
            </Icon>
        )
        return (
            <FloatingGroupCtx.Provider value={{}}>
                <Flex reverse vertical gap={'12px'} class={props.class('fixed right-4 bottom-4')} style={props.style()}>
                    <Show when={props.icon}>
                        <Show
                            when={!props.model()}
                            fallback={FloatingButton({
                                children: closeBtn(),
                                // @ts-ignore
                                'on:click'() {
                                    props.model(false)
                                }
                            })}
                        >
                            {FloatingButton({
                                ...props.icon,
                                'on:click'() {
                                    props.model(true)
                                }
                            } as any)}
                        </Show>
                    </Show>
                    <For each={props.options}>
                        {(item, index) => {
                            return <Show when={props.model()}>{FloatingButton(item as any)}</Show>
                        }}
                    </For>
                </Flex>
            </FloatingGroupCtx.Provider>
        )
    },
    { modelValue: true }
)
