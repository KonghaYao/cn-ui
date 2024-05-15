import { createBlackBoard } from "@cn-ui/reactive";
import { type Component, lazy } from "solid-js";

export const ControlCenter = createBlackBoard<Record<string, any>>({
    allowSameRegister: true,
});

const createLazyComponent = <T>(load: () => Promise<T>, prop: keyof T) => {
    return lazy(async () => {
        return {
            default: (await load())[prop] as Component,
        };
    });
};
/**
 * 注册所有的 Form 控件
 * @example
 * await registerAllControlComponent(true)
 * 将会直接覆盖
 */
export const registerAllControlComponent = (preload: boolean | string[] = false) => {
    return Promise.all(
        Object.entries({
            text: createLazyComponent(() => import("../input/FormInput"), "FormInput"),
            select: createLazyComponent(() => import("../select/FormSelect"), "FormSelect"),
            number: createLazyComponent(
                () => import("../inputNumber/FormInputNumber"),
                "FormInputNumber",
            ),
            date: createLazyComponent(
                () => import("../datePicker/FormDatePicker"),
                "FormDatePicker",
            ),
            "date-range": createLazyComponent(
                () => import("../datePicker/FormDatePicker"),
                "FormDateRangePicker",
            ),
            radio: createLazyComponent(() => import("../checkbox/FormRadio"), "FormRadio"),
            checkbox: createLazyComponent(() => import("../checkbox/FormCheckBox"), "FormCheckBox"),
            cascader: createLazyComponent(() => import("../cascader/FormCascader"), "FormCascader"),
            switch: createLazyComponent(() => import("../switch/FormSwitch"), "FormSwitch"),
        }).map(([key, value]) => {
            ControlCenter.register(key, value);
            if (preload === false) return;
            if (preload === true || preload.includes(key)) {
                return value.preload();
            }
        }),
    );
};

/* @__PURE__ */ registerAllControlComponent();
