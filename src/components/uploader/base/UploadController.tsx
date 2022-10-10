import { atom } from '@cn-ui/use';
import { Atom } from 'solid-use';
import { sha256 } from '../../_util/sha256/sha256';
import { ExFile } from './ExFile';

/** 开发者自定义的 Uploader，只需要进行上传和通知即可 */
export type UploadFunc = (notify: UploaderNotify, files: ExFile[]) => Promise<boolean>;
/** 通知视图更新，如果设置了 sha，只更新sha 值，没有更新，那么全部更新 */
export type UploaderNotify = (a: number | Error, sha?: string) => void;

export class UploadController {
    uploadState: {
        // -1 错误 0-100 为进度
        [sha: string]: Atom<number | Error>;
    } = {};
    constructor(public uploader: UploadFunc) {}

    /** 计算 sha 值，并进行缓存 */
    async calcSha(file: ExFile) {
        if (file.sha) return file.sha;
        return sha256(await file.arrayBuffer());
    }

    async createSlot(file: ExFile) {
        const sha = await this.calcSha(file);
        if (!this.uploadState[sha]) {
            this.uploadState[sha] = atom(0);
            file.sha = sha;
            file.progress = this.uploadState[sha];
        }
        return this.uploadState[sha];
    }
    getNotice(sha: string) {
        const data = this.uploadState[sha];
        return data ? data() : -1;
    }
    async createSlots(files: ExFile[]) {
        return Promise.all(
            files.map((i) => {
                return this.createSlot(i);
            })
        );
    }
    async upload(files: ExFile[]) {
        const notify: UploaderNotify = (data: number | Error, sha?: string) => {
            if (sha) {
                this.uploadState[sha](data);
            } else {
                files.forEach((i) => {
                    this.calcSha(i).then((sha) => {
                        this.uploadState[sha](data);
                    });
                });
            }
        };
        // 没错，置 1 表示开始
        notify(1);
        return this.uploader(notify, files).then((i) => {
            notify(100);
            return i;
        });
    }
}
