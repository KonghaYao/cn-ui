import { atom, Atom, atomization, extendsEvent, OriginComponent } from '@cn-ui/use';
import { createEffect, createResource, JSX } from 'solid-js';
import { unified } from 'unified';
export interface MarkdownProps extends JSX.HTMLAttributes<HTMLDivElement> {
    code?: string | Atom<string>;
    children?: string;
    remarkPlugins?: any[];
    rehypePlugins?: any[];
}

import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
export const Markdown = OriginComponent<MarkdownProps>((props) => {
    const code = atomization(props.code ?? props.children);
    const text = atom('');
    createEffect(async () => {
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
        const string = await source.process(code()).then((res) => res.toString());
        text(string);
    });

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
