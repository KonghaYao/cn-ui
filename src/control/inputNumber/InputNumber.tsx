import { NumberInput, useNumberInputContext } from '@ark-ui/solid'
import { OriginComponent, computed, extendsEvent } from '@cn-ui/reactive'
import { Icon } from '../../icon/Icon'
import { AiOutlinePlus, AiOutlineMinus } from 'solid-icons/ai'
import { Show, JSXElement } from 'solid-js'
export interface InputNumberProps {
    placeholder?: string
    min?: number
    max?: number
    disabled?: boolean
    readonly?: boolean
    step?: number
    precision?: number | { min: number; max?: number } | { min?: number; max: number }
    controls?: boolean

    locale?: string
    formatOptions?: Intl.NumberFormatOptions
    parser?: (str: string) => number

    allowMouseWheel?: boolean
}

export const InputNumber = OriginComponent<InputNumberProps, HTMLDivElement, number>((props) => {
    const toNumber = computed(() => {
        return props.parser ?? ((i: string) => parseFloat(i.replace(/,/g, '')))
    })

    const value = props.model.reflux(new Intl.NumberFormat(props.locale ?? 'en-US', props.formatOptions).format(props.model() ?? 0), (str) => toNumber()(str))
    const formatOptions = computed(() => {
        if (props.precision === undefined) {
            return undefined
        } else if (typeof props.precision === 'number') {
            return { minimumFractionDigits: props.precision, maximumFractionDigits: props.precision }
        } else {
            return { minimumFractionDigits: props.min, maximumFractionDigits: props.max }
        }
    })

    return (
        <NumberInput.Root
            min={props.min}
            max={props.max}
            step={props.step}
            formatOptions={formatOptions()}
            allowMouseWheel={props.allowMouseWheel}
            allowOverflow={true}
            value={value()}
            disabled={props.disabled}
            locale={props.locale}
            class={props.class(
                'cn-input-number rounded relative transition-colors overflow-auto hover:border-primary-400 border-design-border border flex',
                props.disabled && 'opacity-50'
            )}
            style={props.style()}
            onValueChange={(e) => value(e.value)}
        >
            <NumberInput.Scrubber class="absolute w-1 h-full top-0 left-0" />

            <Show when={props.controls}>
                <Controls disabled={props.disabled} mode="minus">
                    <AiOutlineMinus></AiOutlineMinus>
                </Controls>
            </Show>
            <NumberInput.Input
                id={props.id}
                placeholder={props.placeholder}
                class="w-full apparent-none text-center flex-1 px-1 py-1 outline-none"
                {...extendsEvent(props)}
            />
            <Show when={props.controls}>
                <Controls disabled={props.disabled} mode="add">
                    <AiOutlinePlus></AiOutlinePlus>
                </Controls>
            </Show>
        </NumberInput.Root>
    )
})
function Controls(props: { disabled?: boolean; mode: 'add' | 'minus'; children: JSXElement }) {
    const ctx = useNumberInputContext()
    return (
        <Icon
            {...(ctx()[props.mode === 'add' ? 'incrementTriggerProps' : 'decrementTriggerProps'] as any)}
            class="px-2 bg-design-divide transition-colors cursor-pointer hover:bg-design-hover h-full flex items-center"
        >
            {props.children}
        </Icon>
    )
}
