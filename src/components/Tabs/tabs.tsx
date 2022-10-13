import {
    Accessor,
    createContext,
    createEffect,
    For,
    JSX,
    JSXElement,
    mergeProps,
    useContext,
} from 'solid-js';
import { atom, Atom, extendsEvent } from '@cn-ui/use';
import { Button } from '../Button';
import { OriginComponent } from '@cn-ui/use';
import { TabPaneProps, TabsProps } from './interface';
export const TabsContext = createContext<{
    /** 注册一个 Tabs */
    register: (data: TabPaneProps) => void;
    activeId: Atom<string>;
    TabsData: Atom<TabPaneProps[]>;
}>();
export interface TabsHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
    tab?: (props: TabPaneProps, index: Accessor<number>) => JSXElement;
}
export const TabsHeader = OriginComponent<TabsHeaderProps, HTMLDivElement>((props) => {
    const { activeId, TabsData } = useContext(TabsContext);
    // TODO Tab 增删
    return (
        <div class={props.class('cn-tabs-header flex')}>
            <For each={TabsData()}>
                {props.tab ??
                    ((data) => {
                        return (
                            <Button
                                class="border-none"
                                color={data.id === activeId() ? 'sky' : 'white'}
                                square
                                onClick={() => activeId(data.id)}
                            >
                                {data.id}
                            </Button>
                        );
                    })}
            </For>
        </div>
    );
});

export const Tabs = OriginComponent<TabsProps, HTMLDivElement>((props) => {
    props = mergeProps({}, props);

    const TabsData = atom<TabPaneProps[]>([]);
    const activeId = atom<null | string>(null);
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
