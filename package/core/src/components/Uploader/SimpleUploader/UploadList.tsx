import { Atom, extendsEvent, OriginComponent, reflect } from '@cn-ui/use';
import { For, JSX, JSXElement, Show, useContext } from 'solid-js';
import { UploaderContext } from '../base/UploaderContext';
import { UploadController } from '../base/UploadController';
import { DefaultUploadList } from './DefaultUploadList';
import { ExFile } from '../base/ExFile';

interface UploaderListProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
    children?: (
        file: ExFile,
        progress: Atom<number | Error>,
        controller: UploadController
    ) => JSXElement;
}
export const UploadList = OriginComponent<UploaderListProps>((props) => {
    const { Files, uploadControl } = useContext(UploaderContext);
    return (
        <div
            class={props.class('flex flex-col')}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            <For each={Files()}>
                {(file) => {
                    const progress = reflect(() => uploadControl.getNotice(file.sha));

                    return (props.children ?? DefaultUploadList)(file, progress, uploadControl);
                }}
            </For>
        </div>
    );
});
