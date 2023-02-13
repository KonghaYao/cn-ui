export const sleep = <T>(ms: number, data?: T) =>
    new Promise<T>((res) => setTimeout(() => res(data!), ms));
