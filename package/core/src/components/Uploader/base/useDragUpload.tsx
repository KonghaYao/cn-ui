import { Atom } from '@cn-ui/use';
import { ExFile } from './ExFile';

/** 拖拽上传 */
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
            //  不建议使用文件夹上传，文件夹层数太高
            onEnd(
                [...e.dataTransfer.files].map((i) => {
                    i.fullPath = '/' + i.name;
                    return i;
                })
            );
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
