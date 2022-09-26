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
    Switch,
    useContext,
} from 'solid-js';
import { Atom, atom } from 'solid-use';
import { GlobalConfigStore } from '../GlobalConfigStore';
import { Icon } from '../Icon';
import { CollapseItemProps, CollapseProps } from './interface';

import cs from '../_util/classNames';
import { untrack } from 'solid-js/web';
import './style/index.less';
import { CancelFirstRender } from '../_util/CancelFirstTime';
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

                onToggle: (key, state, e) => {
                    const c = controllers();
                    if (props.accordion && state) {
                        Object.entries(c).forEach(([name, toggle]) => {
                            if (key !== name) toggle(false);
                        });
                    }
                    props.onChange && props.onChange(key, e);
                },
                destroyOnHide,
                expandIconPosition,
            }}
        >
            <article
                {...(props as any)}
                class={cs('cn-collapse', props.bordered ? 'border' : 'borderless', props.className)}
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
    props = mergeProps({}, props);

    const initExpanded = (props.value && props.value()) || ctx.activeKeys.indexOf(props.name) > -1;
    const isExpanded = atom(initExpanded);
    /** 阻止回环的函数 */
    const _isExpanded = (a?: boolean, _cancelNext = true) => {
        if (typeof a === 'boolean') {
            if (isExpanded() !== a) cancelNext = _cancelNext;
        }
        return isExpanded(a);
    };

    if (props.value) {
        let outlet = undefined;
        createEffect(() => {
            if (outlet === props.value()) return;
            outlet = props.value();
            console.log('监听到 value 变化', outlet, props.value());
            // * 取消下一次是防止 value 回环
            _isExpanded(props.value());
        });
    }

    /** 用于取消下一次操作避免回环 */
    let cancelNext = false;
    // 移交 Expanded 的控制权
    onMount(() => {
        ctx.CommitController((val) => ({
            ...val,
            [props.name]: _isExpanded,
        }));
    });
    onCleanup(() => {
        ctx.CommitController((val) => {
            delete val[props.name];
            return val;
        });
    });

    const Content = () => {
        return ctx.destroyOnHide ? (
            <Show when={isExpanded()}>{props.children}</Show>
        ) : (
            props.children
        );
    };
    return (
        <details
            class={cs('cn-collapse-item', props.className)}
            open={isExpanded()}
            classList={{
                disabled: props.disabled,
            }}
            // ! ontoggle 是 open 被改变后就会触发，所以函数也也可以触发导致回环
            ontoggle={(e) => {
                const state = !isExpanded();
                if (cancelNext) {
                    cancelNext = false;
                } else {
                    isExpanded(state);
                    props.value && props.value(state);
                }
                props.onTrigger && props.onTrigger(props.name, state, e);
                if (!e.cancelBubble) {
                    ctx.onToggle(props.name, state, e);
                }
            }}
            style={props.style}
        >
            <summary class="cn-collapse-summary">{props.header}</summary>
            {/* TODO Collapse 的动态效果没有实现 */}
            <div
                class="cn-collapse-container"
                classList={{
                    show: isExpanded(),
                }}
                style={props.contentStyle}
            >
                {ctx.lazyload ? (
                    <CancelFirstRender trigger={isExpanded}>
                        <Content></Content>
                    </CancelFirstRender>
                ) : (
                    <Content></Content>
                )}
            </div>
        </details>
    );
};
