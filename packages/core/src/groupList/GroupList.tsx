import {
    type JSXSlot,
    OriginComponent,
    classNames,
    computed,
    ensureFunctionResult,
} from "@cn-ui/reactive";
import type { SelectOptionsType } from "@cn-ui/reactive";
import { AiOutlineRight } from "solid-icons/ai";
import { For, Show } from "solid-js";
import { Icon } from "../icon/Icon";
import { Popover, type PopoverProps } from "../popover";
import { flatLoop } from "./flatLoop";

export interface CommonGroupListConfig extends SelectOptionsType {
    /** @private */
    level?: number;
    /** 在此之后显示分隔符号 */
    withSeparate?: boolean;
    description?: JSXSlot;
    icon?: JSXSlot;
    onClick?: () => void;
    options?: CommonGroupListConfig[];
}

export interface GroupListProps {
    options: CommonGroupListConfig[];
    /** 列表模式 */
    unfold?: boolean;
    /** @private  无边框模式*/
    pure?: boolean;
    /** 赋予 fold popover 的初始状态 */
    open?: ((item: CommonGroupListConfig) => boolean) | boolean;
    /** 从 0 开始的层级数 */
    level?: number;
    trigger?: PopoverProps["trigger"];
}
const isGroupListConfigWithOptions = (item: CommonGroupListConfig) => {
    if ("options" in item) return true;
    return false;
};
export const GroupList = OriginComponent<GroupListProps>((props) => {
    const flatOptions = computed(() => {
        if (!props.unfold)
            return props.options.map((i) => {
                return { ...i, level: props.level ?? 0 };
            });
        return flatLoop(props.options as any, [], props.level ?? 0) as CommonGroupListConfig[];
    });
    const innerContent = (item: CommonGroupListConfig) => {
        const isHeader = computed(() => isGroupListConfigWithOptions(item) && props.unfold);
        return (
            <>
                <li
                    class={classNames(
                        isHeader() ? "text-design-h2" : "hover:bg-gray-100",
                        "w-full rounded-md transition-transform cursor-pointer",
                    )}
                    onclick={() => ensureFunctionResult(item.onClick)}
                >
                    <div class={classNames("w-full px-1 py-1")}>
                        <Show when={!isHeader()}>
                            <Icon class="w-4 h-4 mr-2">{ensureFunctionResult(item.icon)}</Icon>
                        </Show>

                        <span class="w-24 inline-flex justify-between">
                            <span>{item.label ?? item.value}</span>
                            <span>{ensureFunctionResult(item.description)}</span>
                        </span>

                        <Show when={!isHeader() && item.options}>
                            <Icon class="w-4 h-4">
                                <AiOutlineRight />
                            </Icon>
                        </Show>
                    </div>
                </li>
                <Show when={item.withSeparate}>
                    <hr />
                </Show>
            </>
        );
    };

    const VoidSlot = () => <span>无数据</span>;

    return (
        <ul class={classNames("flex flex-col", !props.pure && "p-2 shadow-3 rounded-md")}>
            <For each={flatOptions()} fallback={VoidSlot()}>
                {(item) => {
                    if (!props.unfold && "options" in item) {
                        const open = computed(() => ensureFunctionResult(props.open, [item]));
                        return (
                            <Popover
                                trigger={props.trigger ?? "click"}
                                v-model={open}
                                content={() => (
                                    <GroupList
                                        trigger={props.trigger}
                                        level={props.level! + 1}
                                        options={item.options!}
                                        pure
                                    />
                                )}
                                placement="right"
                            >
                                {innerContent(item)}
                            </Popover>
                        );
                    }
                    return <>{innerContent(item)}</>;
                }}
            </For>
        </ul>
    );
});
