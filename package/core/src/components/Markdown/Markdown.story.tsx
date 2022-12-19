import { Typography } from '@cn-ui/core';
import { Show } from 'solid-js';
import { Markdown } from './Markdown';

export const Controller = [
    {
        test: true,
        type: 'switch',
        prop: 'githubStyleCSS',
        default: false,
        refresh: true,
    },
];
const getText = (url: string) => fetch(url).then((res) => res.text());
import rehypeHighlight from 'rehype-highlight';
import { useCodeStyle } from '@cn-ui/highlight';
import { resource } from '@cn-ui/use';

export default (props) => {
    const { link } = useCodeStyle('github');
    const md = resource(async () => {
        const content = await getText('https://cdn.jsdelivr.net/npm/markdown-it/README.md');
        const code = await getText('https://cdn.jsdelivr.net/npm/@cn-ui/use/src/index.ts');
        return content + '\n```ts\n' + code + '```';
    });

    if (props.githubStyleCSS) {
        return (
            <Show when={md.isReady()}>
                <Markdown
                    class="markdown-body p-4"
                    code={md()}
                    rehypePlugins={[rehypeHighlight]}
                ></Markdown>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown-light.css"
                ></link>
                {link}
            </Show>
        );
    }
    return (
        <Show when={md.isReady()}>
            <Typography>
                <Markdown rehypePlugins={[rehypeHighlight]}>{md()}</Markdown>
            </Typography>
            {link}
        </Show>
    );
};
