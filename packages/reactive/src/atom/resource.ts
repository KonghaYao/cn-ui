import { Accessor, batch, createEffect, createMemo, untrack } from 'solid-js'
import { Atom, AtomTypeSymbol, atom } from './atom'
import { useEffectWithoutFirst } from './useEffect'
export interface ResourceBase<T, Params> {
    loading: Accessor<boolean>
    error: Accessor<Error>
    isReady: Accessor<boolean>
    /** 重新进行异步行为 */
    refetch: (params?: Params, option?: RefetchOption) => Promise<boolean>
    /** 同步突变数据 */
    mutate: (data: T) => void
    /** 正在进行的 Promise */
    promise: () => Promise<boolean>
}
export interface ResourceAtom<T, Params = unknown> extends ResourceBase<T, Params>, Atom<T> {}

export interface ResourceOptions<T> {
    initValue?: T
    immediately?: boolean
    /** 填写依赖元素，依赖元素发生改变，则会自动更新 */
    deps?: Accessor<unknown>[]
    refetch?: RefetchOption

    /** 当成功时，发送副作用 */
    onSuccess?: (data: T) => void
    /** 当发生错误时，发送副作用 */
    onError?: (data: T) => void
}
export interface RefetchOption {
    /** 如果发生了异步函数覆盖，进行警告*/
    warn?: boolean
    /** 如果发生了异步函数覆盖，并且需要撤销操作的时候使用 */
    cancelCallback?: (p: Promise<boolean>) => void
}
/**
 * @zh 安全获取异步数据并返回状态
 * @description 使用 resource 创建一个异步绑定的 Atom，默认直接调用
 */
export const resource = <T, Params = unknown>(
    // TODO 添加第二个参数用于取消
    fetcher: (val?: Params) => Promise<T>,
    {
        /** @ts-ignore */
        initValue = null,
        immediately = true,
        deps,
        refetch: defaultRefetch = {},
        onSuccess = () => {},
        onError = () => {}
    }: ResourceOptions<T> = {}
): ResourceAtom<T, Params> => {
    /** 存储结果数据 */
    const data = atom<T>(initValue)

    /** 加载态 */
    const loading = atom(false)

    /** 存储错误信息 */
    const error = atom<Error | false>(false)

    /** 判断数据是否已加载完毕 */
    const isReady = createMemo(() => !!(!loading() && !error()))

    /** 初始化 Promise，并初始值为 false */
    let p = Promise.resolve(false)

    /** 重新使用异步函数 */
    const refetch = async (val?: Params, { warn = true, cancelCallback } = defaultRefetch) => {
        // 上一次请求尚未结束
        if (!isReady()) {
            if (cancelCallback) {
                cancelCallback(p) // 调用取消函数立即取消上次使用
            } else if (warn) {
                console.warn('Resource Atom: some fetch has been covered; Recommend to add a cancelCallback to some Hook')
            }
        }

        loading(true)
        const tempP = fetcher(val)
            .then((res) => {
                batch(() => {
                    data(() => res)
                    loading(false)
                    error(false)
                })
                // 当自己没有被 cancel 时，进行 tap 函数
                if (tempP === p) onSuccess(res)
                return true
            })
            .catch((err) => {
                batch(() => {
                    error(err)
                    loading(false)
                })
                onError(err)
                // 直接抛出异常
                return err
            })
        p = tempP
        return tempP
    }

    // 注意，不能直接进行 refetch，直接 refetch 会导致 solid-js 的整个页面重载
    immediately && refetch() // 第一次肯定不需要测试覆盖

    // 延续依赖
    deps && deps.length && useEffectWithoutFirst(() => refetch(undefined, defaultRefetch), deps)

    return Object.assign(data, {
        error,
        loading,
        mutate(newData) {
            data(() => newData)
        },
        isReady,
        refetch,
        promise: () => {
            return p
        },
        [AtomTypeSymbol]: 'resource'
    } as ResourceBase<T, Params>)
}
/** 自动收集依赖的 resource，但是注意，必须在同步作用域进行依赖处理，否则无效 */
export const autoResource = <T, Params = unknown>(
    // TODO 添加第二个参数用于取消
    fetcher: (val?: Params) => Promise<T>,
    {
        /** @ts-ignore */
        initValue = null,
        refetch: defaultRefetch = {},
        onSuccess = () => {},
        onError = () => {}
    }: ResourceOptions<T> = {}
): ResourceAtom<T, Params> => {
    /** 存储结果数据 */
    const data = atom<T>(initValue)

    /** 加载态 */
    const loading = atom(false)

    /** 存储错误信息 */
    const error = atom<Error | false>(false)

    /** 判断数据是否已加载完毕 */
    const isReady = createMemo(() => !!(!loading() && !error()))

    /** 初始化 Promise，并初始值为 false */
    let p = Promise.resolve(false)

    /** 重新使用异步函数 */
    const refetch = async (val?: Params, { warn = true, cancelCallback } = defaultRefetch) => {
        // 上一次请求尚未结束
        if (!untrack(isReady)) {
            if (cancelCallback) {
                cancelCallback(p) // 调用取消函数立即取消上次使用
            } else if (warn) {
                console.warn('Resource Atom: some fetch has been covered; Recommend to add a cancelCallback to some Hook')
            }
        }

        untrack(() => {
            loading(true)
        })
        const tempP = fetcher(val)
            .then((res) => {
                batch(() => {
                    data(() => res)
                    loading(false)
                    error(false)
                })
                // 当自己没有被 cancel 时，进行 tap 函数
                if (tempP === p) onSuccess(res)
                return true
            })
            .catch((err) => {
                batch(() => {
                    error(err)
                    loading(false)
                })
                onError(err)
                // 直接抛出异常
                return err
            })
        p = tempP
        return tempP
    }

    createEffect(() => refetch(undefined, defaultRefetch))

    return Object.assign(data, {
        error,
        loading,
        mutate(newData) {
            data(() => newData)
        },
        isReady,
        refetch,
        promise: () => {
            return p
        },
        [AtomTypeSymbol]: 'resource'
    } as ResourceBase<T, Params>)
}
