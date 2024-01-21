type ensureParameters<T> = T extends (...args: any) => any ? Parameters<T> : never
type ensureReturnType<T> = T extends (...args: any) => any ? ReturnType<T> : never

/** 从构造函数和原始数据中统一为原始数据 */
export const ensureFunctionResult = <T>(result: T, props?: ensureParameters<T>): ensureReturnType<T> => {
    if (typeof result === 'function') {
        return result(props)
    }
    /** @ts-ignore */
    return result
}
