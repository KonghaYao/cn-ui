import { extendsEvent, OriginComponent } from '@cn-ui/reactive'
import './style/index.css'
import { JSXElement } from 'solid-js'
export interface TypographyProps {
    children: JSXElement
}

/**
 * @zh 兼容中文排版的文本专用容器，自动响应式组件。在内部使用的标签具有排版样式。
 *
 */
export const Typography = OriginComponent<TypographyProps>((props) => {
    return (
        <div class="box-border flex w-full flex-col items-center overflow-auto whitespace-normal">
            {/*  外扩一层保证内层可以响应式居中 */}
            <article
                ref={props.ref}
                class={props.class('cn-typography')}
                style={{
                    ...props.style
                }}
                {...extendsEvent(props)}
            >
                {props.children}
            </article>
        </div>
    )
})
