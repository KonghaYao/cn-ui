import { Typography } from '@cn-ui/core';
import { createResource, Show } from 'solid-js';
import { Markdown } from './Markdown';

export const Controller = [];
const getText = (url: string) => fetch(url).then((res) => res.text());
import rehypeHighlight from 'rehype-highlight';
import { useCodeStyle } from '../Code/useCodeStyle';

export default () => {
    const { link } = useCodeStyle('github');
    const [md] = createResource(async () => {
        const content = await getText('https://cdn.jsdelivr.net/gh/younghz/Markdown/README.md');
        const code = await getText('https://cdn.jsdelivr.net/npm/@cn-ui/use/src/index.ts');
        return content + '\n```ts\n' + code + '```';
    });
    return (
        <Show when={!md.loading}>
            <Typography>
                <Markdown rehypePlugins={[rehypeHighlight]}>{md()}</Markdown>
            </Typography>
            {link}
        </Show>
    );
};
