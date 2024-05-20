import { type Atom, atom, ensureFunctionResult } from "@cn-ui/reactive";
import { Show, createEffect, onCleanup } from "solid-js";
import { Transition } from "solid-transition-group";
import { type FloatingArea, createRuntimeArea } from "../Message/runtime";
import "../animation/opacity-fade.css";
export class MaskTemplate implements FloatingArea<unknown> {
    constructor(public id: string) {
        createRuntimeArea(id, () => this.render());
    }
    show = atom(false);
    events: (() => void)[] = [];
    onClick(event: () => void) {
        this.events.push(event);
        onCleanup(() => {
            this.events = this.events.filter((i) => i !== event);
        });
        this.show(false);
    }
    /** 绑定数据模型 */
    bindModel(model: Atom<boolean>) {
        createEffect(() => {
            this.show(model());
        });
        this.onClick(() => {
            model(false);
        });
    }
    render() {
        return (
            <Transition name="cn-opacity-fade">
                <Show when={this.show()}>
                    <nav
                        class="h-full w-full fixed z-[200] bg-gray-700/70 top-0 left-0"
                        onclick={() => {
                            this.events.map((i) => ensureFunctionResult(i));
                        }}
                    ></nav>
                </Show>
            </Transition>
        );
    }
}
export const GlobalMask = /* @__PURE__ */ new MaskTemplate("cn-ui-mask");
