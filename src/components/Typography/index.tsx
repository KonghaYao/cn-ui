import { Component, createMemo, JSXElement, ParentComponent } from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import cs from '../_util/classNames';
import './style/index.less';
/**
 * @zh 使用原生的 HTML 标签进行使用比较好，由 CSS 完成对应的操作，这个组件将会维持子代的样式为流式
 *
 */
const OriginTypography: Component<{
    className?: string | string[];
    children?: JSXElement;
}> = (props) => {
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
            <article class={className()}>{props.children}</article>
        </div>
    );
};

export const Typography = Object.assign(OriginTypography, {}) as typeof OriginTypography & {
    Title: typeof Title;
    Text: typeof Text;
    Paragraph: typeof Paragraph;
};
