import { createMemo, Show } from 'solid-js'
import { OriginComponent, OriginDiv } from '@cn-ui/reactive'
import { TabPaneProps } from './interface'
import { TabsContext } from './Tabs'

/** Tabs 组件 */
export const Tab = OriginComponent<TabPaneProps, HTMLDivElement>((props) => {
    const { register, isSelected, destroyOnHide } = TabsContext.use()!
    register(props.name, true)
    const show = createMemo(() => {
        if (!(props.destroyOnHide || destroyOnHide)) {
            return true
        } else {
            return isSelected(props.name)
        }
    })

    return (
        <Show when={show()}>
            <OriginDiv prop={props} style={{ display: isSelected(props.name) ? 'block' : 'none' }}>
                {typeof props.children === 'function' ? props.children() : props.children}
            </OriginDiv>
        </Show>
    )
})
