import { atom, Atom } from '@cn-ui/use';
import { Component, JSXElement, useContext } from 'solid-js';
import { UploaderContext } from './UploaderContext';
import { ExFile } from './ExFile';
import { UploadController, UploadFunc } from './UploadController';
export interface UploaderRootProps {
    accept?: string;
    multiple?: boolean;
    limit?: number;
    uploading: UploadFunc;
    Files: Atom<ExFile[]>;
    children?: JSXElement;

    /** @zh 文件模式，默认 replace 将会替换掉上次的结果 */
    mode?: 'replace' | 'add';
}
/** 这个并没有实质上的 DOM，故不需要进行 OriginComponent */
export const UploaderRoot: Component<UploaderRootProps> = (props) => {
    // 直接传递 props 会报 BUG
    const uploadControl = new UploadController({
        accept: props.accept,
        limit: props.limit ?? Infinity,
        multiple: props.multiple ?? false,
        mode: props.mode ?? 'replace',
        Files: props.Files,
        uploading: props.uploading,
    });

    let inputRef = atom<HTMLInputElement | null>(null);
    console.log('root');
    return (
        <UploaderContext.Provider
            value={{
                inputRef,
                Files: props.Files,
                isDragging: atom(false),
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

                    await uploadControl.addFiles(
                        data.map((i) => {
                            // @ts-ignore
                            i.fullPath = '/' + i.name;
                            return i as ExFile;
                        })
                    );
                }}
            ></input>
            {props.children}
        </UploaderContext.Provider>
    );
};
