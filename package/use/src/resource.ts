import { Accessor, createSignal } from 'solid-js';
import { Atom, atom } from './atom';
export interface ResourceBase<T> {
    loading: Accessor<boolean>;
    error: Accessor<Error | false>;
    isReady: Accessor<boolean>;
    refetch: () => Promise<boolean>;
    mutate: (data: T) => void;
}
export interface ResourceAtom<T> extends ResourceBase<T>, Atom<T> {}

/** 获取异步数据 */
export const resource = <T>(fetcher: () => Promise<T>, initValue: T = null): ResourceAtom<T> => {
    const data = atom<T>(initValue);
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal<Error | false>(false);
    const [isReady, setReady] = createSignal(false);
    const refetch = async () => {
        setLoading(true);
        return fetcher()
            .then((res) => {
                data(() => res);
                setReady(true);
                return true;
            })
            .catch((err) => {
                setError(err);
                setReady(false);
                return false;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    refetch();
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
