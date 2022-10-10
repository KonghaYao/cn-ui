export const Controller = [];

import { atom, reflect } from '@cn-ui/use';
import { Uploader } from './UploadPanel/UploadPanel';
import { Space } from '../Space';
import { SimpleUploader, UploadingContext } from './SimpleUploader';
import { UploaderRoot } from './base/UploaderRoot';
import { UploadList } from './UploadList';

export default () => {
    const Files = atom([]);
    return (
        <UploaderRoot
            Files={Files}
            uploading={async (notify, files) => {
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
            }}
        >
            <Space vertical class="w-full">
                <SimpleUploader></SimpleUploader>
                <UploadList></UploadList>
            </Space>
            <Uploader></Uploader>
        </UploaderRoot>
    );
};
