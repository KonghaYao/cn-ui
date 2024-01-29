import { OriginComponent, useMapper } from '@cn-ui/reactive'
import { JSX, JSXElement } from 'solid-js'
export interface FlexProps {
    vertical?: boolean
    wrap?: JSX.CSSProperties['flex-wrap']
    justify?: JSX.CSSProperties['justify-content']
    align?: JSX.CSSProperties['align-items']
    flex?: JSX.CSSProperties['flex']
    gap?: JSX.CSSProperties['gap']
    children: JSXElement
}
export const Flex = OriginComponent<FlexProps>((props) => {
    const Wrap = useMapper(
        // @ts-ignore
        () => props.wrap ?? 'wrap',
        {
            wrap: 'flex-wrap',
            nowrap: 'flex-nowrap',
            'wrap-reverse': 'flex-wrap-reverse'
        }
    )
    const Justify = useMapper(
        // @ts-ignore
        () => props.justify ?? 'center',
        {
            normal: 'justify-normal',
            'flex-start': 'justify-start',
            'flex-end': 'justify-end',
            center: 'justify-center',
            'space-between': 'justify-between',
            'space-around': 'justify-around',
            'space-evenly': 'justify-evenly',
            stretch: 'justify-stretch'
        }
    )
    const Align = useMapper(
        // @ts-ignore
        () => props.align ?? 'center',
        {
            'flex-start': 'items-start',
            'flex-end': 'items-end',
            center: 'items-center',
            baseline: 'items-baseline',
            stretch: 'items-stretch'
        }
    )
    return (
        <div class={props.class('flex', Wrap(), Justify(), Align(), props.vertical ? 'flex-col' : 'flex-row')} style={props.style()}>
            {props.children}
        </div>
    )
})