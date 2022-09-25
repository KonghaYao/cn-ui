import {
    Component,
    createContext,
    createMemo,
    JSXElement,
    mergeProps,
    ParentComponent,
    useContext,
} from 'solid-js';
import { atom } from 'solid-use';
import { GlobalConfigStore } from '../GlobalConfigStore';
import { Icon } from '../Icon';
import { CollapseItemProps, CollapseProps } from './interface';

import cs from '../_util/classNames';
const CollapseContext = createContext<{
    expandIcon?: JSXElement;
    activeKeys: string[];
    expandIconPosition?: 'left' | 'right';
    lazyload?: boolean;
    destroyOnHide?: boolean;
    onToggle?: (_key: string, _e) => void;
}>();
export const Collapse: Component<CollapseProps> = (baseProps) => {
    const { componentConfig, rtl } = GlobalConfigStore;
    const props: CollapseProps = mergeProps({}, componentConfig?.Collapse, baseProps);

    const activeKeys = atom(props.activeKey);
    const { lazyload, expandIcon, expandIconPosition, destroyOnHide, accordion, onChange } = props;

    const onItemClick = (key: string, e): void => {
        let newActiveKeys = [...activeKeys()];
        const index = newActiveKeys.indexOf(key);
        if (index > -1) {
            newActiveKeys.splice(index, 1);
        } else if (accordion) {
            newActiveKeys = [key];
        } else {
            newActiveKeys.push(key);
        }
        if (!('activeKey' in props)) {
            activeKeys(newActiveKeys);
        }
        onChange && onChange(key, newActiveKeys, e);
    };

    return (
        <CollapseContext.Provider
            value={{
                activeKeys: activeKeys(),
                onToggle: onItemClick,
                lazyload,
                expandIcon: props.expandIcon || (
                    <Icon
                        name={expandIconPosition === 'right' ? 'arrow_drop_down' : 'arrow_drop_up'}
                    />
                ),
                destroyOnHide,
                expandIconPosition,
            }}
        >
            <article
                {...(props as any)}
                class={cs(
                    '.cn-collapse',
                    props.bordered ? 'border' : 'borderless',

                    props.className
                )}
                classList={{ rtl: rtl }}
                style={props.style}
            >
                {props.children}
            </article>
        </CollapseContext.Provider>
    );
};
export const CollapseItem: Component<CollapseItemProps> = (props) => {
    const ctx = useContext(CollapseContext);
    props = mergeProps({ showExpendIcon: true }, props);
    const isExpanded = createMemo(() => ctx.activeKeys.indexOf(props.name) > -1);
    const icon = props.showExpandIcon ? props.expandIcon || ctx.expandIcon : null;
    return (
        <details
            class={cs('cn-collapse-item', props.className)}
            open={isExpanded()}
            classList={{
                [`no-icon`]: !icon,
                [`disabled`]: props.disabled,
            }}
            style={props.style}
        >
            <summary>{props.header}</summary>
            {props.children}
        </details>
    );
};
