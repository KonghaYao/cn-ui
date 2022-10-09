import { sha256 } from '../_util/sha256/sha256';
import { ExFile } from './ExFile';

/** 开发者自定义的 Uploader，只需要进行上传和通知即可 */
export type UploadFunc = (notify: UploaderNotify, files: ExFile[]) => Promise<boolean>;
export class UploaderNotify {
    progress() {}
    error() {}
    success() {}
}

export class UploadController {
    private shaStore = new WeakMap<ExFile, string>();
    private shaList = new Set<string>();
    uploadState: {
        // -1 错误 0-100 为进度
        [sha: string]: number;
    } = {};
    constructor(public uploader: UploadFunc) {}

    async calcSha(file: ExFile) {
        if (this.shaStore.has(file)) return this.shaStore.get(file);
        const result = sha256(await file.arrayBuffer());
        this.shaStore.set(file, result);
        this.shaList.add(result);
        return result;
    }
    async upload(files: ExFile[]) {
        const notify = new UploaderNotify();
        return this.uploader(notify, files);
    }
}
