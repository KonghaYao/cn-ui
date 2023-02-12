/**
 * @zh 异步锁定通道，等待上一个任务完成，然后允许接收最新的任务
 * @description 主要用于控制事件完成前的锁定状态
 * @example
 */
export const asyncLock = function <T extends Function>(asyncFunc: T): T {
    let running: Promise<any> | false = false;
    return function (this: ThisType<T>, ...args: any[]) {
        if (running) return running;
        running = Promise.resolve(asyncFunc.apply(this, args)).then((res) => {
            running = false;
            return res;
        });
        return running;
    } as any as T;
};
export const useSingleAsync = asyncLock;
