import { atomization, extendsEvent, OriginComponent } from '@cn-ui/use';
import { createEffect, createResource, JSX } from 'solid-js';
import { unified } from 'unified';
export interface MarkdownProps extends JSX.HTMLAttributes<HTMLDivElement> {
    code?: string;
    children?: string;
    remarkPlugins?: any[];
    rehypePlugins?: any[];
}

import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { createIgnoreFirst } from '@cn-ui/use/src';
export const Markdown = OriginComponent<MarkdownProps>((props) => {
    const code = atomization(props.code??props.children)
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
        return source.process(code()).then((res) => res.toString());
    });
    createIgnoreFirst(() => {
        // 解决数据不继承问题
        rebuild();
    }, [code]);
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
