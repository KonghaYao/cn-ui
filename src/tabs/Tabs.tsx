import { TabsProps } from './interface'
import { OriginComponent, OriginDiv, classNames, createCtx, useSelect } from '@cn-ui/reactive'
import { atom, atomization, reflect } from '@cn-ui/reactive'
import { TabsHeader } from './TabsHeader'
import { createEffect } from 'solid-js'
export type TabsContextType = ReturnType<typeof useSelect> & {
    destroyOnHide: boolean
    fill: boolean
}
export const TabsContext = createCtx<TabsContextType>()

export const Tabs = OriginComponent<TabsProps>((props) => {
    const activeId = atomization(props.model ?? '')
    const selectSetting = useSelect({
        activeIds: reflect(() => [activeId()]),
        multi: atom(false)
    })
    createEffect(() => {
        const value = [...selectSetting.activeIds()][0]
        props.$input()['on:input']({ target: { value } })
    })

    return (
        <TabsContext.Provider
            value={{
                ...selectSetting,
                destroyOnHide: props.destroyOnHide ?? false,
                fill: props.fill ?? false
            }}
        >
            <OriginDiv prop={props} class={classNames(props.fill && 'h-full', 'flex flex-col cn-tabs')}>
                {props.header ? props.header({}) : TabsHeader({})}
                <div class={classNames(props.fill && 'h-full', props.wrapperClass)}>{props.children}</div>
            </OriginDiv>
        </TabsContext.Provider>
    )
})
