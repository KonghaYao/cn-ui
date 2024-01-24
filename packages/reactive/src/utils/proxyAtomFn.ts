import { Atom } from '../atom/atom'

/** 代理原子内部数据对象的函数 */
export const proxyAtomFn = <T, const D extends keyof T = keyof T>(atom: Atom<T>, keys: D[]): Pick<T, D> => {
    return Object.fromEntries(
        keys.map((key) => {
            const originVal = atom()[key]
            const val = function (...args: any) {
                return typeof originVal === 'function' ? ((atom()[key] as Function)(...args), atom((i) => i)) : atom()[key]
            }
            return [key, val]
        })
    ) as unknown as Pick<T, D>
}
