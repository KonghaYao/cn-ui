import { UploadFunc } from '@cn-ui/core/src/components/Uploader/base/UploadController';
/** 虚假的 Upload，只是模拟而已 */
export const fakeUpload: UploadFunc = async (notify, files, onCancel) => {
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
/** 真实模拟上传 */
export const mockUpload: UploadFunc = async (notify, files, onCancel) => {
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
