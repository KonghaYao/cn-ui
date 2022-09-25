import {
    Component,
    createContext,
    createEffect,
    createMemo,
    createSignal,
    JSXElement,
    mergeProps,
    onCleanup,
    onMount,
    ParentComponent,
    Show,
    useContext,
} from 'solid-js';
import { Atom, atom } from 'solid-use';
import { GlobalConfigStore } from '../GlobalConfigStore';
import { Icon } from '../Icon';
import { CollapseItemProps, CollapseProps } from './interface';

import cs from '../_util/classNames';
import { untrack } from 'solid-js/web';

type Controller = { [key: string]: Atom<boolean> };
const CollapseContext = createContext<{
    expandIcon?: JSXElement;
    activeKeys: string[];
    expandIconPosition?: 'left' | 'right';
    lazyload?: boolean;
    destroyOnHide?: boolean;
    onToggle?: (_key: string, state: boolean, _e) => void;
    CommitController: (c: (c: Controller) => Controller) => void;
}>();
export const Collapse: Component<CollapseProps> = (baseProps) => {
    const { componentConfig, rtl } = GlobalConfigStore;
    const props: CollapseProps = mergeProps({}, componentConfig?.Collapse, baseProps);

    const activeKeys = atom(props.activeKey);

    const [controllers, CommitController] = createSignal<Controller>({}, { equals: false });
    const { lazyload, expandIconPosition, destroyOnHide } = props;

    return (
        <CollapseContext.Provider
            value={{
                activeKeys: activeKeys(),
                CommitController,
                lazyload,
                expandIcon: props.expandIcon || (
                    <Icon
                        name={expandIconPosition === 'right' ? 'arrow_drop_down' : 'arrow_drop_up'}
                    />
                ),
                onToggle: (key, state, e) => {
                    const c = controllers();
                    if (props.accordion && state) {
                        Object.entries(c).forEach(([name, toggle]) => {
                            if (key !== name) toggle(false);
                        });
                    }
                },
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
    const initExpanded = ctx.activeKeys.indexOf(props.name) > -1;
    const isExpanded = atom(initExpanded);

    /** 用于取消下一次操作避免回环 */
    let cancelNext = false;
    // 移交 Expanded 的控制权
    onMount(() => {
        ctx.CommitController((val) => ({
            ...val,
            [props.name]: (a?: boolean) => {
                if (isExpanded() !== a) cancelNext = true;
                return isExpanded(a);
            },
        }));
    });
    onCleanup(() => {
        ctx.CommitController((val) => {
            delete val[props.name];
            return val;
        });
    });
    const icon = props.showExpandIcon ? props.expandIcon || ctx.expandIcon : null;
    return (
        <details
            class={cs('cn-collapse-item', props.className)}
            open={isExpanded()}
            classList={{
                [`no-icon`]: !icon,
                [`disabled`]: props.disabled,
            }}
            // ! ontoggle 是 open 被改变后就会触发，所以函数也也可以触发导致回环
            ontoggle={(e) => {
                if (cancelNext) {
                    cancelNext = false;
                    return;
                }
                const state = !isExpanded();
                isExpanded(state);
                ctx.onToggle(props.name, state, e);
            }}
            style={props.style}
        >
            <summary>{props.header}</summary>
            {ctx.destroyOnHide ? <Show when={isExpanded()}>{props.children}</Show> : props.children}
        </details>
    );
};
