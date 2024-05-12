import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
    site: "https://example.com",
    integrations: [
        mdx(),
        sitemap(),
        solidJs(),
        UnoCSS({
            injectReset: true,
        }),
    ],
    markdown: {
        shikiConfig: {
            // Alternatively, provide multiple themes
            // https://shiki.style/guide/dual-themes
            themes: {
                light: "vitesse-light",
                dark: "vitesse-dark",
            },
            // Add custom languages
            // Note: Shiki has countless langs built-in, including .astro!
            // https://shiki.style/languages
            langs: [],
            // Enable word wrap to prevent horizontal scrolling
            wrap: true,
        },
    },
    vite: {
        ssr: {
            noExternal: ["solid-icons", "@popperjs/core"],
            resolve: {
                externalConditions: ["solid", "module", "import"],
            },
        },
        plugins: [
            {
                name: "Add_example",
                enforce: "pre",
                transform(code, id) {
                    if (id.includes("example")) {
                        console.log(id);
                        return `${code}\n\nexport const SourceCode = ${JSON.stringify(code)};`;
                    }
                },
            },
        ],
    },
});
