import { Accessor, createSelector, For, JSX, JSXElement, useContext } from 'solid-js';

import { OriginComponent } from '@cn-ui/use';
import { TabsContext } from './Tabs';
import { Button } from '../Button';
export interface TabsHeaderProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
    children?: (props: string, index: Accessor<number>) => JSXElement;
}
export const TabsHeader = OriginComponent<TabsHeaderProps, HTMLDivElement>((props) => {
    const { isSelected, allRegistered, changeSelected } = useContext(TabsContext);
    // TODO Tab 增删
    return (
        <div class={props.class('cn-tabs-header flex gap-2')}>
            <For each={[...allRegistered()]}>
                {typeof props.children === 'function'
                    ? props.children
                    : (name) => {
                          return (
                              <Button
                                  class="border-none"
                                  color={isSelected(name) ? 'blue' : 'white'}
                                  size="mini"
                                  onClick={() => changeSelected(name, true)}
                              >
                                  {name}
                              </Button>
                          );
                      }}
            </For>
        </div>
    );
});
