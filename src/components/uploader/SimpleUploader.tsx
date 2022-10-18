import { createContext, mergeProps, useContext, JSX } from 'solid-js';
import { atom, atomization, OriginComponent } from '@cn-ui/use';
import { Icon, Relative, Position } from '@cn-ui/core';
import { Atom } from '@cn-ui/use';
import { useDragUpload } from './base/useDragUpload';
import { ExFile } from './base/ExFile';
import { UploaderContext } from './base/UploaderContext';
import { UploadController, UploadFunc } from './base/UploadController';
export const UploadingContext = createContext<{
    uploading: UploadController;
    Files: Atom<ExFile[]>;
}>();
export interface SimpleUploaderProps extends JSX.HTMLAttributes<HTMLInputElement> {
    accept?: string;
    multiple?: boolean;
    limit?: number;
    disabled?: boolean | Atom<boolean>;

    /** @zh 文件模式，replace 将会替换掉上次的结果 */
    mode?: 'replace' | 'add';
}
/** @zh  简单上传组件 */
export const SimpleUploader = OriginComponent<SimpleUploaderProps, HTMLInputElement>((props) => {
    const { uploadControl, inputRef, isDragging } = useContext(UploaderContext);

    return (
        <Relative
            {...props}
            class={props.class('cn-uploader h-fit w-fit  p-4')}
            style={props.style}
            ref={props.ref}
            {...useDragUpload({
                isDragging,
                async onEnd(files) {
                    await uploadControl.addFiles(files);
                },
            })}
        >
            <Position full class="p-2 " top="0" left="0" inactive>
                <div
                    class="h-full  rounded border border-dashed   transition-colors duration-300 "
                    classList={{
                        'border-blue-600': isDragging(),
                        'border-slate-300': !isDragging(),
                    }}
                ></div>
            </Position>

            <div
                class="flex h-8 w-8 items-center justify-center  text-slate-500"
                onClick={() => inputRef().click()}
            >
                <Icon name="add" size="1.5em"></Icon>
            </div>
        </Relative>
    );
});
