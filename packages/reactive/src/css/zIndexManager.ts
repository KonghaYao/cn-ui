export const zIndexManager = {
    incr: 10000,
    getIndex: () => {
        return zIndexManager.incr++;
    },
};
