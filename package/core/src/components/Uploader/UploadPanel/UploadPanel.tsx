import { JSXElement, JSX, useContext } from 'solid-js';
import { atom, atomization, OriginComponent, reflect } from '@cn-ui/use';
import { UploadWidget } from './UploaderWidget';
import { UploadExplorer } from './UploadExplorer';
import { useDragUpload } from '../base/useDragUpload';
import { UploaderContext } from '../base/UploaderContext';
import { Relative, Position } from '../../Mask';
export interface UploadPanelProps extends JSX.HTMLAttributes<HTMLInputElement> {
    children?: JSXElement;
}

/** @zh  复合上传组件 */
export const UploadPanel = OriginComponent<UploadPanelProps, HTMLInputElement>((props) => {
    const { Files, isDragging } = useContext(UploaderContext);

    return (
        <Relative
            {...props}
            class={props.class('cn-uploader  h-full w-full bg-slate-50 p-4')}
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
                    class=" h-full w-full  rounded-xl border-2 border-dashed border-slate-300  transition-colors duration-300 "
                    classList={{
                        'border-blue-600': isDragging(),
                    }}
                ></div>
            </Position>
            {Files().length === 0 ? (
                <UploadWidget></UploadWidget>
            ) : (
                <UploadExplorer></UploadExplorer>
            )}
        </Relative>
    );
});
