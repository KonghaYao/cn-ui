import { atom, Atom, OriginComponent } from '@cn-ui/use';

import CropperJS from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

import { JSX, JSXElement, onCleanup, Show } from 'solid-js';
import { Box, DefaultIcon } from '@cn-ui/core';
interface CropperProps extends JSX.HTMLAttributes<HTMLImageElement> {
    src: string;
    options?: CropperJS.Options;
    /** 用于暴露切割好的数据 */
    previewDataURL?: Atom<string>;
    loading?: JSXElement;
    /** 未完成错误态 */
    error?: JSXElement;
}
export const Cropper = OriginComponent<CropperProps>((props) => {
    let cropper: CropperJS;
    onCleanup(() => {
        cropper && cropper.destroy();
    });
    const loading = atom(true);
    return (
        <div class={props.class()} style={props.style}>
            <Show when={loading()}>
                {props.loading ?? (
                    <Box
                        icon={
                            <DefaultIcon name="replay" color="green" spin size={50}></DefaultIcon>
                        }
                        title="加载中"
                    ></Box>
                )}
            </Show>
            <img
                class="cropper-hidden"
                src={props.src}
                ref={(image) => {
                    image.addEventListener('load', () => {
                        cropper = new CropperJS(image, {
                            ...(props.options || {}),
                            crop() {
                                props.previewDataURL &&
                                    props.previewDataURL(() => {
                                        // 获取数据
                                        return cropper.getCroppedCanvas().toDataURL('image/jpeg');
                                    });
                                return (
                                    props.options.crop && props.options.crop.apply(this, arguments)
                                );
                            },
                            ready() {
                                loading(false);
                                console.log('加载完成');
                                return (
                                    props.options.ready &&
                                    props.options.ready.apply(this, arguments)
                                );
                            },
                        });
                    });
                }}
                /** @ts-ignore */
                crossorigin
            ></img>
        </div>
    );
});
