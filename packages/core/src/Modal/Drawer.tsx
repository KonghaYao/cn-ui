import { OriginComponent, PortalEasy } from "@cn-ui/reactive";
import { createRuntimeRoot } from "../Message/runtime";
import { zIndexManager } from "../popover/zIndexManager";
import { Icon } from "../icon";
import { AiOutlineClose } from "solid-icons/ai";
import { Show } from "solid-js";

interface DrawerProps {
    title?: string;
    placement?: "right" | "left";
}

export const Drawer = OriginComponent<DrawerProps, HTMLDivElement, boolean>((props) => {
    const root = createRuntimeRoot("cn-ui-modal-layers");
    return (
        <PortalEasy mount={root} portalled>
            <Show when={props.model()}>
                <nav
                    class={props.class(
                        "cn-drawer",
                        "fixed top-0 h-screen bg-design-thick min-w-[15rem] shadow-1",
                        props.placement ? "right-0" : "left-0",
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
        </PortalEasy>
    );
});
