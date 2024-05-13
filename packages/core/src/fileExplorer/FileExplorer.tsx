import {
    type ExplorerAPI,
    type JSXSlot,
    OriginComponent,
    type OriginComponentInputType,
    ensureFunctionResult,
    extendsEvent,
    useFileExplorer,
} from "@cn-ui/reactive";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp } from "solid-icons/ai";
import { type Accessor, For, type JSXElement } from "solid-js";
import { Icon, IconButton } from "../icon";

export const FileExplorer = OriginComponent(function <T extends { name: string }>(
    props: OriginComponentInputType<{
        explorerModel: ExplorerAPI<T>;
        children: (
            item: T,
            context: ReturnType<typeof useFileExplorer<T>>,
            index: Accessor<number>,
        ) => JSXElement;
        emptyView?: JSXSlot;
    }>,
) {
    const explorer = useFileExplorer(props.explorerModel);

    return (
        <section
            ref={props.ref}
            class={props.class()}
            style={props.style()}
            {...extendsEvent(props)}
        >
            <div class="flex gap-8 bg-gray-100 p-1 rounded-md mb-2">
                <div>
                    <IconButton aria-label="undo control" onclick={() => explorer.router.undo()}>
                        <AiOutlineArrowLeft />
                    </IconButton>
                    <IconButton aria-label="redo control" onclick={() => explorer.router.redo()}>
                        <AiOutlineArrowRight />
                    </IconButton>
                    <IconButton aria-label="prev level" onclick={() => explorer.router.prev()}>
                        <AiOutlineArrowUp />
                    </IconButton>
                </div>
                <ul class="flex items-center">
                    <For each={props.explorerModel.paths()} fallback={<li>{"/"}</li>}>
                        {(path, index) => {
                            return (
                                <>
                                    <li class="px-1 select-none cursor-default" aria-hidden>
                                        {"/"}
                                    </li>
                                    <li
                                        class="cursor-pointer"
                                        onclick={() =>
                                            props.explorerModel.paths((i) =>
                                                i.slice(0, index() + 1),
                                            )
                                        }
                                    >
                                        {path}
                                    </li>
                                </>
                            );
                        }}
                    </For>
                </ul>
            </div>
            <ul>
                <For
                    each={explorer.itemsInThisFolder()}
                    fallback={ensureFunctionResult(props.emptyView)}
                >
                    {(item, index) => props.children(item, explorer, index)}
                </For>
            </ul>
        </section>
    );
});
