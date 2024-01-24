let defaultRefuse = () => {}
/** 设置全局的拒绝事件 */
export const setAsyncLockDefaultRefuse = (func: Parameters<typeof asyncLock>[1]) => {
    if (func) defaultRefuse = func
}

/**
 * @zh 异步锁定通道，等待上一个任务完成，然后允许接收最新的任务
 * @description 主要用于控制事件完成前的锁定状态
 */
export const asyncLock = function <T extends (...args: any[]) => any>(
    asyncFunc: T,
    /** 当触发被拒绝时 */
    refuseCallback = defaultRefuse
): T {
    let running: Promise<ReturnType<T>> | false = false
    return function (this: ThisType<T>, ...args: any[]) {
        if (running) {
            refuseCallback && refuseCallback()
            return running
        }
        running = Promise.resolve(asyncFunc.apply(this, args)).then((res) => {
            running = false
            return res
        })
        return running
    } as any as T
}
/** @deprecated use asyncLock instead */
export const useSingleAsync = asyncLock
