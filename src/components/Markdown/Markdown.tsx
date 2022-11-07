import { extendsEvent, OriginComponent } from '@cn-ui/use';
import { createEffect, createResource, JSX } from 'solid-js';
import { unified } from 'unified';
export interface MarkdownProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: string;
    remarkPlugins?: any[];
    rehypePlugins?: any[];
}

import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { createIgnoreFirst } from '@cn-ui/use/src';
export const Markdown = OriginComponent<MarkdownProps>((props) => {
    const [text, { refetch: rebuild }] = createResource(async () => {
        let source = unified();
        const plugins = [
            remarkParse,
            ...(props.remarkPlugins || []),
            remarkRehype,
            ...(props.rehypePlugins || []),
            rehypeStringify,
        ];

        for (const i of plugins) {
            source = source.use(i);
        }
        return source.process(props.children).then((res) => res.toString());
    });
    createIgnoreFirst(() => {
        // 解决数据不继承问题
        rebuild();
    }, [() => props.children]);
    return (
        <div
            class={props.class()}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
            innerHTML={text()}
        ></div>
    );
});
