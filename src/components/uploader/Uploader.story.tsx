export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'mockUpload',
        description: '非属性，为测试的一个效果',
        test: true,
    },
];

import { atom } from '@cn-ui/use';
import { UploadPanel, Space, SimpleUploader, UploaderRoot, UploadList, ExFile } from '@cn-ui/core';
import { fakeUpload, mockUpload } from '../../mocks/upload';
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
