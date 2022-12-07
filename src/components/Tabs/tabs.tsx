import { createContext, mergeProps } from 'solid-js';
import { extendsEvent } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import { TabPaneProps, TabsProps } from './interface';
import { useStateManager } from '@cn-ui/headless';

export const TabsContext = createContext<ReturnType<typeof useStateManager<{ id: string }>>>();

export const Tabs = OriginComponent<TabsProps, HTMLDivElement>((props) => {
    return (
        <TabsContext.Provider
            value={useStateManager<{ id: string }>({
                activeId: null,
            })}
        >
            <div
                ref={props.ref}
                class={props.class('cn-tabs')}
                style={props.style}
                {...extendsEvent(props)}
            >
                {props.children}
            </div>
        </TabsContext.Provider>
    );
});
