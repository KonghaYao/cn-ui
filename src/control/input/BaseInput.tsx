import { Atom, NullAtom, OriginComponent, atomization, classNames, computed, extendsEvent } from '@cn-ui/reactive'
import { Accessor, Show, createMemo, mergeProps, onMount } from 'solid-js'
import { JSXElement } from 'solid-js'
import { CountProps, useTextCount } from './useTextCount'
import { ensureFunctionResult } from '@cn-ui/reactive'
import { triggerFocus, FocusOptions } from './triggerFocus'
import { Dynamic } from 'solid-js/web'
import './index.css'
import { useElementHover } from 'solidjs-use'
// Character count config
export interface CountConfig {
    max?: number // Max character count. Different from the native `maxLength`, it will be marked warning but not truncated
    strategy?: (value: string) => number // Custom character count, for example, the standard emoji length is greater than 1, you can customize the counting strategy to change it to 1
    show?: boolean | ((args: { value: string; count: number; maxLength?: number }) => JSXElement) // Same as `showCount`
    exceedFormatter?: (value: string, config: CountConfig) => string // Custom clipping logic when the number of characters exceeds `count.max`, no clipping when not configured
}

export interface InputExpose {
    inputType: Atom<string>
    isHovering: Accessor<boolean>
    model: Atom<string>
    focus: (opts: FocusOptions) => void
}

export interface BaseInputProps extends Omit<CountProps, 'model'> {
    id?: string // The ID for input
    disabled?: boolean // Whether the input is disabled
    prefixIcon?: JSXElement | ((expose: InputExpose) => JSXElement) // The prefix icon for the Input
    suffixIcon?: JSXElement | ((expose: InputExpose) => JSXElement) // The suffix icon for the Input
    rounded?: boolean // Whether to round the corners of the input box
    type?: 'text' | 'textarea' | 'password' | string // The type of input, see: MDN (use Input.TextArea instead of type="textarea")
    expose?: (expose: InputExpose) => void
    autoSize?: boolean
    resize?: boolean
    readonly?: boolean
    placeholder?: string
}

export const BaseInput = OriginComponent<BaseInputProps, HTMLInputElement, string>((props) => {
    props = mergeProps(
        {
            placeholder: '请输入文本',
            rounded: true
        },
        props
    )
    const inputEl = NullAtom<HTMLInputElement>(null)
    const inputWrapper = NullAtom<HTMLInputElement>(null)
    const inputType = atomization(props.type ?? 'text')
    const isHovering = useElementHover(inputWrapper)
    const expose: InputExpose = {
        inputType,
        model: props.model,
        focus(opts) {
            triggerFocus(inputEl()!, opts)
        },
        isHovering
    }
    onMount(() => {
        props.expose?.(expose)
    })
    /** 域内前缀 */
    const Prefix = computed(() => {
        const child = ensureFunctionResult(props.prefixIcon, [expose])
        return <Show when={child}>{<span class="mr-1 flex-none">{child}</span>}</Show>
    })
    const { TextCount, textLengthControl } = useTextCount(props)
    textLengthControl()
    /** 域内后缀 */
    const Suffix = computed(() => {
        const child = ensureFunctionResult(props.suffixIcon, [expose])
        return (
            <Show when={child || TextCount}>
                <span class="ml-1 text-gray-400 flex-none">
                    {child}
                    {TextCount}
                </span>
            </Show>
        )
    })
    const isTextarea = createMemo(() => props.type === 'textarea')
    return (
        <span
            ref={inputWrapper}
            class={props.class(
                'cn-base-input transition inline-flex border border-design-border py-1 px-3 text-sm',
                isTextarea() && props.autoSize && 'cn-textarea-auto-size',
                props.rounded && 'rounded',
                props.disabled && 'bg-gray-100 text-gray-400',
                !props.disabled && 'hover:border-blue-400'
            )}
            data-replicated-value={isTextarea() && props.autoSize && props.model()}
            style={props.style()}
        >
            {Prefix()}
            <Dynamic
                placeholder={props.placeholder}
                component={isTextarea() ? 'textarea' : 'input'}
                ref={(el: HTMLInputElement) => (inputEl(el), props.ref?.(el))}
                id={props.id}
                readonly={props.readonly}
                type={inputType()}
                disabled={props.disabled}
                class={classNames(
                    'bg-transparent appearance-none outline-none w-full ',
                    props.disabled && ' cursor-not-allowed',
                    !props.resize && 'resize-none'
                )}
                {...props.$input()}
                {...extendsEvent(props)}
            ></Dynamic>

            {Suffix()}
        </span>
    )
})
export const Input = BaseInput
