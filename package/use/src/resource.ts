import { Accessor, createMemo, createSignal } from 'solid-js';
import { Atom, atom } from './atom';
export interface ResourceBase<T> {
    loading: Accessor<boolean>;
    error: Accessor<Error>;
    isReady: Accessor<boolean>;
    refetch: () => Promise<boolean>;
    mutate: (data: T) => void;
}
export interface ResourceAtom<T> extends ResourceBase<T>, Atom<T> {}

/**
 * 安全获取异步数据并返回状态
 * @description 在 Solid-js 中的 createResource 会导致重复请求问题，所以采用 resource 比较合适
 */
export const resource = <T>(
    fetcher: () => Promise<T>,
    initValue: T = null,

    immediately = true
): ResourceAtom<T> => {
    const data = atom<T>(initValue);
    const [loading, setLoading] = createSignal(immediately);
    const [error, setError] = createSignal<Error | false>(false);
    const isReady = createMemo(() => !loading() && !error());
    const refetch = async () => {
        setLoading(true);
        return fetcher()
            .then((res) => {
                data(() => res);
                return true;
            })
            .catch((err) => {
                setError(err);
                return false;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 注意，不能直接进行 refetch，
    // 直接 refetch 会导致 solid-js 的整个页面重载
    immediately && setTimeout(() => refetch());
    return Object.assign(data, {
        error,
        loading,
        mutate(newData) {
            data(() => newData);
        },
        isReady,
        refetch,
    } as ResourceBase<T>);
};
