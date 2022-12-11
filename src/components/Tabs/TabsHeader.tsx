import { Accessor, createSelector, For, JSX, JSXElement, useContext } from 'solid-js';
import { Button } from '@cn-ui/core';
import { OriginComponent } from '@cn-ui/use';
import { TabPaneProps } from './interface';
import { TabsContext } from './Tabs';
export interface TabsHeaderProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
    children?: (props: TabPaneProps, index: Accessor<number>) => JSXElement;
}
export const TabsHeader = OriginComponent<TabsHeaderProps, HTMLDivElement>((props) => {
    const { activeId, StateData, isSelected } = useContext(TabsContext);
    // TODO Tab 增删
    return (
        <div class={props.class('cn-tabs-header flex gap-2')}>
            <For each={StateData()}>
                {props.children ??
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
        </div>
    );
});
