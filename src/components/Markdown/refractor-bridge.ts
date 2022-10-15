import { refractor } from 'refractor';
import { visit } from 'unist-util-visit';
const languages = refractor.listLanguages();
import { Plugin } from 'unified';
/**
 * Plugin to enable, disable, and ignore messages.
 *
 * @type {}
 */
export const RefractorBridge: Plugin = ({ include, exclude } = {}) => {
    return (tree, file) => {
        visit(tree, 'code', visitor);

        function visitor(node) {
            const { lang } = node;

            if (
                !lang ||
                (include && !~include.indexOf(lang)) ||
                (exclude && ~exclude.indexOf(lang))
            ) {
                return;
            }

            let { data } = node;

            if (!data) {
                node.data = data = {};
            }

            try {
                data.hChildren = refractor.highlight(node.value, lang);
                data.hChildren.forEach((node) => {
                    if (node.properties && node.properties.className.includes('keyword')) {
                        if (node.children[1]) {
                            node.properties.componentname = node.children[1].value.trim();
                        }
                        if (node.children[2]) {
                            node.properties.url = node.children[2].children[0].value.replace(
                                /"/g,
                                ''
                            );
                        }
                    }
                });
            } catch (e) {
                if (!languages.includes(lang)) {
                    console.warn('Prism does not support this language: ', lang);
                } else {
                    console.warn('Prism failed to highlight: ', e);
                }
            }

            data.hProperties = data.hProperties || {};
            data.hProperties.className = [
                ...(data.hProperties.className || []),
                `language-${lang}`,
            ];
        }
    };
};
