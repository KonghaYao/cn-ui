import { mergeProps, onCleanup, onMount, Show, useContext } from 'solid-js';
import { atom, emitEvent, extendsEvent, useEventController } from '@cn-ui/use';
import { CollapseItemProps } from './interface';
import { CancelFirstRender } from '../_util/CancelFirstTime';
import { OriginComponent } from '@cn-ui/use';
import { CollapseContext } from './index';

export const CollapseItem = OriginComponent<CollapseItemProps, HTMLElement>((props) => {
    const ctx = useContext(CollapseContext);
    props = mergeProps({}, props);
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
    const control = useEventController({});
    return (
        <div
            ref={props.ref as any}
            class={props.class(
                'cn-collapse-item box-border flex h-full flex-col overflow-hidden border-b border-solid border-slate-200'
            )}
            style={props.style}
            classList={{
                disabled: props.disabled,
            }}
            {...extendsEvent(props)}
        >
            <nav
                class="cn-collapse-summary cursor-pointer select-none px-4 py-2 leading-none"
                onClick={control([
                    (e) => {
                        const state = !isExpanded();
                        // isExpanded(state);
                        ctx.onToggle(props.name, state, e);
                    },
                    emitEvent(props.onTrigger, ([e]) => [props.name, isExpanded(), e] as const),
                ])}
            >
                {props.header}
            </nav>
            <main
                class="cn-collapse-container bg-slate-50 "
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
            </main>
        </div>
    );
});
