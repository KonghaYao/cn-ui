import { Accessor, createSelector, For, JSX, JSXElement, useContext } from 'solid-js';
import { Button } from '@cn-ui/core';
import { OriginComponent } from '@cn-ui/use';
import { TabPaneProps } from './interface';
import { TabsContext } from './Tabs';
export interface TabsHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
    tab?: (props: TabPaneProps, index: Accessor<number>) => JSXElement;
    children?: JSXElement;
}
export const TabsHeader = OriginComponent<TabsHeaderProps, HTMLDivElement>((props) => {
    const { activeId, StateData } = useContext(TabsContext);
    const isSelected = createSelector(activeId);
    // TODO Tab 增删
    return (
        <div class={props.class('cn-tabs-header flex')}>
            <For each={StateData()}>
                {props.tab ??
                    ((data) => {
                        return (
                            <Button
                                class="border-none"
                                color={isSelected(data.id) ? 'blue' : 'white'}
                                size="mini"
                                onClick={() => activeId(data.id)}
                            >
                                {data.id}
                            </Button>
                        );
                    })}
            </For>
            {props.children}
        </div>
    );
});
