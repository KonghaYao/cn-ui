export const sleep = <T>(ms: number, data?: T) =>
    new Promise((res) => setTimeout(() => res(data), ms));
