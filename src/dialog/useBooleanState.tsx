import { Setter } from 'solid-js'

/** 快速生成针对 boolean 值的操作函数 */
export const useBooleanState = (setter: Setter<boolean>, options: { beforeHide?: () => Promise<void> | void } = {}) => {
    const toggle = (val?: boolean) => {
        if (typeof val === 'boolean') return setter(val)
        return setter((i) => !i)
    }
    return {
        toggle,
        show() {
            toggle(true)
        },
        async hide() {
            await options.beforeHide?.()
            toggle(false)
        }
    }
}
