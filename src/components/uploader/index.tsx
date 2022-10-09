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
    useContext,
} from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';

import { atom, atomization, OriginComponent, reflect } from '@cn-ui/use';
import { Mask } from '../Mask';
import { Position } from '../Mask/Position';
import { Box } from '../Box';
import { Button } from '../Button';
import { UploadWidget } from './UploaderWidget';
import { Atom } from '@cn-ui/use';
import { UploadList } from './UploadList';
import { useDragUpload } from './useDragUpload';
import { ExFile } from './ExFile';
import { UploadController } from './UploadController';
export interface UploaderProps extends JSX.HTMLAttributes<HTMLInputElement> {
    children?: JSXElement;
    Files?: Atom<ExFile[]>;
}

export const UploaderContext = createContext<{
    Files: Atom<ExFile[]>;
    isDragging: Atom<boolean>;
    inputRef: Atom<HTMLInputElement | null>;
    uploadControl: UploadController;
}>();
/** @zh  复合上传组件 */
export const Uploader = OriginComponent<UploaderProps, HTMLInputElement>((props) => {
    props = mergeProps(props);
    const { Files, isDragging } = useContext(UploaderContext);

    return (
        <Mask
            class={props.class('cn-uploader  w-full h-full bg-slate-50 p-4')}
            style={props.style}
            ref={props.ref}
            {...useDragUpload({
                isDragging,
                onEnd(files) {
                    Files((i) => [...i, ...files]);
                },
            })}
        >
            <Position full class="p-4 " top="0" left="0" inactive>
                <div
                    class=" h-full w-full  duration-300 transition-colors border-2 border-dashed  border-slate-300 rounded-xl "
                    classList={{
                        'border-blue-600': isDragging(),
                    }}
                ></div>
            </Position>
            {Files().length === 0 ? <UploadWidget></UploadWidget> : <UploadList></UploadList>}
        </Mask>
    );
});
