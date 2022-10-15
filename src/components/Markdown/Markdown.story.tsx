import { Typography } from '@cn-ui/core';
import { createResource, Show } from 'solid-js';
import { Markdown } from './Markdown';
export const Controller = [];
export default () => {
    const [md] = createResource(() =>
        fetch('https://cdn.jsdelivr.net/gh/younghz/Markdown/README.md').then((res) => res.text())
    );
    return (
        <Show when={!md.loading}>
            <Typography>
                <Markdown>{md()}</Markdown>
            </Typography>
        </Show>
    );
};
