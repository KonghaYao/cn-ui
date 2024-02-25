import { NumberInput } from '@ark-ui/solid'
import { OriginComponent, computed, extendsEvent } from '@cn-ui/reactive'
import { Icon } from '../../icon/Icon'
import { AiOutlinePlus, AiOutlineMinus } from 'solid-icons/ai'
import { Show } from 'solid-js'
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
            allowMouseWheel={props.allowMouseWheel}
            max={props.max}
            allowOverflow={false}
            value={value()}
            disabled={props.disabled}
            step={props.step}
            locale={props.locale}
            formatOptions={formatOptions()}
            class={props.class(
                'rounded relative transition-colors overflow-auto hover:border-primary-400 border-design-border border ',
                props.disabled && 'opacity-50'
            )}
            style={props.style()}
            onValueChange={(e) => value(e.value)}
        >
            <NumberInput.Scrubber class="absolute w-1 h-full top-0 left-0" />

            <Show when={props.controls}>
                <NumberInput.DecrementTrigger class="px-2 bg-design-divide transition-colors hover:bg-design-hover h-full">
                    <Icon>
                        <AiOutlineMinus></AiOutlineMinus>
                    </Icon>
                </NumberInput.DecrementTrigger>
            </Show>
            <NumberInput.Input placeholder={props.placeholder} class="apparent-none px-1 py-1 outline-none" {...extendsEvent(props)} />
            <Show when={props.controls}>
                <NumberInput.IncrementTrigger class="px-2 bg-design-divide transition-colors hover:bg-design-hover h-full">
                    <Icon>
                        <AiOutlinePlus></AiOutlinePlus>
                    </Icon>
                </NumberInput.IncrementTrigger>
            </Show>
        </NumberInput.Root>
    )
})
