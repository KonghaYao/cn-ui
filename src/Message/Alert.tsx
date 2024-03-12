import { JSXSlot, OriginComponent, classNames, ensureArrayReturn, ensureFunctionResult, useMapper } from '@cn-ui/reactive'
import { Icon } from '../icon/Icon'
import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle, AiFillWarning, AiOutlineClose } from 'solid-icons/ai'
import { Show } from 'solid-js'

export interface AlertProps {
    closable?: boolean
    icon?: boolean | JSXSlot
    title: JSXSlot
    border?: boolean
    round?: boolean
    description?: JSXSlot
    type?: 'success' | 'info' | 'warning' | 'error'
    afterClose?: () => void
    onClose?: (e: MouseEvent) => void
}

export const Alert = OriginComponent<AlertProps>((props) => {
    const boxClass = useMapper(props.type ?? 'default', {
        success() {
            return this.default() + 'bg-green-50 border-green-200'
        },
        info() {
            return this.default() + 'bg-blue-50 border-blue-100'
        },
        warning() {
            return this.default() + 'bg-yellow-50 border-yellow-500'
        },
        error() {
            return this.default() + 'bg-red-50 border-red-100'
        },
        default() {
            return classNames(props.round && 'rounded-md', props.border && 'border-1', 'p-2') + ' '
        }
    })
    const commonIconClass = 'text-xl pr-2'
    const DynamicIcon = useMapper(props.type ?? 'default', {
        success() {
            return (
                <Icon class={'text-green-600 ' + commonIconClass}>
                    <AiFillCheckCircle></AiFillCheckCircle>
                </Icon>
            )
        },
        info() {
            return (
                <Icon class={'text-blue-600 ' + commonIconClass}>
                    <AiFillInfoCircle></AiFillInfoCircle>
                </Icon>
            )
        },
        warning() {
            return (
                <Icon class={'text-yellow-600 ' + commonIconClass}>
                    <AiFillWarning></AiFillWarning>
                </Icon>
            )
        },
        error() {
            return (
                <Icon class={'text-red-600 ' + commonIconClass}>
                    <AiFillCloseCircle></AiFillCloseCircle>
                </Icon>
            )
        },
        default() {
            return null
        }
    })
    return (
        <div class={props.class(boxClass(), 'overflow-hidden')}>
            <h3 class="flex items-center">
                {typeof props.icon === 'boolean' ? DynamicIcon() : ensureFunctionResult(props.icon)}
                <span class="flex-1">{ensureFunctionResult(props.title)}</span>
                <Show when={props.closable}>
                    <Icon class="cursor-pointer text-design-border hover:text-design-title transition-color" onclick={props?.onClose}>
                        <AiOutlineClose></AiOutlineClose>
                    </Icon>
                </Show>
            </h3>
            <p
                class="pl-6 text-design-h2"
                style={{
                    // bug: 不知为何这个地方不折行
                    'line-break': 'anywhere'
                }}
            >
                {ensureFunctionResult(props.description)}
            </p>
        </div>
    )
})
