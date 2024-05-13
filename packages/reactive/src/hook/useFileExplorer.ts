import { useDebouncedHistoryTravel } from "solidjs-use";
import { type Atom, resource } from "../atom";
import type { MaybePromise } from "../typeUtils";

export interface ExplorerAPI<FileOrFolderType> {
    paths: Atom<string[]>;
    listItems(paths: string[]): MaybePromise<FileOrFolderType[]>;
    isFile(item: FileOrFolderType): MaybePromise<boolean>;
    isFolder(item: FileOrFolderType): MaybePromise<boolean>;
}
export const useFileExplorer = <FileOrFolderType>(explorerAPI: ExplorerAPI<FileOrFolderType>) => {
    const paths = explorerAPI.paths;
    const router = useFolderRouter(paths);

    const itemsInThisFolder = resource(
        async () => {
            return explorerAPI.listItems(paths());
        },
        {
            initValue: [],
            deps: [paths],
        },
    );
    return {
        router,
        itemsInThisFolder,
    };
};
const useFolderRouter = (paths: Atom<string[]>) => {
    const { undo, redo, canRedo, canUndo } = useDebouncedHistoryTravel(paths.toSignal());
    return {
        undo,
        redo,
        canRedo,
        canUndo,
        canPrev() {
            return paths().length;
        },
        prev() {
            if (this.canPrev()) paths((i) => i.slice(0, i.length - 1));
        },
        path() {
            return paths().join("/");
        },
        enter(nextPath: string) {
            return paths((i) => [...i, nextPath]);
        },
    };
};
