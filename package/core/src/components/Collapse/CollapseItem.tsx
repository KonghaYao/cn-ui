import { createMemo, JSX, JSXElement, Show, useContext } from 'solid-js';
import { Atom, atom, emitEvent, extendsEvent, useEventController } from '@cn-ui/use';
import { CancelFirstRender } from '../_util/CancelFirstTime';
import { OriginComponent } from '@cn-ui/use';
import { CollapseContext } from './Collapse';
import { Icon } from '../Icon/Icon';
import { Gradient } from '../_util/design';

/**
 * @title Collapse.Item
 */
export interface CollapseItemProps extends JSX.HTMLAttributes<HTMLElement> {
    id: string;
    children: JSXElement;
    /**
     * @zh 折叠面板头部内容，允许自定义
     * @en Header content
     */
    header?: JSXElement;
    /**
     * @zh 对应 activeKey，当前面板组件的的唯一标识
     * @en Unique identifier key of the current panel item
     */
    name: string;
    /**
     * @zh 是否禁用
     * @en If true, the panel is not collapsible
     */
    disabled?: boolean;

    /**
     * @zh 同步标签，数据内外统一
     */
    value?: Atom<boolean>;

    /**
     * @zh 等级高于同步 value 值，但是只在初始化时才使用
     */
    open?: boolean;
    /**
     * @zh 面板被折叠时是否销毁节点，优先级高于 `Collapse` 的 `destroyOnHide`
     * @en If true, item will be unmounted on collapsing. (Higher priority than `Collapse.destroyOnHide`)
     */
    destroyOnHide?: boolean;
    /**
     * @zh 监控这个组件的 Trigger 事件
     * @en
     */
    onTrigger?: (key: string, state: boolean, e) => void;
}

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
