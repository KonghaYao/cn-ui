/**
 * @zh 遍历字符串中的 CharCode
 */
export const CharCodeForEach = (str: string, cb: (code: number) => void) => {
    for (let index = 0; index < str.length; index++) {
        const element = str.charCodeAt(index);
        cb(element);
    }
};

/**
 * @zh 将一个字符串映射到指定的数组位置，比如根据文本变换指定颜色
 */
export const getStringAreaIndex = (str: string, length: number) => {
    let count = 0;
    CharCodeForEach(str, (code) => (count += code));
    return count % length;
};
