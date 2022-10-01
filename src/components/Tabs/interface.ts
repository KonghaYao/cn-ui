import { JSX, JSXElement } from 'solid-js';
import { Atom } from 'solid-use';
type CSSProperties = JSX.CSSProperties;
// import TabHeader from './tab-header/index';

/**
 * @title Tabs
 */
export interface TabsProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: JSXElement;

    /**
     * @zh 当前选中的 tab 的 id
     * @en The key of the currently selected tab
     */
    activeId?: string | Atom<string>;

    /**
     * @zh 设置为 `true` 时，将不会在组件挂载的时候渲染被隐藏的标签页。
     * @en When set to `true`, hidden tabs will not be rendered when the component is mounted.
     * @defaultValue true
     */
    lazyload?: boolean;

    /**
     * @zh `activeTab` 改变的回调
     * @en Callback when `activeTab` changed
     */
    onActiveChange?: (key: string) => void;
}

/**
 * @title Tabs.TabPane
 */
export interface TabPaneProps extends JSX.HTMLAttributes<HTMLDivElement> {
    /**
     * @zh tab 的唯一标识符号
     */
    id: string;
    children?: JSXElement;
    /**
     * @zh 选项卡的标题显示, 空则为 id
     * @en The label of Tab
     */
    label?: string | JSXElement;
    /**
     * @zh
     * 选项卡隐藏的时候是否销毁标签页内的DOM结构
     */
    destroyOnHide?: boolean;

    //  下面的属性透露给 header 使用
    /**
     * @zh 是否禁用
     * @en Whether the TabPane is disabled
     */
    disabled?: boolean;
    /**
     * @zh 动态增减标签页时是否允许关闭当前标签页
     * @en Whether to allow the tab to be closed when `editable="true"`
     */
    closable?: boolean;
}
