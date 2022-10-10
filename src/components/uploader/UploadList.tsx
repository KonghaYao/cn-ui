import { OriginComponent, reflect } from '@cn-ui/use';
import { For, JSX, Match, Switch, useContext } from 'solid-js';
import { UploaderContext } from './base/UploaderContext';
import { Icon } from '../Icon';
import { Mask } from '../Mask';
import { Position } from '../Mask/Position';
import { Space } from '../Space';
import { DefaultIcon } from '../Icon/DefaultIcon';
interface UploaderListProps extends JSX.HTMLAttributes<HTMLDivElement> {}
export const UploadList = OriginComponent<UploaderListProps>((props) => {
    const { Files } = useContext(UploaderContext);
    return (
        <div class={props.class('flex flex-col')} style={props.style} ref={props.ref}>
            <For each={Files()}>
                {(i) => {
                    const { uploadControl } = useContext(UploaderContext);
                    const progress = reflect(() => uploadControl.getNotice(i.sha));
                    return (
                        <Mask class="w-full justify-between">
                            <Position full bottom="0" left="0" class=" " inactive>
                                <div
                                    class="pointer-events-none bg-blue-400 opacity-10 h-full"
                                    style={{
                                        width: progress() + '%',
                                    }}
                                ></div>
                            </Position>
                            <Space class="cursor-default">
                                <Icon name="insert_drive_file" size={32}></Icon>
                                {i.name}
                                <div class="flex-1"></div>
                                <div>{progress() + '%'}</div>
                                <Switch
                                    fallback={
                                        <DefaultIcon
                                            name="error"
                                            color="red"
                                            onClick={() => {
                                                uploadControl.upload([i]);
                                            }}
                                        ></DefaultIcon>
                                    }
                                >
                                    <Match when={progress() === 0}>
                                        <DefaultIcon
                                            name="upload_file"
                                            color="blue"
                                            onClick={() => {
                                                uploadControl.upload([i]);
                                            }}
                                        ></DefaultIcon>
                                    </Match>
                                    <Match when={progress() < 100}>
                                        <DefaultIcon
                                            name="replay"
                                            color="orange"
                                            spin
                                        ></DefaultIcon>
                                    </Match>
                                    <Match when={progress() === 100}>
                                        <DefaultIcon name="check" color="green"></DefaultIcon>
                                    </Match>
                                </Switch>
                            </Space>
                        </Mask>
                    );
                }}
            </For>
        </div>
    );
});
