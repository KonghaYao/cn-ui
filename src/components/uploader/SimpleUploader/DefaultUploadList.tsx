import { Atom } from '@cn-ui/use';
import { Match, Switch } from 'solid-js';
import { Icon, Relative, Position, Space, DefaultIcon, ExFile } from '@cn-ui/core';
import { UploadController } from '../base/UploadController';

/** 默认的上传文件展示组件，这个可以作为上传组件的借鉴 */
export const DefaultUploadList = (
    file: ExFile,
    progress: Atom<number | Error>,
    uploadControl: UploadController
) => {
    return (
        <Relative class="w-full justify-between">
            <Space class="cursor-default text-slate-700">
                <Icon name="insert_drive_file" class="text-sky-600" size={20}></Icon>
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
                            onClick={() => uploadControl.cancel(file.sha)}
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
                        uploadControl.delete(file.sha);
                    }}
                ></DefaultIcon>
            </Space>
            {/*  背景动画 */}
            <Position full bottom="0" left="0" class=" " inactive>
                <div
                    class="pointer-events-none h-full bg-blue-600 opacity-10"
                    style={{
                        width: progress() + '%',
                    }}
                ></div>
            </Position>
        </Relative>
    );
};
