import { JSXElement, JSX, useContext } from 'solid-js';
import { atom, atomization, OriginComponent, reflect } from '@cn-ui/use';
import { Mask } from '../../Mask';
import { Position } from '../../Mask/Position';
import { UploadWidget } from './UploaderWidget';
import { UploadExplorer } from './UploadExplorer';
import { useDragUpload } from '../base/useDragUpload';
import { UploaderContext } from '../base/UploaderContext';
export interface UploadPanelProps extends JSX.HTMLAttributes<HTMLInputElement> {
    children?: JSXElement;
}

/** @zh  复合上传组件 */
export const UploadPanel = OriginComponent<UploadPanelProps, HTMLInputElement>((props) => {
    const { Files, isDragging } = useContext(UploaderContext);

    return (
        <Mask
            {...props}
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
            {Files().length === 0 ? (
                <UploadWidget></UploadWidget>
            ) : (
                <UploadExplorer></UploadExplorer>
            )}
        </Mask>
    );
});
