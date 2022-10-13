/** 模拟异步操作 */
export const sleep = <T>(ms: number, data: T = null, rej = false) => {
    return new Promise((resolve, reject) => {
        console.log('执行休眠');
        setTimeout(() => {
            if (rej) {
                reject(data);
            } else {
                resolve(data);
            }
            console.log('休眠结束');
        }, ms);
    });
};
