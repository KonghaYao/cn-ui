import { Component, createContext, createMemo } from 'solid-js';

import { TabsProps } from './interface';
import { useSelect } from '@cn-ui/headless';
import { atom, atomization, reflect } from '@cn-ui/use';
export type TabsContextType = ReturnType<typeof useSelect> & ReturnType<typeof useTabsControl>;
export const TabsContext = createContext<TabsContextType>();

/** 提供 Tabs 的名称管理 */
export function useTabsControl() {
    const TabNames = atom<string[]>([]);
    return {
        register(id: string) {
            TabNames((i) => [...new Set([...i, id])]);
        },
        TabNames,
    };
}

export const Tabs: Component<TabsProps> = (props) => {
    const activeId = atomization(props.activeId);
    return (
        <TabsContext.Provider
            value={{
                ...useSelect({
                    activeIds: reflect(() => [activeId()]),
                    multi: atom(false),
                }),
                ...useTabsControl(),
            }}
        >
            {props.children}
        </TabsContext.Provider>
    );
};
