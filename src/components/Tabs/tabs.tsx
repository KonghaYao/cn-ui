import {
    children,
    createContext,
    createEffect,
    createMemo,
    For,
    JSXElement,
    mergeProps,
    onCleanup,
    onMount,
    Show,
    useContext,
} from 'solid-js';
import { atom, Atom } from '@cn-ui/use';
import { Button } from '../Button';
import { Space } from '../Space';
import { Tag } from '../Tag';
import { OriginComponent } from '@cn-ui/use';
import { TabPaneProps, TabsProps } from './interface';
const TabsContext = createContext<{
    /** 注册一个 Tabs */
    register: (data: TabPaneProps) => void;
    activeId: Atom<string>;
    TabsData: Atom<TabPaneProps[]>;
}>();

export const TabsHeader = OriginComponent<{}, HTMLDivElement>((props) => {
    const { activeId, TabsData } = useContext(TabsContext);
    // TODO Tab 增删
    return (
        <Space ref={props.ref} size={4} class={props.class('cn-tabs-header')} style={props.style}>
            <For each={TabsData()}>
                {(data) => {
                    return (
                        <Button
                            size="mini"
                            type={data.id === activeId() ? 'primary' : 'text'}
                            onClick={() => activeId(data.id)}
                        >
                            {data.id}
                        </Button>
                    );
                }}
            </For>
        </Space>
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
            <div ref={props.ref} class={props.class('cn-tabs')} style={props.style}>
                {props.children}
            </div>
        </TabsContext.Provider>
    );
});

export const Tab = OriginComponent<TabPaneProps, HTMLDivElement>((props) => {
    const { activeId, register } = useContext(TabsContext);
    props = mergeProps(
        {
            destroyOnHide: true,
        },
        props
    );
    register(props as any);

    const show = createMemo(() => {
        if (!props.destroyOnHide) return true;
        return props.destroyOnHide && activeId() === props.id;
    });

    return (
        <Show when={show()}>
            <div
                ref={props.ref}
                class={props.class()}
                style={{ display: activeId() === props.id ? 'block' : 'none', ...props.style }}
            >
                {props.children}
            </div>
        </Show>
    );
});
