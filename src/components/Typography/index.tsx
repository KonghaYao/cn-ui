import { Component, createMemo, JSXElement, ParentComponent } from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import cs from '../_util/classNames';
import { TypographyProps } from './interface';
import './style/index.less';

const OriginTypography: Component<TypographyProps> = (props) => {
    const { rtl } = GlobalConfigStore;
    const className = createMemo(() => {
        return cs(
            'cn-typography',
            {
                [`rtl`]: rtl,
            },
            props.className
        );
    });
    return (
        <div class="cn-typography-wrapper">
            <article
                class={className()}
                style={{
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
};
/**
 * @zh 兼容中文排版的文本专用容器，自动响应式组件。在内部使用的 HTML 标签样式将不同
 *
 */
export const Typography = Object.assign(OriginTypography, {}) as typeof OriginTypography & {};
