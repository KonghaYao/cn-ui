import { atom, reflect } from '@cn-ui/use';
import { createResource, onMount } from 'solid-js';
import { Cropper } from '@cn-ui/core';
import { mockImages } from '../../mocks/images';
export const Controller = [];
import { debounce } from 'lodash-es';
const images = await mockImages(1);
export default (props) => {
    const preview = atom('');
    return (
        <>
            <Cropper
                src={images[0]}
                options={{
                    // cropperjs's options
                    // https://github.com/fengyuanchen/cropperjs/blob/main/README.md
                    aspectRatio: 1,
                    viewMode: 1,
                }}
                // Yes，You can use debounce to control render frequency
                previewDataURL={debounce(preview, 100) as typeof preview}
                class="max-h-64"
            ></Cropper>
            <img src={preview()}></img>
        </>
    );
};
