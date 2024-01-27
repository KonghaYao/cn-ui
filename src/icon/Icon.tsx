import { Component, JSXElement } from 'solid-js'

export const Icon: Component<{ children: JSXElement }> = (props) => {
    return (
        <span
            role="img"
            class="inline-flex align-center text-center leading-[0]"
            style={{
                'vertical-align': '-0.125em'
            }}
        >
            {props.children}
        </span>
    )
}
