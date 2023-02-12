import { Accessor, createEffect, createMemo, on } from 'solid-js';
import { Atom, AtomTypeSymbol, atom } from './atom';
import { useEffectWithoutFirst } from './useEffect';
export interface ResourceBase<T> {
    loading: Accessor<boolean>;
    error: Accessor<Error>;
    isReady: Accessor<boolean>;
    /** 重新进行异步行为 */
    refetch: () => Promise<boolean>;
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
    }: ResourceOptions<T> = {}
): ResourceAtom<T> => {
    const data = atom<T>(initValue);
    const loading = atom(immediately);
    const error = atom<Error | false>(false);
    const isReady = createMemo(() => !!(!loading() && !error()));
    let p = Promise.resolve(false);
    const refetch = async () => {
        loading(true);
        p = fetcher()
            .then((res) => {
                data(() => res);
                loading(false);
                return true;
            })
            .catch((err) => {
                error(err);
                loading(false);
                // 直接抛出异常
                return err;
            });
        return p;
    };

    // 注意，不能直接进行 refetch，直接 refetch 会导致 solid-js 的整个页面重载
    immediately && setTimeout(() => refetch());
    deps && deps.length && useEffectWithoutFirst(refetch, deps);
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
