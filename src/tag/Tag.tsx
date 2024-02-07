import { JSXSlot, OriginComponent, OriginDiv, computed, ensureFunctionResult } from '@cn-ui/reactive'
import { ClearControl } from '../control/input/utils'
import { Accessor } from 'solid-js'

export const Tag = OriginComponent<{
    color?: string
    icon?: JSXSlot
    onClose?: () => void
}>((props) => {
    return (
        <OriginDiv
            prop={props}
            class="flex flex-row px-2 rounded-md"
            style={{
                'background-color': props.color ?? '#eee'
            }}
        >
            {ensureFunctionResult(props.icon)}
            <span>{props.children}</span>
            <ClearControl onClear={props.onClose}></ClearControl>
        </OriginDiv>
    )
})
export const useAutoColor = (text: Accessor<string>) => {
    return computed(() => {
        const t = text()
        let color = 0
        for (let index = 0; index < t.length; index++) {
            const element = t.charCodeAt(index)
            color += element
        }
        return '#' + (color % 0xffffff).toString(16).padStart(6, '0')
    })
}
