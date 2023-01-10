import { gemoji } from 'gemoji';
import { visit } from 'unist-util-visit';

const find = /:(\+1|[-\w\s]+):/g;
export function emojiPlugin(props: { emojiMap?: Record<string, string> }) {
    return (tree) => {
        visit(tree, 'text', (node) => {
            const value = node.value;
            const slices: string[] = [];
            find.lastIndex = 0;
            let match = find.exec(value);
            let start = 0;

            while (match) {
                const emojiText: string = match[1];
                const position = match.index;
                const emoji = gemoji.find((i) => i.names.includes(emojiText)) ?? {
                    emoji: props?.emojiMap[emojiText],
                };

                if (emoji.emoji) {
                    if (start !== position) {
                        slices.push(value.slice(start, position));
                    }

                    slices.push(emoji.emoji);
                    start = position + match[0].length;
                } else {
                    find.lastIndex = position + 1;
                }

                match = find.exec(value);
            }

            if (slices.length > 0) {
                slices.push(value.slice(start));
                node.value = slices.join('');
            }
        });
    };
}
