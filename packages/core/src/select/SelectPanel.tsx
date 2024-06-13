import {
    type JSXSlot,
    OriginComponent,
    ensureFunctionResult,
    extendsEvent,
    firstClass,
} from "@cn-ui/reactive";
import type { SelectOptionsType } from "@cn-ui/reactive";
import { type Accessor, For, type JSXElement, createEffect, createMemo } from "solid-js";
import { useEventListener } from "solidjs-use";
import { VirtualList } from "../virtualList";
import { SelectCtx } from "./SelectCtx";

export interface SelectPanelProps {
    /** 禁用点击选中状态 取消选择 */
    disallowCancelClick?: boolean;
    options: SelectOptionsType[];
    onSelected?: (item: SelectOptionsType, state: boolean) => void;
    selectedIconSlot?: JSXSlot<SelectOptionsType>;
    children?: (item: SelectOptionsType, index: Accessor<number>) => JSXElement;
}

/** 可选列表面板，需要依赖 useSelect 环境 */
export const SelectPanel = OriginComponent<SelectPanelProps, HTMLDivElement, null>((props) => {
    const selectSystem = SelectCtx.use();
    const innerContent = (item: SelectOptionsType, index: Accessor<number>) => (
        <>
            {props.children ? (
                props.children(item, index)
            ) : (
                <span class="flex-1">{item.label ?? item.value}</span>
            )}
            {ensureFunctionResult(props.selectedIconSlot, [item])}
        </>
    );

    const createClass = (item: SelectOptionsType) => {
        return firstClass.base(
            "cn-select-option flex items-center transition-colors select-none pl-4 pr-2 py-1 rounded-md",
        )(
            selectSystem.isSelected(item) && "cn-selected bg-primary-50  cursor-pointer",
            selectSystem.isDisabled(item) && "text-gray-400 cursor-not-allowed",
            "hover:bg-design-hover cursor-pointer",
        );
    };
    const triggerSelect = (item: SelectOptionsType) => {
        if (props.disallowCancelClick && selectSystem.isSelected(item)) {
            return;
        }
        const state = selectSystem.toggle(item);
        props.onSelected?.(item, state);
    };
    const isVirtual = createMemo(() => props.options.length > 100);
    const VoidSlot = () => <div class="text-center text-gray-600">无数据</div>;
    return (
        <div
            role="listbox"
            class={props.class("max-h-32 w-full ", isVirtual() ? "h-32" : "overflow-y-auto")}
            style={props.style()}
            tabIndex="0"
            {...extendsEvent(props)}
        >
            {isVirtual() ? (
                <VirtualList
                    containerHeight={128}
                    each={props.options}
                    estimateSize={24}
                    fallback={VoidSlot}
                >
                    {(item, index, { itemClass, itemRef }) => {
                        createEffect(() => {
                            itemClass(createClass(item));
                            useEventListener(itemRef, "click", () => {
                                triggerSelect(item);
                            });
                            selectSystem.isSelected(item) &&
                                itemRef()?.setAttribute("aria-selected", "true");
                            selectSystem.isDisabled(item) &&
                                itemRef()?.setAttribute("aria-disabled", "true");
                        });
                        return <>{innerContent(item, index)}</>;
                    }}
                </VirtualList>
            ) : (
                <For each={props.options} fallback={VoidSlot()}>
                    {(item, index) => {
                        return (
                            <div
                                role="option"
                                aria-selected={selectSystem.isSelected(item)}
                                aria-disabled={selectSystem.isDisabled(item)}
                                class={createClass(item)}
                                onClick={() => {
                                    triggerSelect(item);
                                }}
                            >
                                {innerContent(item, index)}
                            </div>
                        );
                    }}
                </For>
            )}
        </div>
    );
});
