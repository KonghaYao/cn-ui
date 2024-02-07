import { JSXSlot, OriginComponent, OriginDiv, computed, ensureFunctionResult } from '@cn-ui/reactive'
import { Icon } from '../icon/Icon'
import { AiOutlineClose } from 'solid-icons/ai'

export const Tag = OriginComponent<{
    color?: string
    icon?: JSXSlot
    onClose?: () => void
}>((props) => {
    return (
        <OriginDiv
            prop={props}
            class="flex flex-row items-center px-2 rounded-md select-none border"
            style={{
                'background-color': props.color ?? '#eee'
            }}
        >
            {ensureFunctionResult(props.icon)}
            <span>{props.children}</span>
            <Icon
                class="cn-clear-btn cursor-pointer"
                onclick={() => {
                    props.onClose?.()
                }}
            >
                <AiOutlineClose color="#777" />
            </Icon>
        </OriginDiv>
    )
})
