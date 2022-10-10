import { atom, Atom } from '@cn-ui/use';
import { Component, JSXElement, useContext } from 'solid-js';
import { UploaderContext } from './UploaderContext';
import { ExFile } from './ExFile';
import { UploadController, UploadFunc } from './UploadController';
interface UploaderRootProps {
    accept?: string;
    multiple?: boolean;
    limit?: number;
    disabled?: boolean | Atom<boolean>;
    uploading: UploadFunc;
    Files: Atom<ExFile[]>;
    children?: JSXElement;

    /** @zh 文件模式，默认 replace 将会替换掉上次的结果 */
    mode?: 'replace' | 'add';
}
export const UploaderRoot: Component<UploaderRootProps> = (props) => {
    const uploadControl = new UploadController(props.uploading);
    const isDragging = atom(false);
    let inputRef = atom<HTMLInputElement | null>(null);
    return (
        <UploaderContext.Provider
            value={{
                inputRef,
                Files: props.Files,
                isDragging,
                uploadControl,
            }}
        >
            <input
                ref={inputRef}
                class="hidden"
                type="file"
                multiple={props.multiple}
                accept={props.accept}
                onchange={async (e) => {
                    const data = [...((e.target as any).files as ExFile[])];
                    await uploadControl.createSlots(data);
                    props.Files((i) => {
                        return data
                            .map((i) => {
                                // @ts-ignore
                                i.fullPath = '/' + i.name;
                                return i as ExFile;
                            })
                            .concat(i);
                    });
                }}
            ></input>
            {props.children}
        </UploaderContext.Provider>
    );
};
