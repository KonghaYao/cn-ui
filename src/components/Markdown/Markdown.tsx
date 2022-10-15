import { OriginComponent } from '@cn-ui/use';
import { createResource, JSX, JSXElement } from 'solid-js';
import { remark } from 'remark';
export interface MarkdownProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: string;
    remarkPlugins?: [];
}
import remarkHtml from 'remark-html';
export const Markdown = OriginComponent<MarkdownProps>((props) => {
    const [text] = createResource(async () => {
        let source = remark();
        if (props.remarkPlugins) {
            for (const i of props.remarkPlugins) {
                source = source.use(i);
            }
        }
        return source
            .use(remarkHtml)
            .process(props.children)
            .then((res) => res.toString());
    });
    return <div innerHTML={text()}></div>;
});
