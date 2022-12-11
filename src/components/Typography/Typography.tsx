import { extendsEvent, OriginComponent } from '@cn-ui/use';
import { TypographyProps } from './interface';
import './style/index.css';
/**
 * @zh 兼容中文排版的文本专用容器，自动响应式组件。在内部使用的标签具有排版样式。
 *
 */
export const Typography = OriginComponent<TypographyProps>((props) => {
    return (
        <div class="cn-typography-wrapper">
            {/*  外扩一层保证内层可以响应式居中 */}
            <article
                ref={props.ref}
                class={props.class('cn-typography max-w-2xl md:max-w-2xl')}
                style={{
                    ...props.style,
                }}
                {...extendsEvent(props)}
            >
                {props.children}
            </article>
        </div>
    );
});

export { useFont } from './useFont';
export { CopyText, EllipsisText } from './EditText';
