import { atom, Atom, OriginComponent } from '@cn-ui/use';

import CropperJS from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

import { JSX, onCleanup, Show } from 'solid-js';
import { Result } from '@cn-ui/core';
interface CropperProps extends JSX.HTMLAttributes<HTMLImageElement> {
    src: string;
    options?: CropperJS.Options;
    /** 用于暴露切割好的数据 */
    previewDataURL?: Atom<string>;
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
                <Result
                    class="bg-red-50"
                    icon="success"
                    title="加载中"
                    subTitle="这是一些描述信息"
                ></Result>
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
