/**
 * @zh 异步通道，等待上一个任务完成，然后接取完成后最新的任务
 * @example onClick={(e) => {
                ClickChannel(async (e) => {
                    // async function
                }, e);
            }}
 */
export const useSingleAsync = () => {
    let running = false;
    return {
        async newChannel<T, D extends Array<unknown>>(
            asyncFunc: (...args: D) => T,
            ...args: D
        ): Promise<Awaited<T>> {
            if (running) return;
            running = true;
            const it = asyncFunc(...args);
            await it;
            running = false;
            return await it;
        },
    };
};
