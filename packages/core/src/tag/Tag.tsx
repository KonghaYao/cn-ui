import { JSXSlot, OriginComponent, OriginDiv, classNames, ensureFunctionResult } from '@cn-ui/reactive'
import { Icon } from '../icon/Icon'
import { AiOutlineClose } from 'solid-icons/ai'
import { Show } from 'solid-js'

export const Tag = OriginComponent<{
    color?: string
    icon?: JSXSlot
    onClose?: () => void
    closeable?: boolean
    inline?: boolean
}>((props) => {
    return (
        <OriginDiv
            prop={props}
            class={classNames(
                props.inline === false ? 'flex' : 'inline-flex',
                ' flex-row items-center px-2 rounded-md select-none border border-design-border text-sm font-light bg-design-card text-sm'
            )}
            style={{
                'background-color': props.color ?? ''
            }}
        >
            {ensureFunctionResult(props.icon)}
            <span>{props.children}</span>
            <Show when={props.closeable}>
                <Icon
                    class="cn-clear-btn cursor-pointer"
                    onclick={() => {
                        props.onClose?.()
                    }}
                >
                    <AiOutlineClose color="#777" />
                </Icon>
            </Show>
        </OriginDiv>
    )
})
