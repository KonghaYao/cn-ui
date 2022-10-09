export const Controller = [];

import { atom, reflect } from '@cn-ui/use';
import { useContext } from 'solid-js';
import { Uploader } from '.';
import { Icon } from '../Icon';
import { Mask } from '../Mask';
import { Position } from '../Mask/Position';
import { Space } from '../Space';
import { SimpleUploader, UploadingContext } from './SimpleUploader';
import { UploadController } from './UploadController';
export default () => {
    const Files = atom([]);
    return (
        <>
            <Space vertical class="w-full">
                <UploadingContext.Provider
                    value={{
                        Files,
                        uploading: new UploadController(async (notify, files) => {
                            console.log('uploading');
                            await new Promise((resolve) => {
                                let count = 0;
                                const close = setInterval(() => {
                                    count++;
                                    notify(count * 10);
                                    console.log(count);
                                    if (count === 10) {
                                        clearInterval(close);
                                        resolve(null);
                                    }
                                }, 100);
                            });
                            return true;
                        }),
                    }}
                >
                    <SimpleUploader></SimpleUploader>
                    {Files().map((i) => {
                        const { uploading } = useContext(UploadingContext);
                        const height = reflect(() => {
                            return uploading.getNotice(i.sha)() + '%';
                        });
                        return (
                            <Mask class="w-full justify-between">
                                <Position full bottom="0" left="0" class=" " inactive>
                                    <div
                                        class="pointer-events-none bg-blue-400 opacity-10 h-full"
                                        style={{
                                            width: height(),
                                        }}
                                    ></div>
                                </Position>
                                <Space>
                                    <Icon
                                        name="insert_drive_file"
                                        size={32}
                                        onClick={() => {
                                            uploading.upload([i]);
                                        }}
                                    ></Icon>
                                    {i.name}
                                    <div class="flex-1"></div>
                                    <div>{height()}</div>
                                </Space>
                            </Mask>
                        );
                    })}
                </UploadingContext.Provider>
            </Space>
            <Uploader Files={Files}></Uploader>
        </>
    );
};
