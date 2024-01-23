/** 输入 10 或者 10px ，转为 CSS 文本
 * @example
 * const px = toCSSPx(prop.width, '20px')
 */
export const toCSSPx = (val: number | string | undefined, defaultValue = ''): string => {
    switch (typeof val) {
        case 'number':
            return val + 'px'
        case 'string':
            return val
        default:
            return defaultValue
    }
}
