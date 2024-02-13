import { JSXSlot, OriginComponent, OriginComponentInputType, OriginDiv, ensureFunctionResult, extendsEvent, useMapper } from '@cn-ui/reactive'
import { Match, Switch } from 'solid-js'
import { ButtonStore } from './ButtonStore'
export interface ButtonProps {
    type?: 'primary' | 'dashed' | 'link' | 'default'
    htmlType?: HTMLButtonElement['type']
    icon?: JSXSlot
    shape?: 'default' | 'circle' | 'round'
    disabled?: boolean
    loading?: boolean | { delay?: number }
    ghost?: boolean
    danger?: boolean
    block?: boolean
    circle?: boolean
}
export const Button = OriginComponent<ButtonProps, HTMLButtonElement>((props) => {
    const typeClass = createTypeClass(props)
    const disabledClass = createDisabledClass(props)

    return (
        <button
            type={props.htmlType}
            class={props.class(
                'cn-button transition-colors',
                props.loading && 'pointer-events-none opacity-50',
                props.circle ? 'rounded-full px-2 py-1' : 'rounded-md  px-4 py-1 ',
                props.disabled ? disabledClass() : typeClass()
            )}
            style={props.style()}
            {...extendsEvent(props)}
        >
            <Switch
                fallback={
                    <>
                        {ensureFunctionResult(props.icon)}
                        {props.children}
                    </>
                }
            >
                <Match when={props.icon}>
                    {ButtonStore.loadingIcon()}
                    {'加载中'}
                </Match>
            </Switch>
        </button>
    )
})

function createTypeClass(props: OriginComponentInputType<ButtonProps, HTMLButtonElement, string>) {
    return useMapper(() => props.type ?? 'default', {
        primary: () => {
            const danger = props.danger ? 'bg-error-500 hover:bg-error-400' : 'bg-primary-500 hover:bg-primary-400'
            return `${danger} text-design-ground`
        },
        dashed() {
            return this.default() + ' border-dashed'
        },
        link() {
            const danger = props.danger ? 'text-error-500' : 'text-primary-500'
            return this.default() + ` border-none ${danger}`
        },
        default: () => {
            const danger = props.danger ? 'hover:border-error-400 hover:text-error-400' : 'hover:border-primary-400 hover:text-primary-400'
            return `border-design-border border ${danger} bg-transparent`
        }
    })
}
function createDisabledClass(props: OriginComponentInputType<ButtonProps, HTMLButtonElement, string>) {
    const common = 'opacity-50 cursor-not-allowed'
    return useMapper(() => props.type ?? 'default', {
        primary() {
            return ` border-design-disabled ` + common
        },
        dashed() {
            return this.default() + ' border-dashed'
        },
        link() {
            const danger = props.danger ? 'text-error-500' : 'text-primary-500'
            return this.default() + ` border-none ${danger}`
        },
        default: () => {
            return `border-design-disabled bg-transparent ` + common
        }
    })
}
