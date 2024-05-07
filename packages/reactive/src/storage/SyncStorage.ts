import { watch } from "solidjs-use";
import type { Atom } from "../atom";

export interface StorageTransform<T, D> {
    toValue: (d: D) => T;
    toStorage: (t: T) => D;
    equal: (t: T, d: D) => boolean;
}

export interface SyncStorageOptions<T, D> extends StorageTransform<T, D> {
    storage: Storage;
    /**
     * 初始化时，数据发生冲突，是否历史数据优先
     * @default true
     */
    storageFirst?: boolean;
}

export const getDefaultSyncStorageOptions = function <T>(): SyncStorageOptions<T, string> {
    return {
        storage: localStorage,
        toValue(d) {
            return JSON.parse(d) as T;
        },
        toStorage(t) {
            return JSON.stringify(t);
        },
        equal(t, d) {
            return this.toStorage(t) === d;
        },
        storageFirst: true,
    };
};
/** 同步 Atom 与 Storage 的方法 */
export const SyncStorage = <T>(
    a: Atom<T>,
    key: string,
    transform: SyncStorageOptions<T, string> = getDefaultSyncStorageOptions(),
) => {
    const setStorage = () => transform.storage.setItem(key, transform.toStorage(a()));
    const sync = (init = false) => {
        const data = transform.storage.getItem(key);
        if (data === null) {
            // 无历史时初始化
            setStorage();
            return;
        }
        const isEqual = transform.equal(a(), data);
        if (!isEqual) {
            if (init && (transform.storageFirst ?? true)) {
                // 初始化 冲突解决方案
                a(() => transform.toValue(data));
            } else {
                setStorage();
            }
        }
    };
    sync(true);
    const stop = watch(a, () => sync());
    return { stop, sync };
};
