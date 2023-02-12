import { Accessor, createEffect, createMemo, on } from 'solid-js';
import { Atom, AtomTypeSymbol, atom } from './atom';
import { useEffectWithoutFirst } from './useEffect';
export interface ResourceBase<T> {
    loading: Accessor<boolean>;
    error: Accessor<Error>;
    isReady: Accessor<boolean>;
    /** 重新进行异步行为 */
    refetch: (option?: RefetchOption) => Promise<boolean>;
    /** 同步突变数据 */
    mutate: (data: T) => void;
    /** 正在进行的 Promise */
    promise: () => Promise<boolean>;
}
export interface ResourceAtom<T> extends ResourceBase<T>, Atom<T> {}

export interface ResourceOptions<T> {
    initValue?: T;
    immediately?: boolean;
    /** 填写依赖元素，依赖元素发生改变，则会自动更新 */
    deps?: Accessor<unknown>[];
    refetch?: RefetchOption;
    tap?: (data: T) => void;
}
export interface RefetchOption {
    /** 如果发生了异步函数覆盖，进行警告*/
    warn?: boolean;
    /** 如果发生了异步函数覆盖，并且需要撤销操作的时候使用 */
    cancelCallback?: (p: Promise<boolean>) => void;
}
/**
 * @zh 安全获取异步数据并返回状态
 * @description 使用 resource 创建一个异步绑定的 Atom
 */
export const resource = <T>(
    fetcher: () => Promise<T>,
    {
        /** @ts-ignore */
        initValue = null,
        immediately = true,
        deps,
        refetch: defaultRefetch = {},
        tap: tapFn = (data) => {},
    }: ResourceOptions<T> = {}
): ResourceAtom<T> => {
    const data = atom<T>(initValue);
    const loading = atom(false);
    const error = atom<Error | false>(false);
    const isReady = createMemo(() => !!(!loading() && !error()));
    let p = Promise.resolve(false);

    const refetch = async ({ warn = true, cancelCallback } = defaultRefetch) => {
        // 上一次请求尚未结束
        if (!isReady()) {
            if (cancelCallback) {
                cancelCallback(p); // 调用取消函数立即取消上次使用
            } else if (warn) {
                console.warn(
                    'Resource Atom: some fetch has been covered; Recommend to add a cancelCallback to some Hook'
                );
            }
        }

        loading(true);
        const tempP = fetcher()
            .then((res) => {
                data(() => res);
                loading(false);
                // 当自己没有被 cancel 时，进行 tap 函数
                if (tempP === p) tapFn(res);
                return true;
            })
            .catch((err) => {
                error(err);
                loading(false);
                // 直接抛出异常
                return err;
            });
        p = tempP;
        return tempP;
    };

    // 注意，不能直接进行 refetch，直接 refetch 会导致 solid-js 的整个页面重载
    immediately && refetch(); // 第一次肯定不需要测试覆盖
    deps && deps.length && useEffectWithoutFirst(() => refetch(defaultRefetch), deps);
    return Object.assign(data, {
        error,
        loading,

        mutate(newData) {
            data(() => newData);
        },
        isReady,

        refetch,
        promise: () => {
            return p;
        },
        [AtomTypeSymbol]: 'resource',
    } as ResourceBase<T>);
};
