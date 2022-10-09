import {
    Component,
    createEffect,
    JSXElement,
    mergeProps,
    createMemo,
    JSX,
    createContext,
    Switch,
    Match,
} from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';

import { atom, OriginComponent, reflect } from '@cn-ui/use';
import { Mask } from '../Mask';
import { Position } from '../Mask/Position';
import { Box } from '../Box';
import { Button } from '../Button';
import { UploadWidget } from './UploaderWidget';
import { Atom } from '@cn-ui/use';
import { sha256 } from '../_util/sha256/sha256';
import { UploadList } from './UploadList';
import { useDragUpload } from './useDragUpload';
import { ExFile } from './ExFile';
interface UploaderProps extends JSX.HTMLAttributes<HTMLInputElement> {
    children?: JSXElement;
}
export type UploadFunc = (notify: UploaderNotify) => Promise<boolean>;
export class UploaderNotify {}

export class UploadController {
    private shaStore = new WeakMap<ExFile, string>();
    private shaList = new Set<string>();
    uploadState: {} = {};
    constructor(public uploader: UploadFunc) {}

    async calcSha(file: ExFile) {
        if (this.shaStore.has(file)) return this.shaStore.get(file);
        const result = sha256(await file.arrayBuffer());
        this.shaStore.set(file, result);
        this.shaList.add(result);
        return result;
    }
    upload(filePath: string) {}
}

export const UploaderContext = createContext<{
    Files: Atom<ExFile[]>;
    isDragging: Atom<boolean>;
    inputRef: Atom<HTMLInputElement | null>;
}>();
/** @zh  上传组件*/
export const Uploader = OriginComponent<UploaderProps, HTMLInputElement>((props) => {
    props = mergeProps(props);
    const Files = atom<ExFile[]>([]);
    const isDragging = atom(false);
    let inputRef = atom<HTMLInputElement | null>(null);
    return (
        <UploaderContext.Provider
            value={{
                inputRef,
                Files,
                isDragging,
            }}
        >
            <Mask
                class={props.class('cn-uploader  w-full h-full bg-gray-50 p-4')}
                style={props.style}
                ref={props.ref}
                {...useDragUpload({
                    isDragging,
                    onEnd(files) {
                        Files((i) => [...i, ...files]);
                    },
                })}
            >
                <input
                    ref={inputRef}
                    class="hidden"
                    type="file"
                    onchange={(e) => {
                        const data = (e.target as any).files as FileList;
                        Files(
                            [...data].map((i) => {
                                // @ts-ignore
                                i.fullPath = '/' + i.name;
                                return i as ExFile;
                            })
                        );
                    }}
                ></input>
                <Position full class="p-4 " top="0" left="0" inactive>
                    <div
                        class=" h-full w-full  duration-300 transition-colors border-2 border-dashed  border-gray-300 rounded-xl "
                        classList={{
                            'border-blue-600': isDragging(),
                        }}
                    ></div>
                </Position>
                {Files().length === 0 ? <UploadWidget></UploadWidget> : <UploadList></UploadList>}
            </Mask>
        </UploaderContext.Provider>
    );
});
