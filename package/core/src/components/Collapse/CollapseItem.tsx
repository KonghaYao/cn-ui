import { createMemo, Show, useContext } from 'solid-js';
import { atom, emitEvent, extendsEvent, useEventController } from '@cn-ui/use';
import { CollapseItemProps } from './interface';
import { CancelFirstRender } from '../_util/CancelFirstTime';
import { OriginComponent } from '@cn-ui/use';
import { CollapseContext } from './Collapse';
import { Icon } from '@cn-ui/core';
import { Gradient } from '../_util/design';

export const CollapseItem = OriginComponent<CollapseItemProps, HTMLElement>((props) => {
    const { destroyOnHide, lazyload, isSelected, changeSelected } = useContext(CollapseContext);
    const isExpanded = createMemo(() => isSelected(props.id));
    const Content = () => {
        return <Show when={!destroyOnHide() || isExpanded()}>{props.children}</Show>;
    };
    const control = useEventController({});
    return (
        <div
            ref={props.ref as any}
            class={props.class(
                'cn-collapse-item box-border flex h-full flex-col overflow-hidden rounded-2xl p-1'
            )}
            style={props.style}
            classList={{
                disabled: props.disabled,
            }}
            {...extendsEvent(props)}
        >
            <nav
                class={
                    'cn-collapse-summary cursor-pointer select-none rounded-2xl bg-gradient-to-b px-4 py-3 leading-none shadow-suit active:backdrop-brightness-90 ' +
                    Gradient.white
                }
                onClick={control([
                    (e) => {
                        changeSelected(props.id);
                    },
                    emitEvent(props.onTrigger, ([e]) => [props.name, isExpanded(), e] as const),
                ])}
                /** @ts-ignore */
                open={isExpanded()}
            >
                {props.header}

                <Icon
                    class="float-right scale-125 text-slate-400"
                    name={isExpanded() ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                ></Icon>
            </nav>
            <main
                class="cn-collapse-container "
                classList={{
                    show: isExpanded(),
                    hide: !isExpanded(),
                }}
            >
                {lazyload() ? (
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
