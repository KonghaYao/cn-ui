import { Component, createContext, createMemo } from 'solid-js';

import { TabsProps } from './interface';
import { useSelect } from '../useSelect';
import { atom, atomization, reflect } from '@cn-ui/use';
export type TabsContextType = ReturnType<typeof useSelect>;
export const TabsContext = createContext<TabsContextType>();

export const Tabs: Component<TabsProps> = (props) => {
    const activeId = atomization(props.activeId);
    return (
        <TabsContext.Provider
            value={{
                ...useSelect({
                    activeIds: reflect(() => [activeId()]),
                    multi: atom(false),
                }),
            }}
        >
            {props.children}
        </TabsContext.Provider>
    );
};
