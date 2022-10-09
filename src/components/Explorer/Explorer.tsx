import { JSX, For } from 'solid-js';
import { atom, OriginComponent, reflect } from '@cn-ui/use';
import { Space } from '../Space';
import { ExFile } from '../uploader/ExFile';
import { Atom } from 'solid-use';
import { Icon } from '../Icon';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';

export interface ExplorerProps extends JSX.HTMLAttributes<HTMLDivElement> {
    Files: Atom<ExFile[]>;
    onOpenFile?: (file: ExFile) => void;
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
            [...directorySet.values()]
                .map((i) => {
                    return { name: i, isDirectory: true };
                })
                // @ts-ignore
                .concat(last)
        );
    });
    return (
        <div class="p-2">
            <Breadcrumb
                list={now}
                onTrigger={(index) => now((i) => i.slice(0, index))}
            ></Breadcrumb>
            <Space vertical class="w-full">
                <For each={nowList()}>
                    {(item) => {
                        return (
                            <div
                                class="text-left w-full flex items-center cursor-pointer"
                                onClick={() => {
                                    if (item.isDirectory) {
                                        now((i) => i.concat(item.name));
                                    } else {
                                        props.onOpenFile && props.onOpenFile(item as any as ExFile);
                                    }
                                }}
                            >
                                <Icon
                                    class="px-2"
                                    size="1.5em"
                                    name={item.isDirectory ? 'folder' : 'insert_drive_file'}
                                    classList={{
                                        'text-sky-600': item.isDirectory,
                                        'text-teal-600': !item.isDirectory,
                                    }}
                                ></Icon>
                                <span>{item.name}</span>
                            </div>
                        );
                    }}
                </For>
            </Space>
        </div>
    );
});
