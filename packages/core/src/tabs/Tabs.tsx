import { NullAtom, OriginComponent, OriginDiv, computed } from "@cn-ui/reactive";
import type { SelectOptionsType } from "@cn-ui/reactive";
import { SelectableList, type SelectableListExpose } from "@cn-ui/reactive";
import { firstClass } from "@cn-ui/reactive";
import { AiOutlineClose, AiOutlinePlus } from "solid-icons/ai";
import { Show } from "solid-js";
import { Icon } from "../icon";

export const Tabs = OriginComponent<
    {
        options: SelectOptionsType[];
        closable?: boolean;
        addable?: boolean;
    },
    HTMLDivElement,
    SelectOptionsType
>((props) => {
    const options = computed(() => props.options);
    const selectableList = NullAtom<SelectableListExpose>(null);
    return (
        <OriginDiv prop={props} class="flex gap-2">
            <SelectableList options={options}>
                {(option, selectItem, { index, dynamicList }) => {
                    return (
                        <button
                            type="button"
                            class={firstClass.base("px-2 transition-colors rounded-md bg-gray-100")(
                                selectItem.isSelected() &&
                                    "bg-primary-500 hover:bg-primary-600 text-white ",
                                selectItem.isDisabled() && "opacity-50 cursor-pointer",
                                "hover:bg-gray-200",
                            )}
                            onclick={() => {
                                selectItem.selectHandle();
                                props.model(option); // TODO fix
                            }}
                        >
                            {selectItem.label()}
                            <Show when={props.closable}>
                                <Icon
                                    onclick={() => {
                                        dynamicList.remove(index());
                                    }}
                                >
                                    <AiOutlineClose />
                                </Icon>
                            </Show>
                        </button>
                    );
                }}
            </SelectableList>
            <Show when={props.addable}>
                <button
                    type="button"
                    class={firstClass.base("px-2 transition-colors")(
                        // selectItem.isDisabled() && 'opacity-50 cursor-pointer',
                        "hover:bg-gray-100",
                    )}
                    onclick={() => {
                        const str = prompt("i9fid9");
                        selectableList()!.dynamicList.updateList((list) =>
                            list.push({ label: str!, value: str! }),
                        );
                    }}
                >
                    <Icon>
                        <AiOutlinePlus />
                    </Icon>
                </button>
            </Show>
        </OriginDiv>
    );
});
