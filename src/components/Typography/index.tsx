import { Component, createMemo, JSXElement, ParentComponent } from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import { OriginComponent } from '../_util/OriginComponent';
import { TypographyProps } from './interface';
import './style/index.less';
/**
 * @zh 兼容中文排版的文本专用容器，自动响应式组件。在内部使用的 HTML 标签样式将不同
 *
 */
export const Typography = OriginComponent<TypographyProps>((props) => {
    const { rtl } = GlobalConfigStore;
    return (
        <div class="cn-typography-wrapper">
            <article
                class={props.class(
                    'cn-typography',
                    {
                        [`rtl`]: rtl,
                    },
                    props.className
                )}
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
