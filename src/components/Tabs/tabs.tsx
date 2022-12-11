import { Component, createContext, mergeProps } from 'solid-js';
import { extendsEvent } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import { TabPaneProps, TabsProps } from './interface';
import { useStateManager } from '@cn-ui/headless';
export type TabsContextType = ReturnType<typeof useStateManager<{ id: string }>>
export const TabsContext = createContext<TabsContextType>();

export const Tabs:Component<TabsProps> = ((props) => {
    return (
        <TabsContext.Provider
            value={useStateManager<{ id: string }>({
                activeId: null,
            })}
        >
<div>

                {props.children}
</div>

        </TabsContext.Provider>
    );
});
