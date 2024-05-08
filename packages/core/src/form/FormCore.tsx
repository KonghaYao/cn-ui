import { type Atom, classNames, createBlackBoard, ensureArrayReturn } from "@cn-ui/reactive";
import { createMemo } from "solid-js";
import { Dynamic, Show } from "solid-js/web";
import { Col } from "../RowAndCol";
import { flexRender } from "../table/solidTable";
import { MagicFormCtx } from "./MagicForm";
import "./form-core.css";
import type { RootColumnDef } from "./utils";
import { getKeyFromRootColumnDef } from "./utils";
export const FormCoreRegister = createBlackBoard<Record<string, any>>();

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
            span={props.span ?? props.config.span ?? 12}
            class={classNames(
                "cn-form-core relative flex",
                props.wrap ? "flex-wrap flex-col gap-2" : "gap-4",
            )}
        >
            <Show when={props.showLabel}>
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
                    component={FormCoreRegister.getApp(props.config.type as string)}
                    {...props.config}
                    error={errorMessage()}
                    disabled={props.disabled}
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
