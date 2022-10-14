import { createContext, mergeProps, useContext } from 'solid-js';
import { atom, atomization, OriginComponent } from '@cn-ui/use';
import { Relative } from '../Mask';
import { Position } from '../Mask/Position';
import { Atom } from '@cn-ui/use';
import { UploadExplorer } from './UploadPanel/UploadExplorer';
import { useDragUpload } from './base/useDragUpload';
import { ExFile } from './base/ExFile';
import { Icon } from '../Icon';
import { UploadPanelProps } from './UploadPanel/UploadPanel';
import { UploaderContext } from './base/UploaderContext';
import { UploadController, UploadFunc } from './base/UploadController';
export const UploadingContext = createContext<{
    uploading: UploadController;
    Files: Atom<ExFile[]>;
}>();
interface SimpleUploader extends UploadPanelProps {
    accept?: string;
    multiple?: boolean;
    limit?: number;
    disabled?: boolean | Atom<boolean>;

    /** @zh 文件模式，replace 将会替换掉上次的结果 */
    mode?: 'replace' | 'add';
}
/** @zh  简单上传组件 */
export const SimpleUploader = OriginComponent<SimpleUploader, HTMLInputElement>((props) => {
    const { uploadControl, inputRef, Files, isDragging } = useContext(UploaderContext);

    return (
        <Relative
            {...props}
            class={props.class('cn-uploader h-fit w-fit  p-4')}
            style={props.style}
            ref={props.ref}
            {...useDragUpload({
                isDragging,
                async onEnd(files) {
                    await uploadControl.createSlots(files);
                    Files((i) => [...i, ...files]);
                },
            })}
        >
            <Position full class="p-2 " top="0" left="0" inactive>
                <div
                    class="h-full  rounded border border-dashed border-slate-300  transition-colors duration-300 "
                    classList={{
                        'border-blue-600': isDragging(),
                    }}
                ></div>
            </Position>

            <div
                class="flex h-8 w-8 items-center justify-center  text-slate-500"
                onclick={() => inputRef().click()}
            >
                <Icon name="add" size="1.5em"></Icon>
            </div>
        </Relative>
    );
});
