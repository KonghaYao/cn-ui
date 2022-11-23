import { Atom, atom, reflect } from '@cn-ui/use';
import { Cropper } from '@cn-ui/cropper';
import { mockImages } from '../../mocks/images';
export const Controller = [];
import { debounce } from 'lodash-es';
import { createResource, Show } from 'solid-js';
export default (props) => {
    const [images] = createResource(() => mockImages(1));
    const preview = atom('');
    return (
        <Show when={images()}>
            <Cropper
                src={images()[0]}
                options={{
                    // cropperjs's options
                    // https://github.com/fengyuanchen/cropperjs/blob/main/README.md
                    aspectRatio: 1,
                    viewMode: 1,
                }}
                // Yes，You can use debounce to control render frequency
                previewDataURL={debounce(preview, 100) as any as Atom<string>}
                class="max-h-64"
            ></Cropper>
            <img src={preview()}></img>
        </Show>
    );
};
