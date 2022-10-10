import { OriginComponent } from '@cn-ui/use';
import { For, JSX, useContext } from 'solid-js';
import { UploaderContext } from './base/UploaderContext';
import { Icon } from '../Icon';
import { Mask } from '../Mask';
import { Position } from '../Mask/Position';
import { Space } from '../Space';
interface UploaderListProps extends JSX.HTMLAttributes<HTMLDivElement> {}
export const UploadList = OriginComponent<UploaderListProps>(() => {
    const { Files } = useContext(UploaderContext);
    return (
        <div>
            <For each={Files()}>
                {(i) => {
                    const { uploadControl } = useContext(UploaderContext);
                    return (
                        <Mask class="w-full justify-between">
                            <Position full bottom="0" left="0" class=" " inactive>
                                <div
                                    class="pointer-events-none bg-blue-400 opacity-10 h-full"
                                    style={{
                                        width: uploadControl.getNotice(i.sha) + '%',
                                    }}
                                ></div>
                            </Position>
                            <Space>
                                <Icon
                                    name="insert_drive_file"
                                    size={32}
                                    onClick={() => {
                                        uploadControl.upload([i]);
                                    }}
                                ></Icon>
                                {i.name}
                                <div class="flex-1"></div>
                                <div>{uploadControl.getNotice(i.sha) + '%'}</div>
                            </Space>
                        </Mask>
                    );
                }}
            </For>
        </div>
    );
});
