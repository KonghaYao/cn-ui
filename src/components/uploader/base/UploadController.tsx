import { atom } from '@cn-ui/use';
import { Atom } from '@cn-ui/use';
import { sha256 } from '../../_util/sha256/sha256';
import { ExFile } from './ExFile';

/** 开发者自定义的 Uploader，只需要进行上传和通知即可 */
export type UploadFunc = (
    notify: UploaderNotify,
    files: ExFile[],
    onCancel: (cb: (file: ExFile) => void) => void
) => Promise<boolean>;

/** 通知视图更新，如果设置了 sha，只更新sha 值，没有更新，那么全部更新 */
export type UploaderNotify = (a: number | Error, sha?: string) => void;

import mitt from 'mitt';
import { UploaderRootProps } from './UploaderRoot';
export class UploadController implements Omit<UploaderRootProps, 'children'> {
    uploadState: {
        // -1 取消 0 未开始  1-100 为进度
        [sha: string]: Atom<number | Error>;
    } = {};

    constructor(props: UploaderRootProps) {
        Object.assign(this, props);
        console.log(this);
    }
    mode?: 'add' | 'replace' = 'replace';
    multiple = false;
    accept?: string;
    limit = Infinity;
    uploading: UploadFunc;
    Files: Atom<ExFile[]>;

    /** 计算 sha 值，并进行缓存 */
    async calcSha(file: ExFile) {
        if (file.sha) return file.sha;
        return sha256(await file.arrayBuffer());
    }

    /** 在存储库中加入一个键值对 */
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
    async addFiles(files: ExFile[]) {
        if (this.Files().length < this.limit) {
            if (this.multiple) {
                files = files.slice(0, this.limit - this.Files().length);
            } else {
                files = [files[0]];
            }
            return Promise.all(
                files.map((i) => {
                    return this.createSlot(i);
                })
            ).then((res) => {
                if (this.mode === 'add') {
                    this.Files((i) => [...i, ...files]);
                } else {
                    this.Files(files);
                }
                return res;
            });
        }
    }
    cancelChannel = mitt<{
        [k: string]: void;
    }>();
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
        return this.uploading(notify, files, (cb) => {
            console.log('挂载 cancel');
            files.forEach((i) => {
                this.cancelChannel.on(i.sha, () => cb(i));
            });
        }).then((i) => {
            notify(100);
            return i;
        });
    }
    delete(sha: string) {
        const p = this.getNotice(sha);
        if (p > 0 && p < 100) {
            // 先暂停，再次点击关闭
            this.cancel(sha);
        } else {
            this.Files((i) => i.filter((i) => i.sha !== sha));
            delete this.uploadState[sha];
        }
    }
    cancel(sha: string) {
        this.uploadState[sha](-1);
        this.cancelChannel.emit(sha);
    }
}
