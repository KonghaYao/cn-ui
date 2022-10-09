import { createContext, mergeProps, useContext } from 'solid-js';
import { atom, atomization, OriginComponent } from '@cn-ui/use';
import { Mask } from '../Mask';
import { Position } from '../Mask/Position';
import { Atom } from '@cn-ui/use';
import { UploadList } from './UploadList';
import { useDragUpload } from './useDragUpload';
import { ExFile } from './ExFile';
import { Icon } from '../Icon';
import { UploaderProps, UploaderContext } from './index';
import { UploadController, UploadFunc } from './UploadController';
export const UploadingContext = createContext<{
    uploading: UploadController;
    Files: Atom<ExFile[]>;
}>();
interface SimpleUploader extends UploaderProps {
    accept?: string;
    multiple?: boolean;
    limit?: number;
    disabled?: boolean | Atom<boolean>;

    /** @zh 文件模式，replace 将会替换掉上次的结果 */
    mode?: 'replace' | 'add';
}
/** @zh  简单上传组件 */
export const SimpleUploader = OriginComponent<SimpleUploader, HTMLInputElement>((props) => {
    const { uploading, Files } = useContext(UploadingContext);
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
                class={props.class('cn-uploader w-fit h-fit  p-4')}
                style={props.style}
                ref={props.ref}
                {...useDragUpload({
                    isDragging,
                    async onEnd(files) {
                        await uploading.createSlots(files);
                        Files((i) => [...i, ...files]);
                    },
                })}
            >
                <input
                    ref={inputRef}
                    class="hidden"
                    type="file"
                    multiple={props.multiple}
                    accept={props.accept}
                    onchange={async (e) => {
                        const data = [...((e.target as any).files as ExFile[])];
                        await uploading.createSlots(data);
                        Files((i) => {
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
                <Position full class="p-2 " top="0" left="0" inactive>
                    <div
                        class="h-full  duration-300 transition-colors border border-dashed  border-slate-300 rounded "
                        classList={{
                            'border-blue-600': isDragging(),
                        }}
                    ></div>
                </Position>

                <div
                    class="h-8 w-8 flex justify-center items-center  text-slate-500"
                    onclick={() => inputRef().click()}
                >
                    <Icon name="add" size="1.5em"></Icon>
                </div>
            </Mask>
        </UploaderContext.Provider>
    );
});
