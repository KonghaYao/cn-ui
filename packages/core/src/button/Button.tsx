import { JSXSlot, OriginComponent, OriginComponentInputType, ensureFunctionResult, extendsEvent, useMapper } from '@cn-ui/reactive'
import { Match, Switch } from 'solid-js'
import { ButtonStore } from './ButtonStore'
export interface ButtonProps {
    /**
     * 按钮类型
     */
    type?: 'primary' | 'dashed' | 'link' | 'default' | 'text'
    /**
     * 按钮的HTML类型
     */
    htmlType?: HTMLButtonElement['type']
    /**
     * 按钮的图标
     */
    icon?: JSXSlot
    /**
     * 按钮的形状
     */
    shape?: 'default' | 'circle' | 'round'
    /**
     * 按钮是否禁用
     */
    disabled?: boolean
    /**
     * 按钮是否加载中
     */
    loading?: boolean
    /**
     * 按钮是否为透明按钮
     */
    ghost?: boolean
    /**
     * 按钮是否为危险按钮
     */
    danger?: boolean
    /**
     * 按钮是否为块级按钮
     */
    block?: boolean
    /**
     * 按钮是否为圆形按钮
     */
    circle?: boolean
}
export const Button = OriginComponent<ButtonProps, HTMLButtonElement>((props) => {
    const typeClass = createTypeClass(props)
    const disabledClass = createDisabledClass(props)

    return (
        <button
            type={props.htmlType}
            class={props.class(
                'cn-button transition-colors ',
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
                <Match when={props.loading}>
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
            return `${danger} text-design-text-light `
        },
        dashed() {
            return this.default() + ' border-dashed'
        },
        link() {
            const danger = props.danger ? 'text-error-500' : 'text-primary-500'
            return this.default() + ` border-none ${danger}`
        },
        text() {
            return 'hover:bg-design-ground'
        },
        default: () => {
            const danger = props.danger ? 'hover:border-error-400 hover:text-error-400' : 'hover:border-primary-400 hover:text-primary-400'
            return `border-design-border border ${danger} bg-transparent`
        }
    })
}
function createDisabledClass(props: OriginComponentInputType<ButtonProps, HTMLButtonElement, string>) {
    const common = 'opacity-50 cursor-not-allowed border-design-disabled'
    return useMapper(() => props.type ?? 'default', {
        primary() {
            return common + ' bg-design-disabled'
        },
        dashed() {
            return this.default() + ' border-dashed'
        },
        link() {
            const danger = props.danger ? 'text-error-500' : 'text-primary-500'
            return this.default() + ` border-none ${danger}`
        },
        text() {
            return this.link()
        },
        default: () => {
            return ` bg-transparent ` + common
        }
    })
}
