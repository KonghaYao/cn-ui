import { TabsProps } from './interface'
import { OriginComponent, OriginDiv, createCtx, useSelect } from '@cn-ui/reactive'
import { atom, atomization, reflect } from '@cn-ui/reactive'
import { TabsHeader } from './TabsHeader'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
export type TabsContextType = ReturnType<typeof useSelect> & {}
export const TabsContext = createCtx<TabsContextType>()

export const Tabs = OriginComponent<TabsProps>((props) => {
    const activeId = atomization(props.model ? props.model() : '')
    const [animate] = createAutoAnimate()
    return (
        <TabsContext.Provider
            value={{
                ...useSelect({
                    activeIds: reflect(() => [activeId()]),
                    multi: atom(false)
                })
            }}
        >
            <OriginDiv prop={props} class="flex flex-col cn-tabs">
                {props.header ? props.header({}) : TabsHeader({})}
                <div ref={animate} class={props.panelClass}>
                    {props.children}
                </div>
            </OriginDiv>
        </TabsContext.Provider>
    )
})
