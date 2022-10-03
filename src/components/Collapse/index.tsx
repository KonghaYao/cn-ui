import {
    Component,
    createContext,
    createEffect,
    createSignal,
    mergeProps,
    onCleanup,
    onMount,
    Show,
    useContext,
} from 'solid-js';
import { Atom, atom } from '@cn-ui/use';
import { GlobalConfigStore } from '../GlobalConfigStore';
import { CollapseItemProps, CollapseProps } from './interface';

import './style/index.less';
import { CancelFirstRender } from '../_util/CancelFirstTime';
import { OriginComponent } from '@cn-ui/use';
import { Transition } from '../../Transition/Transition';

type Controller = { [key: string]: Atom<boolean> };
const CollapseContext = createContext<{
    lazyload?: boolean;
    destroyOnHide?: boolean;
    onToggle?: (_key: string, state: boolean, _e) => void;
    CommitController: (c: (c: Controller) => Controller) => void;
}>();

export const Collapse = OriginComponent<CollapseProps, HTMLDivElement>((props) => {
    const { componentConfig, rtl } = GlobalConfigStore;
    props = mergeProps({}, componentConfig?.Collapse, props);

    const [controllers, CommitController] = createSignal<Controller>({}, { equals: false });
    const { lazyload, destroyOnHide } = props;

    return (
        <CollapseContext.Provider
            value={{
                CommitController,
                lazyload,

                onToggle: (key, state, e) => {
                    const c = controllers();
                    if (props.accordion && state) {
                        Object.entries(c).forEach(([name, toggle]) => {
                            if (key !== name) toggle(false);
                        });
                    }
                    props.onPanelChange && props.onPanelChange(key, e);
                },
                destroyOnHide,
            }}
        >
            <div
                class={props.class('cn-collapse')}
                classList={{ rtl: rtl }}
                style={props.style}
                ref={props.ref}
            >
                {props.children}
            </div>
        </CollapseContext.Provider>
    );
});
export const CollapseItem = OriginComponent<CollapseItemProps, HTMLElement>((props) => {
    const ctx = useContext(CollapseContext);
    props = mergeProps({}, props);
    /** 用于取消下一次 toggle 避免回环 */
    let cancelNext = false;
    const isExpanded = props.value ?? atom(false);

    // 移交 Expanded 的控制权
    onMount(() => {
        ctx.CommitController((val) => ({
            ...val,
            [props.name]: isExpanded, // 强制注入
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
        <div
            ref={props.ref as any}
            class={props.class(
                'cn-collapse-item border-b border-solid border-gray-200 box-border flex flex-col overflow-hidden h-full'
            )}
            style={props.style}
            classList={{
                disabled: props.disabled,
            }}
        >
            <nav
                class="cn-collapse-summary select-none cursor-pointer leading-none px-4 py-2"
                onclick={(e) => {
                    const state = !isExpanded();
                    isExpanded(state);
                    props.onTrigger && props.onTrigger(props.name, state, e);
                    if (!e.cancelBubble) {
                        ctx.onToggle(props.name, state, e);
                    }
                }}
            >
                {props.header}
            </nav>
            <nav
                class="cn-collapse-container bg-gray-100 "
                classList={{
                    show: isExpanded(),
                    hide: !isExpanded(),
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
            </nav>
        </div>
    );
});
