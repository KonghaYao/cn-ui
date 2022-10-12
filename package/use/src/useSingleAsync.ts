/**
 * @zh 异步通道，等待上一个任务完成，然后允许接收最新的任务
 * @description 主要用于控制事件完成前的锁定状态
 * @example
 */
export const useSingleAsync = function <T extends Function>(asyncFunc: T): T {
    let running = false;
    return function (...args: any[]) {
        if (running) return null;
        running = true;
        return Promise.resolve(asyncFunc.apply(this, args)).then((res) => {
            running = false;
            return res;
        });
    } as any as T;
};
