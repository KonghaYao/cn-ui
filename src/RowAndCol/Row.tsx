import { OriginComponent, OriginDiv, createCtx, reflect } from '@cn-ui/reactive'
import { toCSSPx } from '@cn-ui/reactive'

export const RowJustify = ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'] as const

export const RowAlign = ['top', 'middle', 'bottom'] as const

export type RowProps = {
    /** @todo */
    tag?: string
    gutter?: number | string
    justify?: (typeof RowJustify)[number]
    align?: (typeof RowAlign)[number]
}
export const RowCtx = createCtx<{
    gutter: string
}>()

export const Row = OriginComponent<RowProps>((props) => {
    return (
        <RowCtx.Provider
            value={{
                gutter: toCSSPx(props.gutter, '8px')
            }}
        >
            <OriginDiv
                prop={props}
                class="flex flex-row flex-wrap"
                style={{
                    // gap: toCSSPx(props.gutter, '8px'),
                    'justify-content': props.justify ?? 'start',
                    'align-items': props.align,
                    'margin-bottom': toCSSPx(20)
                }}
            >
                {props.children}
            </OriginDiv>
        </RowCtx.Provider>
    )
})
