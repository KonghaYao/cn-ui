import { OriginComponent, extendsEvent } from '@cn-ui/reactive'
import { JSXElement } from 'solid-js'

export const Icon = OriginComponent<{ children: JSXElement }>((props) => {
    return (
        <span
            role="img"
            class={props.class('inline-flex align-center text-center leading-[0]')}
            style={{
                ...props.style,
                'vertical-align': '-0.125em'
            }}
            {...extendsEvent(props)}
        >
            {props.children}
        </span>
    )
})
