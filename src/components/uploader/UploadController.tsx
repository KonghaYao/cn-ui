import { atom } from '@cn-ui/use';
import { Atom } from 'solid-use';
import { sha256 } from '../_util/sha256/sha256';
import { ExFile } from './ExFile';

/** 开发者自定义的 Uploader，只需要进行上传和通知即可 */
export type UploadFunc = (notify: UploaderNotify, files: ExFile[]) => Promise<boolean>;
export interface UploaderNotify {
    (a: number): void;
    (error: Error): void;
}

const shaStore = new WeakMap<ExFile, string>();
const shaList = new Set<string>();
export class UploadController {
    uploadState: {
        // -1 错误 0-100 为进度
        [sha: string]: Atom<number | Error>;
    } = {};
    constructor(public uploader: UploadFunc) {}

    async calcSha(file: ExFile) {
        if (shaStore.has(file)) return shaStore.get(file);
        const result = sha256(await file.arrayBuffer());
        shaStore.set(file, result);
        shaList.add(result);
        return result;
    }

    async createSlot(file: ExFile) {
        const sha = await this.calcSha(file);
        this.uploadState[sha] = atom(0);
        file.sha = sha;
        file.progress = this.uploadState[sha];
        return this.uploadState[sha];
    }
    getNotice(sha: string) {
        return this.uploadState[sha];
    }
    async createSlots(files: ExFile[]) {
        return Promise.all(
            files.map((i) => {
                return this.createSlot(i);
            })
        );
    }
    async upload(files: ExFile[]) {
        const notify: UploaderNotify = (data) => {
            files.forEach((i) => {
                this.calcSha(i).then((sha) => {
                    this.uploadState[sha](data);
                });
            });
        };
        // 没错，不监听异步返回
        return this.uploader(notify, files);
    }
}
