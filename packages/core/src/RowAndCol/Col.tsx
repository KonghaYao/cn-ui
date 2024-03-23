import { OriginComponent, OriginDiv, spanToWidth, useBreakPointMapper } from '@cn-ui/reactive'
import { RowCtx } from './Row'
import { createMemo } from 'solid-js'
export type ColSizeObject = {
    span?: number
    offset?: number
    pull?: number
    push?: number
}
export type ColSize = number | ColSizeObject
export type ColProps = {
    /** @todo */
    tag?: string
    span?: number
    /** @todo */
    offset?: number
    /** @todo */
    pull?: number
    /** @todo */
    push?: number
    xs?: ColSize
    sm?: ColSize
    md?: ColSize
    lg?: ColSize
    xl?: ColSize
    xxl?: ColSize
}

export const Col = OriginComponent<ColProps>((props) => {
    const responsiveSpan = useBreakPointMapper(props as unknown as ColProps)
    const spanWidth = createMemo(() => {
        let span = props.span
        const res = responsiveSpan()
        if (res) {
            if (typeof res === 'number') {
                span = res
            } else if (res.span) {
                span = res.span
            }
        }
        return spanToWidth(span ?? 24)
    })
    const RowContext = RowCtx.use()
    return (
        <OriginDiv
            prop={props}
            style={{
                'padding-left': RowContext?.gutterX,
                'padding-right': RowContext?.gutterX,
                'padding-top': RowContext?.gutterY,
                'padding-bottom': RowContext?.gutterY,
                'max-width': spanWidth(),
                flex: `0 0 ${spanWidth()}`
            }}
        >
            {props.children}
        </OriginDiv>
    )
})
