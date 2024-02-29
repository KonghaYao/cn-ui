type ensureParameters<T> = T extends (...args: any) => any ? Parameters<T> : never
type ensureReturnType<T> = T extends (...args: any) => any ? ReturnType<T> : never

/** 从构造函数和原始数据中统一为原始数据 */
export const ensureFunctionResult = <T>(result: T, props?: ensureParameters<T>, bindThis?: unknown): ensureReturnType<T> => {
    if (typeof result === 'function') {
        // @ts-ignore
        return result.apply(bindThis, props ?? [])
    }
    /** @ts-ignore */
    return result
}

export const ensureArrayReturn = <T>(i: T | T[]) => {
    return Array.isArray(i) ? i : [i]
}
