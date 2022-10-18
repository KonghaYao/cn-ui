export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'mockUpload',
        description: '非属性，为测试的一个效果',
        test: true,
    },
    {
        type: 'switch',
        default: false,
        prop: 'multiple',
        refresh: true,
    },
    {
        type: 'select',
        default: 'replace',
        prop: 'mode',
        options: ['replace', 'add'].map((i) => ({ value: i })),
        refresh: true,
    },
];

import { atom } from '@cn-ui/use';
import { Space, SimpleUploader, UploaderRoot, UploadList } from '@cn-ui/core';

import { fakeUpload, mockUpload } from '../../mocks/upload';
export default (props) => {
    const Files = atom([]);
    return (
        <div>
            <UploaderRoot
                Files={Files}
                uploading={props.mockUpload ? mockUpload : fakeUpload}
                {...props}
            >
                <Space vertical class="w-full">
                    <SimpleUploader></SimpleUploader>
                    <UploadList class="w-full"></UploadList>
                </Space>
                {/* <UploadPanel></UploadPanel> */}
            </UploaderRoot>
        </div>
    );
};
