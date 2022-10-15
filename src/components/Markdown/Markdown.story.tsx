import { Typography } from '@cn-ui/core';
import { createResource, Show } from 'solid-js';
import { Markdown } from './Markdown';
export const Controller = [];
const getText = (url: string) => fetch(url).then((res) => res.text());
export default () => {
    const [md] = createResource(async () => {
        const content = await getText('https://cdn.jsdelivr.net/gh/younghz/Markdown/README.md');
        const code = await getText('https://cdn.jsdelivr.net/npm/@cn-ui/use/src/index.ts');
        return content + '\n```ts\n' + code + '```';
    });
    return (
        <Show when={!md.loading}>
            <Typography>
                <Markdown>{md()}</Markdown>
            </Typography>
        </Show>
    );
};
