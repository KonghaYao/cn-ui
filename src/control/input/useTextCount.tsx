import { Atom, classNames, computed } from '@cn-ui/reactive'
import { Show } from 'solid-js'
import { watch } from 'solidjs-use'
import { CountConfig } from './BaseInput'

const FractionDeps = (props: { max?: number; count: number }) => {
    return (
        <span class={classNames('text-sm text-nowrap ', props.max && (props.max ?? Infinity) < props.count ? 'text-rose-500' : 'text-design-text')}>
            {props.count} {props.max ? ' / ' + props.max : null}
        </span>
    )
}

export interface CountProps {
    count?: boolean | CountConfig // Character count config
    model: Atom<string>
    allowExceed?: boolean
}

/** input 右侧的计数文本组件 */
export const useTextCount = (props: CountProps) => {
    const countOptional = computed(() => {
        let baseCount = props.count ?? {}
        if (typeof props.count === 'boolean') {
            baseCount = {}
        }
        return {
            strategy(value: string) {
                return value.length
            },
            exceedFormatter(value: string, config: CountConfig) {
                if (config.max && !props.allowExceed) {
                    return value.slice(0, config.max)
                } else {
                    return value
                }
            },
            ...(baseCount as CountConfig)
        }
    })
    return {
        TextCount: (
            <Show when={props.count}>
                <FractionDeps max={countOptional().max} count={countOptional().strategy(props.model())}></FractionDeps>
            </Show>
        ),
        countOptional,
        textLengthControl() {
            watch(props.model, () => {
                if (props.count !== false) {
                    props.model((i) => countOptional().exceedFormatter(i, countOptional()))
                }
            })
        }
    }
}
