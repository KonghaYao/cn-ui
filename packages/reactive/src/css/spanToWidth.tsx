/**
 * span 值转化为百分比字符串
 * @example
 * const width = spanToWidth(props.span ?? 8) // '25%'
 */
export const spanToWidth = (span: number, maxSpan = 24) => {
    return ((span * 100) / maxSpan).toFixed(6) + '%'
}
