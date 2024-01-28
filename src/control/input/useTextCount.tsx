import { Atom, computed } from '@cn-ui/reactive'
import { Show } from 'solid-js'
import { watch } from 'solidjs-use'
import { CountProps, CountConfig } from './BaseInput'

const FractionDeps = (props: { max?: number; count: string | number }) => {
    return (
        <span>
            {props.count} {props.max ? ' / ' + props.max : null}
        </span>
    )
}
export const useTextCount = (props: CountProps & { model: Atom<string> }) => {
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
                if (config.max) {
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
