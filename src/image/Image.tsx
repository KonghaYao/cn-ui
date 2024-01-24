import { JSX, mergeProps } from 'solid-js'

import { OriginComponent, extendsEvent } from '@cn-ui/reactive'
export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type ImagePosition = 'center' | 'top' | 'right' | 'bottom' | 'left' | string
export interface ImageProps extends JSX.HTMLAttributes<HTMLImageElement> {
    src: string
    fit?: ImageFit
    position?: ImagePosition
    round?: boolean
    block?: boolean
    width?: number
    height?: number
    radius?: number
}

export const Image = OriginComponent<ImageProps, HTMLImageElement>((props) => {
    props = mergeProps(
        {
            alt: 'This is an Image',
            fit: 'cover' as ImageFit
        },
        props
    )
    return (
        <img
            height={props.height}
            width={props.width}
            class={props.class('cn-image m-auto h-full')}
            style={{
                ...props.style,
                'object-fit': props.fit,
                'object-position': props.position
            }}
            src={props.src}
            {...extendsEvent(props)}
        />
    )
})
