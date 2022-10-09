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
interface UploaderProps extends JSX.HTMLAttributes<HTMLInputElement> {
    children?: JSXElement;
}
export type UploadFunc = (notify: UploaderNotify) => Promise<boolean>;
export class UploaderNotify {}

export class UploadController {
    private shaStore = new WeakMap<File, string>();
    private shaList = new Set<string>();

    constructor(public uploader: UploadFunc) {}

    async calcSha(file: File) {
        if (this.shaStore.has(file)) return this.shaStore.get(file);
        const result = sha256(await file.arrayBuffer());
        this.shaStore.set(file, result);
        this.shaList.add(result);
        return result;
    }
}

export const UploaderContext = createContext<{
    Files: Atom<File[]>;
    isDragging: Atom<boolean>;
    inputRef: HTMLInputElement;
}>();
/** @zh  */
export const Uploader = OriginComponent<UploaderProps, HTMLInputElement>((props) => {
    const { componentConfig, rtl } = GlobalConfigStore;
    props = mergeProps(componentConfig?.Mask, props);

    const Files = atom<File[]>([]);

    const isDragging = atom(false);
    const events = useDragUpload({
        isDragging,
        onEnd(files) {
            Files((i) => [...i, ...files]);
        },
    });
    let inputRef: HTMLInputElement;
    return (
        <UploaderContext.Provider
            value={{
                inputRef,
                Files,
                isDragging,
            }}
            {...events}
        >
            <Mask
                class={props.class('cn-uploader  w-full h-full bg-gray-50 p-4')}
                classList={{
                    rtl: rtl,
                }}
                style={props.style}
                ref={props.ref}
            >
                <input
                    ref={inputRef}
                    class="hidden"
                    type="file"
                    onchange={(e) => {
                        const data = (e.target as any).files as FileList;
                        Files([...data]);
                    }}
                ></input>
                <Position full class="p-4 " top="0" left="0">
                    <div class=" h-full w-full hover:border-blue-600 duration-300 transition-colors border-2 border-dashed  border-gray-300 rounded-xl "></div>
                </Position>
                <Switch fallback={<UploadList></UploadList>}>
                    <Match when={Files().length === 0}>
                        <UploadWidget></UploadWidget>
                    </Match>
                </Switch>
            </Mask>
        </UploaderContext.Provider>
    );
});
