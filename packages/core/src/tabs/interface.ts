import { Component, JSX, JSXElement } from 'solid-js'
/**
 * @title Tabs
 */
export interface TabsProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: JSXElement
    /** 替换原来的 Header */
    header?: Component
    /**
     * @zh
     * 选项卡隐藏的时候是否销毁标签页内的DOM结构，子代默认行为
     */
    destroyOnHide?: boolean
    /**
     * @zh `activeTab` 改变的回调
     * @en Callback when `activeTab` changed
     */
    onActiveChange?: (key: string) => void

    /** 所有 tabs 的父级*/
    wrapperClass?: string

    /** 是否采用 100% 高度扩展 */
    fill?: boolean
}

/**
 * @title Tabs.TabPane
 */
export interface TabPaneProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
    /**
     * @zh tab 的唯一标识符号
     */
    name: string
    children?: JSXElement | (() => JSXElement)
    /**
     * @zh 选项卡的标题显示, 空则为 name
     * @en The label of Tab
     */
    label?: string | JSXElement
    /**
     * @zh
     * 选项卡隐藏的时候是否销毁标签页内的DOM结构
     */
    destroyOnHide?: boolean

    //  下面的属性透露给 header 使用
    /**
     * @zh 是否禁用
     * @en Whether the TabPane is disabled
     */
    disabled?: boolean
    /**
     * @zh 动态增减标签页时是否允许关闭当前标签页
     * @en Whether to allow the tab to be closed when `editable="true"`
     */
    closable?: boolean
}
