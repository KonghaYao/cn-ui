import { createEffect, mergeProps } from 'solid-js';
import { atom, atomization, extendsEvent } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import { TabPaneProps, TabsProps } from './interface';
import { TabsContext } from './components/TabsContext';

export const Tabs = OriginComponent<TabsProps, HTMLDivElement>((props) => {
    props = mergeProps({}, props);

    const TabsData = atom<TabPaneProps[]>([]);
    // fixed：修复无法继承的错误
    const activeId = atomization<string>(props.activeId);
    createEffect(() => {
        if (TabsData().length && activeId() === null) {
            activeId(TabsData()[0].id);
        }
    });
    return (
        <TabsContext.Provider
            value={{
                register(data) {
                    TabsData([...TabsData(), data]);
                },
                activeId,
                TabsData,
            }}
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
