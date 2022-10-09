import { Atom } from '@cn-ui/use';

export interface ExFile extends File {
    fullPath: string;
}

function readDirectory(directory: FileSystemDirectoryEntry) {
    return new Promise((resolve, reject) => {
        const dirReader = directory.createReader();
        let entries = [];

        const getEntries = function () {
            dirReader.readEntries(
                function (results) {
                    if (results.length) {
                        entries = entries.concat(results);
                        getEntries();
                    } else {
                        resolve(entries);
                    }
                },
                function (error) {
                    reject(error);
                }
            );
        };

        getEntries();
    });
}

async function readRoll(arr) {
    for (let key in arr) {
        if (arr[key].isDirectory) {
            let result = await readDirectory(arr[key]);
            arr[key] = result;
            await readRoll(result);
        }
    }
}

function readFileEntry(fileEntry: FileSystemFileEntry) {
    return new Promise<ExFile>((resolve, reject) => {
        fileEntry.file(
            (fileData: ExFile) => {
                fileData.fullPath = fileEntry.fullPath;
                resolve(fileData);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export const useDragUpload = ({
    isDragging,
    onEnd,
}: {
    isDragging: Atom<boolean>;
    onEnd: (files: ExFile[]) => void;
}) => {
    return {
        async onDrop(e) {
            e.preventDefault();
            isDragging(false);
            if (DataTransferItem.prototype.webkitGetAsEntry) {
                let fileEntryList = [...e.dataTransfer.items].map((i) => {
                    return i.webkitGetAsEntry();
                });
                await readRoll(fileEntryList);
                fileEntryList = fileEntryList.flat(Infinity);
                const fileList: ExFile[] = [];

                for (let item of fileEntryList) {
                    let fileData = await readFileEntry(item);
                    fileList.push(fileData);
                }
                onEnd(fileList);
            } else {
                onEnd(
                    [...e.dataTransfer.files].map((i) => {
                        i.fullPath = '/' + i.name;
                        return i;
                    })
                );
            }
        },
        onDragOver(e) {
            e.preventDefault();
            isDragging(true);
        },
        onDragLeave(e) {
            e.preventDefault();
            isDragging(false);
        },
    };
};
