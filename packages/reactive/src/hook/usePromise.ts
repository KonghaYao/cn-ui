export const usePromise = <T>() => {
    let resolve: (value: T) => void;
    let reject: (reason?: any) => void;
    const p = new Promise<T>((res_, rej_) => {
        resolve = res_;
        reject = rej_;
    });
    /** @ts-ignore */
    return { resolve, reject, promise: p };
};
