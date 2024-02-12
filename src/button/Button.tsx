import { JSXSlot, OriginComponent, OriginDiv, extendsEvent, useMapper } from '@cn-ui/reactive'

export interface ButtonProps {
    type?: 'primary' | 'dashed' | 'link' | 'text' | 'default'
    htmlType?: HTMLButtonElement['type']
    icon?: JSXSlot
    shape?: 'default' | 'circle' | 'round'
    disabled?: boolean
    loading?: boolean | { delay?: number }
    ghost?: boolean
    danger?: boolean
    block?: boolean
}
export const Button = OriginComponent<ButtonProps, HTMLButtonElement>((props) => {
    const typeClass = useMapper(() => props.type ?? 'default', {
        primary: 'bg-primary-600',
        dashed: '',
        link: '',
        text: '',
        default: ''
    })
    return (
        <button type={props.htmlType} class={props.class(typeClass())} style={props.style()} {...extendsEvent(props)}>
            {props.children}
        </button>
    )
})
