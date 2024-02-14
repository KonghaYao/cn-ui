import { createContext, useContext } from 'solid-js'
export interface BlackBoardOption {
    allowSameRegister?: boolean
}
/**
 * @zh Blackboard 是用于大型软件中的 api 互通系统，用于解决 Context 不能兄弟互通数据的问题。可以全局注册，也可局部注册
 *
 */
export const createBlackBoard = <T extends Record<string, any>>(baseOpts: BlackBoardOption = {}) => {
    const store = new Map()

    return {
        /** 应该在组件声明时进行注册 App，保证在 onMount 时能够获取到数据 */
        register<D extends keyof T>(name: D, api: T[D], opts: BlackBoardOption = {}) {
            if (store.has(name)) {
                if (opts.allowSameRegister ?? baseOpts.allowSameRegister) return store
                throw new Error('Blackboard has a same app named ' + name.toString())
            }
            return store.set(name, api)
        },
        /** 在 onMount 阶段可以获取到所有声明的 App */
        getApp<D extends keyof T>(name: D): T[D] {
            if (!store.has(name)) throw new Error(`Blackboard app ${name.toString()} isn't init yet`)
            return store.get(name)
        },
        delete(name: keyof T) {
            if (!store.has(name)) throw new Error(`Blackboard app ${name.toString()} isn't init yet`)
            store.delete(name)
        },
        /** 检查APP是否注册*/
        check(name: keyof T) {
            return store.has(name)
        },
        destroy() {
            store.clear()
        }
    }
}

/**
 * @zh Context 和 useContext 一体化
 * @example
 * const ctx = createCtx<{
 *      username: '江夏尧',
 *      password: '123456'
 * }>();
 *
 * // parent
 * ()=> <ctx.Provider value={ctx.defaultValue}></ctx.Provider>
 *
 * // child
 * const info = ctx.use()
 *
 *  */
export const createCtx = <T>(data?: T) => {
    const ctx = createContext(data)
    return {
        ...ctx,
        use<D = T>() {
            const context = useContext(ctx)
            if (context === undefined) {
                throw new Error('context is empty: place check parent jsx element!')
            }
            return context as D
        }
    }
}
