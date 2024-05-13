import {
    type ExplorerAPI,
    OriginComponent,
    type OriginComponentInputType,
    useFileExplorer,
} from "@cn-ui/reactive";
import { type Accessor, For, type JSXElement } from "solid-js";
import { Icon } from "../icon";

export const FileExplorer = OriginComponent(function <T extends { name: string }>(
    props: OriginComponentInputType<{
        explorerModel: ExplorerAPI<T>;
        children: (
            item: T,
            context: ReturnType<typeof useFileExplorer<T>>,
            index: Accessor<number>,
        ) => JSXElement;
    }>,
) {
    const explorer = useFileExplorer(props.explorerModel);

    return (
        <section>
            <div class="flex gap-8">
                <div>
                    <Icon onclick={() => explorer.router.undo()}>左</Icon>
                    <Icon onclick={() => explorer.router.redo()}>右</Icon>
                    <Icon onclick={() => explorer.router.prev()}>上</Icon>
                </div>
                <div>{explorer.router.path()}</div>
            </div>

            <div>
                <For each={explorer.itemsInThisFolder()}>
                    {(item, index) => props.children(item, explorer, index)}
                </For>
            </div>
        </section>
    );
});
