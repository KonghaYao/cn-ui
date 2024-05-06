import { OriginComponent, PortalEasy } from "@cn-ui/reactive";
import { AiOutlineClose } from "solid-icons/ai";
import { Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { createRuntimeRoot } from "../Message/runtime";
import "../animation/slideFromLeft.css";
import "../animation/slideFromRight.css";
import { Icon } from "../icon";
import { zIndexManager } from "../popover/zIndexManager";

interface DrawerProps {
    title?: string;
    placement?: "right" | "left";
}

export const Drawer = OriginComponent<DrawerProps, HTMLDivElement, boolean>((props) => {
    const root = createRuntimeRoot("cn-ui-modal-layers");
    return (
        <PortalEasy mount={root} portalled>
            <Transition
                name={props.placement === "left" ? "cn-slide-from-left" : "cn-slide-from-right"}
            >
                <Show when={props.model()}>
                    <nav
                        class={props.class(
                            "cn-drawer",
                            "fixed top-0 h-screen bg-design-thick min-w-[15rem] shadow-1",
                            props.placement === "left" ? "left-0" : "right-0",
                        )}
                        style={{ "z-index": zIndexManager.getIndex() }}
                    >
                        <header class="flex p-4 text-xl border-b border-design-separator ">
                            <Icon
                                class="cursor-pointer text-design-secondary pr-4"
                                onclick={() => {
                                    props.model(false);
                                }}
                            >
                                <AiOutlineClose />
                            </Icon>

                            <h3 class="flex-1 font-bold ">{props.title}</h3>
                        </header>
                        <div class="p-4">{props.children}</div>
                    </nav>
                </Show>
            </Transition>
        </PortalEasy>
    );
});
