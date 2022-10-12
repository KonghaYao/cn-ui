import { createMemo, mergeProps, Show, useContext } from 'solid-js';
import { OriginComponent } from '@cn-ui/use';
import { TabPaneProps } from './interface';
import { TabsContext } from './Tabs';

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
