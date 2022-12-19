import { createContext } from 'solid-js';
import { Atom } from '@cn-ui/use';
import { ExFile } from './ExFile';
import { UploadController } from './UploadController';

export const UploaderContext = createContext<{
    Files: Atom<ExFile[]>;
    isDragging: Atom<boolean>;
    inputRef: Atom<HTMLInputElement | null>;
    uploadControl: UploadController;
}>();
