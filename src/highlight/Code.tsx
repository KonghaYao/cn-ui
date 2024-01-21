import { createLowlight, common } from 'lowlight'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { extendsEvent, OriginComponent, reflect } from '@cn-ui/reactive'
import { JSX } from 'solid-js'
import { jsx, jsxs, Fragment } from 'solid-js/h/jsx-runtime'
import { Portal } from 'solid-js/web'
import { AllowedCodeStyleNames, useCodeStyle } from '.'

const lowlight = createLowlight(common)

export const Code = OriginComponent<
    {
        /** 代码作为 字符串写入 */
        code: string
        lang?: string
        codeStyle?: AllowedCodeStyleNames
    },
    HTMLPreElement
>((props) => {
    const codes = reflect(() => toJsxRuntime(lowlight.highlight(props.lang || 'js', props.code), { Fragment, jsx, jsxs } as any) as any as JSX.Element)
    const { link } = useCodeStyle(reflect(() => props.codeStyle || 'a11y-dark'))
    return (
        <pre class={props.class('hljs language-' + props.lang)} style={props.style()} ref={props.ref} {...extendsEvent(props)}>
            <code class="whitespace-pre-wrap">{codes()}</code>
            <Portal mount={document.body}>{link}</Portal>
        </pre>
    )
})
