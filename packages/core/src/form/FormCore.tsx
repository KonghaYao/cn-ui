import { type Atom, classNames, ensureArrayReturn, ensureFunctionResult } from "@cn-ui/reactive";
import { createMemo } from "solid-js";
import { Dynamic, Show } from "solid-js/web";
import { Col } from "../RowAndCol";
import { ControlCenter } from "../register";
import type { PropSlot } from "../table/defineTable";
import { flexRender } from "../table/solidTable";
import { MagicFormCtx } from "./MagicFormCtx";
import "./form-core.css";
import type { RootColumnDef } from "./utils";
import { getKeyFromRootColumnDef } from "./utils";

export interface FormCoreProps<T, D> {
    "v-model": Atom<any>;
    originData?: T;
    index?: number;
    config: RootColumnDef<T, D>;
    disabled?: boolean;
    wrap?: boolean;
    span?: number;
    showLabel?: boolean;
    errorMessage?: string;
}
export function FormCore<T, D>(props: FormCoreProps<T, D>) {
    const accessorKey = createMemo(() =>
        getKeyFromRootColumnDef(props.config, props.originData as T, props.index ?? 0),
    );
    const id = createMemo(() => `cn-id-form-${accessorKey()}`);
    const isRequired = createMemo(
        () =>
            props.config.required || ensureArrayReturn(props.config.rules).some((i) => i?.required),
    );
    const formCtx = MagicFormCtx.use();
    const errorMessage = createMemo(() => {
        if (props.errorMessage) return [props.errorMessage];
        return formCtx?.validResult?.()?.fields[accessorKey()]?.map((i) => i.message as string);
    });
    return (
        <Col
            span={ensureFunctionResult(props.span) ?? props.config.span ?? 12}
            class={classNames(
                "cn-form-core relative flex",
                props.wrap ? "flex-wrap flex-col gap-2" : "gap-4",
            )}
        >
            <Show when={props.config.showLabel ?? props.showLabel}>
                <label
                    for={id()}
                    class={classNames("flex-none w-full", props.wrap ? "text-left" : "text-right")}
                    style={{ "max-width": "100px" }}
                >
                    <Show when={isRequired()}>
                        <sup class="text-red-400 pr-1">*</sup>
                    </Show>
                    {flexRender(props.config.header ?? accessorKey(), {} as any)}
                </label>
            </Show>
            <div class="flex flex-col flex-1">
                <Dynamic
                    id={id()}
                    component={ControlCenter.getApp(props.config.type as string)}
                    {...(props.config.control ?? {})}
                    {...extendsFormCoreSlotProp(props.config)}
                    options={props.config.options}
                    error={errorMessage()}
                    name={accessorKey()}
                    v-model={props["v-model"]}
                />

                <Show when={errorMessage()}>
                    <div
                        class="cn-error-message text-xs text-red-300 absolute "
                        style={{
                            top: "90%",
                        }}
                    >
                        {errorMessage()?.join("; ")}
                    </div>
                </Show>
            </div>
        </Col>
    );
}
export const extendsFormCoreSlotProp = (props: {
    /** 无值时的提示 */
    placeholder?: PropSlot<string>;
    /** 禁止操作 */
    disabled?: PropSlot<boolean>;
    /** 只读状态, 保证控件不会被输入控制 */
    readonly?: PropSlot<boolean>;
    /** 强制必填 */
    required?: PropSlot<boolean>;
}) => {
    return Object.fromEntries(
        (["placeholder", "disabled", "readonly", "required"] as const).map((i) => {
            return [i, ensureFunctionResult(props[i])];
        }),
    );
};
