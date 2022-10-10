import { Component, createMemo, JSXElement, ParentComponent } from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import { OriginComponent } from '@cn-ui/use';
import { TypographyProps } from './interface';
import './style/index.less';
/**
 * @zh 兼容中文排版的文本专用容器，自动响应式组件。在内部使用的 HTML 标签样式将不同
 *
 */
export const Typography = OriginComponent<TypographyProps>((props) => {
    return (
        <div class="cn-typography-wrapper">
            <article
                ref={props.ref}
                class={props.class('cn-typography')}
                classList={{}}
                style={{
                    ...props.style,
                    'max-width':
                        typeof props.maxWidth === 'number'
                            ? props.maxWidth + 'px'
                            : `var(--container-${props.maxWidth || 'md'})`,
                }}
            >
                {props.children}
            </article>
        </div>
    );
});

export { useFont } from './useFont';
export { CopyText, EllipsisText } from './EditText';
