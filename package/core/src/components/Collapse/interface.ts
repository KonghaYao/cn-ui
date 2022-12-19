import { JSX, JSXElement } from 'solid-js';
import { Atom } from '@cn-ui/use';

/**
 * @title Collapse
 */
export interface CollapseProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children: JSXElement;

    /**
     * @zh 是否是手风琴模式
     * @en Whether to render as Accordion
     */
    accordion?: boolean;

    /**
     * @zh 设置为 `true` 时，挂载时不会渲染被隐藏的面板。
     * @en If true, invisible panels will not be rendered on mount
     * @defaultValue true
     */
    lazyload?: boolean;
    /**
     * @zh 是否销毁被折叠的面板
     * @en If true, panels will be unmounted on collapsing
     */
    destroyOnHide?: boolean;
    /**
     * @zh 展开面板改变时触发
     * @en Callback when the active panel changes
     */
    onPanelChange?: (key: string, e) => void;
}

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
