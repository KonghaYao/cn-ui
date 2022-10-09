import { JSX, useContext } from 'solid-js';
import { OriginComponent } from '@cn-ui/use';
import { UploaderContext } from './index';
import { Explorer } from '../Explorer/Explorer';

export interface UploaderListProps extends JSX.HTMLAttributes<HTMLDivElement> {}
export const UploadList = OriginComponent<UploaderListProps>((props) => {
    const { Files } = useContext(UploaderContext);
    return (
        <div class="h-full w-full overflow-auto">
            <Explorer
                Files={Files}
                onOpenFile={(file) => {
                    console.log(file);
                }}
            ></Explorer>
        </div>
    );
});
