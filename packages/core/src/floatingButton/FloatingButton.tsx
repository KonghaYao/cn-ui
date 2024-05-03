import {
    type Atom,
    type JSXSlot,
    OriginComponent,
    classHelper,
    createCtx,
    ensureFunctionResult,
} from "@cn-ui/reactive";
import { AiOutlinePlus } from "solid-icons/ai";
import { For, Show } from "solid-js";
import { Button, type ButtonProps } from "../button";
import { Icon } from "../icon/Icon";

export interface FloatingButtonProps extends ButtonProps {
    absolute?: boolean;
    children?: JSXSlot;
}

export const FloatingButton = OriginComponent<FloatingButtonProps>((props) => {
    const groupCtx = FloatingGroupCtx.use();
    return (
        <Button
            circle
            type="text"
            {...(props as any)}
            class={props.class(
                " h-10 w-10 p-2 right-4 bottom-4 shadow-2 z-10 active:scale-75 transition-all duration-300 bg-design-floating",
                groupCtx ? "" : props.absolute ? "absolute" : "fixed",
            )}
            style={props.style()}
        >
            {ensureFunctionResult(props.children)}
        </Button>
    );
});
export const FloatingGroupCtx = /* @__PURE__ */ createCtx<any>(undefined, true);

interface FloatingButtonGroupProps {
    options: FloatingButtonProps[];
    switchIcon?: JSXSlot<Atom<boolean>>;
}

export const FloatingButtonGroup = OriginComponent<
    FloatingButtonGroupProps,
    HTMLDivElement,
    boolean
>(
    (props) => {
        return (
            <FloatingGroupCtx.Provider value={{}}>
                <div
                    class={props.class("fixed right-4 bottom-4 flex flex-col-reverse gap-3")}
                    style={props.style()}
                >
                    <FloatingButton
                        // @ts-ignore
                        on:click={() => {
                            props.model((i) => !i);
                        }}
                    >
                        {ensureFunctionResult(props.switchIcon ?? DefaultSwitchButton, [
                            props.model,
                        ])}
                    </FloatingButton>

                    <For each={props.options}>
                        {(item) => {
                            return <Show when={props.model()}>{FloatingButton(item as any)}</Show>;
                        }}
                    </For>
                </div>
            </FloatingGroupCtx.Provider>
        );
    },
    { modelValue: true },
);

export const DefaultSwitchButton = (model: Atom<boolean>) => (
    <Icon class={classHelper.base(model() ? "rotate-45" : "", "transition-transform")()}>
        <AiOutlinePlus />
    </Icon>
);
