import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import type { Preview } from "storybook-solidjs";
import { extractArgTypes } from "storybook-solidjs-docgen/src/docs/extractArgTypes";
import "../packages/core/src/css/dark.css";
import "../packages/core/src/css/scrollbar.css";
import { autoChangeTheme } from "../packages/core/src/utils/darkMode";
import "./index.css";
autoChangeTheme();
const preview: Preview = {
    parameters: {
        controls: {
            expanded: true,
        },
        docs: {
            toc: {
                headingSelector: "h1, h2, h3",
            },
            extractArgTypes(...args) {
                // @ts-ignore
                const res = extractArgTypes(...args);
                return res;
            },
        },
    },
};

export default preview;
