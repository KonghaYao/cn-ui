import { Component, createContext } from 'solid-js';

import {  TabsProps } from './interface';
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
                {props.children}
        </TabsContext.Provider>
    );
});
