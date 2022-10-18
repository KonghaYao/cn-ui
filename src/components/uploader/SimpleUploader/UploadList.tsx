import { Atom, extendsEvent, OriginComponent, reflect } from '@cn-ui/use';
import { For, JSX, JSXElement, Show, useContext } from 'solid-js';
import { UploaderContext } from '../base/UploaderContext';
import { ExFile } from '@cn-ui/core';
import { UploadController } from '../base/UploadController';
import { DefaultUploadList } from './DefaultUploadList';

interface UploaderListProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
    children?: (
        file: ExFile,
        progress: Atom<number | Error>,
        controller: UploadController
    ) => JSXElement;
}
export const UploadList = OriginComponent<UploaderListProps>((props) => {
    const { Files } = useContext(UploaderContext);
    return (
        <div
            class={props.class('flex flex-col')}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            <For each={Files()}>
                {(file) => {
                    const { uploadControl } = useContext(UploaderContext);
                    const progress = reflect(() => uploadControl.getNotice(file.sha));

                    return (props.children ?? DefaultUploadList)(file, progress, uploadControl);
                }}
            </For>
        </div>
    );
});
