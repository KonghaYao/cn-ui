export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'mockUpload',
        description: '非属性，为测试的一个效果',
    },
];

import { atom, reflect } from '@cn-ui/use';
import { UploadPanel, Space, SimpleUploader, UploaderRoot, UploadList, ExFile } from '@cn-ui/core';

const fakeUpload = async (notify, files, onCancel) => {
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
        onCancel(() => {
            clearInterval(close);
        });
    });
    return true;
};
import { Upload } from 'upload-js';
const upload = Upload({ apiKey: 'free' });
const mockUpload = async (notify, files: ExFile[], onCancel) => {
    const data = await Promise.all(
        files.map(async (i) => {
            const { fileUrl } = await upload.uploadFile(i, {
                onBegin: ({ cancel }) => {
                    // 注意，upload-js 的 cancel 本身失效
                    onCancel(() => {
                        cancel();
                    });
                },
                onProgress: ({ progress }) => notify(progress, i.sha),
            });
            return fileUrl;
        })
    );
    console.log(data);
    return true;
};

export default (props) => {
    const Files = atom([]);
    return (
        <UploaderRoot Files={Files} uploading={props.mockUpload ? mockUpload : fakeUpload}>
            <Space vertical class="w-full">
                <SimpleUploader></SimpleUploader>
                <UploadList class="w-full"></UploadList>
            </Space>
            <UploadPanel></UploadPanel>
        </UploaderRoot>
    );
};
