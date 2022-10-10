export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'mockUpload',
        description: '非属性，为测试的一个效果',
    },
];

import { atom, reflect } from '@cn-ui/use';
import { UploadPanel } from './UploadPanel/UploadPanel';
import { Space } from '../Space';
import { SimpleUploader, UploadingContext } from './SimpleUploader';
import { UploaderRoot } from './base/UploaderRoot';
import { UploadList } from './UploadList';

const fakeUpload = async (notify, files) => {
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
};
import { Upload } from 'upload-js';
import { ExFile } from './base/ExFile';
const upload = Upload({ apiKey: 'free' });
const mockUpload = async (notify, files: ExFile[]) => {
    const data = await Promise.all(
        files.map(async (i) => {
            const { fileUrl } = await upload.uploadFile(i, {
                onBegin: ({ cancel }) => console.log('File upload started!'),
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
