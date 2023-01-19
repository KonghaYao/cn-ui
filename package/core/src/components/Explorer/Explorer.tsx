import { JSX, For, JSXElement } from 'solid-js';
import { atom, extendsEvent, OriginComponent, reflect } from '@cn-ui/use';
import { ExFile } from '../Uploader/base/ExFile';
import { Atom } from '@cn-ui/use';
import { useEventController } from '@cn-ui/use';
import { Breadcrumb } from '../Breadcrumb';
import { Icon } from '../Icon';
import { Space } from '../Space';
interface Folder {
    name: string;
    fullPath: string;
    isDirectory: true;
}
export interface ExplorerProps extends JSX.HTMLAttributes<HTMLDivElement> {
    Files: Atom<ExFile[]>;
    onOpenFile?: (file: ExFile) => void | Promise<void>;
    FolderExtra?: (folder: Folder) => JSXElement;
    FileExtra?: (file: ExFile) => JSXElement;
    onOpenFolder?: (folder: Folder) => void | Promise<void>;
}

export const Explorer = OriginComponent<ExplorerProps>((props) => {
    const now = atom<string[]>([]);

    const nowList = reflect(() => {
        const nowPath = now().length === 0 ? '/' : '/' + now().join('/') + '/';
        const innerFiles = props.Files().filter((i) => {
            return i.fullPath.startsWith(nowPath);
        });
        const directorySet = new Set<string>();
        const last = innerFiles.filter((i) => {
            const name = i.fullPath.replace(nowPath, '');
            const isDirectory = name.includes('/');
            if (isDirectory) {
                directorySet.add(name.split('/')[0]);
                return false;
            }
            return true;
        });
        return (
            [...directorySet.values()].map((i) => {
                return { name: i, fullPath: nowPath + i, isDirectory: true };
            }) as (Folder | ExFile)[]
        ).concat(last);
    });
    const control = useEventController({});
    return (
        <div
            class={props.class('cn-explorer flex h-full w-full flex-col p-2')}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            <Breadcrumb list={now} onTrigger={(before) => now((i) => before)}></Breadcrumb>
            <Space vertical class="h-full w-full flex-1 overflow-auto">
                <For each={nowList()}>
                    {(item) => {
                        return (
                            <div class="flex w-full cursor-pointer items-center text-left">
                                <Icon
                                    class="px-2"
                                    size="1.5em"
                                    name={item.isDirectory ? 'folder' : 'insert_drive_file'}
                                    classList={{
                                        'text-sky-600': item.isDirectory,
                                        'text-teal-600': !item.isDirectory,
                                    }}
                                ></Icon>
                                <span
                                    class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
                                    onClick={control([
                                        async () => {
                                            if (item.isDirectory) {
                                                return (
                                                    props.onOpenFolder &&
                                                    props.onOpenFolder(item as Folder)
                                                );
                                            } else {
                                                props.onOpenFile &&
                                                    (await props.onOpenFile(item as ExFile));
                                                return false;
                                            }
                                        },
                                        () => !!now((i) => i.concat(item.name)),
                                    ])}
                                >
                                    {item.name}
                                </span>
                                {item.isDirectory
                                    ? props.FolderExtra && props.FolderExtra(item)
                                    : props.FileExtra && props.FileExtra(item as ExFile)}
                            </div>
                        );
                    }}
                </For>
            </Space>
        </div>
    );
});
