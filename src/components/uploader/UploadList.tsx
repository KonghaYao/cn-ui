import { JSX, For, useContext } from 'solid-js';
import { OriginComponent } from '@cn-ui/use';
import { UploaderContext } from './index';

export interface UploaderListProps extends JSX.HTMLAttributes<HTMLDivElement> {}
export const UploadList = OriginComponent<UploaderListProps>((props) => {
    const { Files } = useContext(UploaderContext);
    return (
        <main>
            <For each={Files()}>
                {(item) => {
                    return <div>{item.name}</div>;
                }}
            </For>
        </main>
    );
});
