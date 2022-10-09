import { Atom } from '@cn-ui/use';

export const useDragUpload = ({
    isDragging,
    onEnd,
}: {
    isDragging: Atom<boolean>;
    onEnd: (files: File[]) => void;
}) => {
    return {
        onDrop(e) {
            e.preventDefault();
            isDragging(false);
            onEnd([...e.dataTransfer.files]);
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
