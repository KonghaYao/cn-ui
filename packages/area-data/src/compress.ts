/** 压缩键为数字的对象，这种压缩方式可以减少存储量 */
export function compress(list: Record<string | number, string>) {
    const sortedData = Object.entries(list).map(i => {
        /** @ts-ignore */
        i[0] = parseInt(i[0])
        return i as any as [number, string]
    }).sort((a, b) => {
        return a[0] - b[0]
    });
    let last = 0;
    /*
        记录 0 ，遍历数组的时候，遇到数字将 count 加上，为后面的 key 值
        @example [110101, "东城区", "西城区", 3, "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区"]
    */
    return sortedData.flatMap(([index, val]) => {
        const diff = index - last;
        let res: [string] | [number, string];
        if (diff === 1) {
            res = [val];
        } else if (diff < 0) {
            throw new Error(index + '');
        } else {
            res = [diff, val];
        }
        last = index;
        return res;
    });
}
/** 解压缩 compress 的数据 */
export const decompress = (data: (number | string)[]): Record<string, string> => {
    let count = 0;
    let keep = false;
    const d: Record<string, string> = {};
    data.forEach(i => {
        if (typeof i === 'number') {
            count += i;
            keep = true;
        } else {
            !keep ? (count++) : (keep = false);
            d[count] = i;
        }
    });
    return d;
};
