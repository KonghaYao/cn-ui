import { extendsEvent, OriginComponent, reflect } from '@cn-ui/use';
import { For, JSX, Match, Show, Switch, useContext } from 'solid-js';
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
                    return (
                        <Mask class="w-full justify-between">
                            <Space class="cursor-default text-slate-700">
                                <Icon
                                    name="insert_drive_file"
                                    class="text-sky-600"
                                    size={20}
                                ></Icon>
                                {file.name}
                                <div class="flex-1"></div>
                                <div>{progress() === -1 ? 'canceled' : progress() + '%'}</div>
                                {/* 上传状态的描述 */}
                                <Switch
                                    fallback={
                                        <DefaultIcon
                                            name="error"
                                            color="red"
                                            onClick={() => {
                                                uploadControl.upload([file]);
                                            }}
                                        ></DefaultIcon>
                                    }
                                >
                                    <Match when={progress() === 0}>
                                        <DefaultIcon
                                            name="upload"
                                            color="blue"
                                            onClick={() => {
                                                uploadControl.upload([file]);
                                            }}
                                        ></DefaultIcon>
                                    </Match>
                                    <Match when={progress() > 0 && progress() < 100}>
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
                                {/* 删除按钮 */}

                                <DefaultIcon
                                    color="red"
                                    name="delete"
                                    onClick={() => {
                                        const p = progress();
                                        if (p > 0 && p < 100) {
                                            uploadControl.cancel(file.sha);
                                        } else {
                                            Files((i) => i.filter((i) => i !== file));
                                        }
                                    }}
                                ></DefaultIcon>
                            </Space>
                            {/*  背景动画 */}
                            <Position full bottom="0" left="0" class=" " inactive>
                                <div
                                    class="pointer-events-none bg-blue-600 opacity-10 h-full"
                                    style={{
                                        width: progress() + '%',
                                    }}
                                ></div>
                            </Position>
                        </Mask>
                    );
                }}
            </For>
        </div>
    );
});
