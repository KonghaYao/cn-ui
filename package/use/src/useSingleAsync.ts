/**
 * @zh 异步通道，等待上一个任务完成，然后允许接收最新的任务
 * @en An asynchronous channel that waits for the last Promise to complete and then allows the latest async function to be executed
 * @description 主要用于控制事件完成前的锁定状态
 * @example
onClick={(e) => {
    ClickChannel(async (e) => {
        // async function
    }, e);
}}
 */
export const useSingleAsync = <T, D extends Array<unknown>>(asyncFunc: (...args: D) => T) => {
    let running = false;
    return function (...args: D) {
        return async () => {
            if (running) return;
            running = true;
            const it = await asyncFunc(...args);
            running = false;
            return it;
        };
    };
};
