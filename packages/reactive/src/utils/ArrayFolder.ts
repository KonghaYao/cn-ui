/** 一维数组折叠为二维数组，通过 Proxy 减少计算*/
export const ArrayFolder = <T>(arr: T[], spaceSize = 10) => {
    return new Proxy(arr, {
        get(target, key) {
            if (key === 'length') {
                return Math.ceil(target.length / spaceSize)
            }
            const numberKey = parseInt(key as string)
            if (isNaN(numberKey)) return
            return target.slice(numberKey * spaceSize, (numberKey + 1) * spaceSize)
        }
    }) as unknown as T[][]
}
