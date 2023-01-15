import { Accessor, createSelector, For, JSX, JSXElement, useContext } from 'solid-js';
// import { Button } from '@cn-ui/core';
import { OriginComponent } from '@cn-ui/use';
import { TabsContext, TabsContextType } from './Tabs';
export interface DefaultTabHeaderButton {
    (props: string, index: TabsContextType): JSXElement;
}
export interface TabsHeaderProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
    children?: DefaultTabHeaderButton;
}

let DefaultButton: DefaultTabHeaderButton = () => null;

/**
 *
 * @example (name,context)=> (
    <Button
        class="border-none"
        color={context.isSelected(name) ? 'blue' : 'white'}
        size="mini"
        onClick={() => context.changeSelected(name, true)}
    >
        {name}
    </Button>
)
 */
export const registerDefaultTabButton = (comp: DefaultTabHeaderButton) => {
    DefaultButton = comp;
};
export const TabsHeader = OriginComponent<TabsHeaderProps, HTMLDivElement>((props) => {
    const context = useContext(TabsContext);
    return (
        <div class={props.class('cn-tabs-header flex gap-2')}>
            <For each={[...context.allRegistered()]}>
                {(name) => {
                    if (typeof props.children === 'function') {
                        return props.children(name, context);
                    } else {
                        return DefaultButton(name, context);
                    }
                }}
            </For>
        </div>
    );
});
