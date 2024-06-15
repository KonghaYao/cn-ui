import { type Atom, OriginComponent, computed, useSelect } from "@cn-ui/reactive";
import type { SelectOptionsType } from "@cn-ui/reactive";
import { For, createEffect } from "solid-js";
import { type BaseFormItemType, extendsBaseFormItemProp } from "../form/BaseFormItemType";
import { Checkbox, CheckboxGroupCtx, type CheckboxProps } from "./Checkbox";

export interface CheckboxGroupExpose extends ReturnType<typeof useSelect<SelectOptionsType>> {}
export interface CheckboxGroupProps extends BaseFormItemType {
    /**
     * 生成选项
     * @tested
     */
    options: CheckboxProps[];
    expose?: (expose: CheckboxGroupExpose) => void;
    /**
     * 是否支持多选
     * @tested
     */
    multiple?: boolean;
}

export const CheckboxGroup = OriginComponent<CheckboxGroupProps, HTMLElement, string[]>((props) => {
    !Array.isArray(props.model()) && props.model([]);
    const selectSetting = useSelect<SelectOptionsType>(() => props.options, {
        multi: () => props.multiple ?? true,
    });
    selectSetting.syncIdArrayModel(props.model);
    const options = computed(() => {
        if (typeof props.options[0] === "object") {
            return props.options as CheckboxProps[];
        }
        return props.options.map((i) => ({
            value: i.toString(),
            label: i.toString(),
        }));
    });
    props.expose?.(selectSetting);
    return (
        <CheckboxGroupCtx.Provider value={selectSetting}>
            <For each={options()}>
                {(config) => {
                    return <Checkbox {...extendsBaseFormItemProp(props)} {...config} />;
                }}
            </For>
        </CheckboxGroupCtx.Provider>
    );
});
/** 全选不选按钮的 hook */
export const useControlCheckbox = (checkBoxCtx: Atom<CheckboxGroupExpose | null>) => {
    const isAllChecked = computed(() => checkBoxCtx()?.isAllSelected() ?? false);
    return {
        isAllChecked,
        indeterminate: computed(() => checkBoxCtx()?.isIndeterminate()),
        onChange() {
            const val = checkBoxCtx()?.isAllSelected();
            if (val || checkBoxCtx()?.isIndeterminate()) {
                return checkBoxCtx()?.clearAll();
            }
            return checkBoxCtx()?.selectAll();
        },
    };
};
