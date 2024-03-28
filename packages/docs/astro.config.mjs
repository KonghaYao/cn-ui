import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import solidJs from '@astrojs/solid-js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const solidjsDocgen = require('@joshwooding/vite-plugin-react-docgen-typescript')
// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    integrations: [
        mdx(),
        sitemap(),
        solidJs(),
        UnoCSS({
            injectReset: true
        })
    ],
    markdown: {
        shikiConfig: {
            // Alternatively, provide multiple themes
            // https://shiki.style/guide/dual-themes
            themes: {
                light: 'vitesse-light',
                dark: 'vitesse-dark'
            },
            // Add custom languages
            // Note: Shiki has countless langs built-in, including .astro!
            // https://shiki.style/languages
            langs: [],
            // Enable word wrap to prevent horizontal scrolling
            wrap: true
        }
    },
    vite: {
        // important for client:load
        ssr: {
            noExternal: ['solid-icons'],
            resolve: {
                externalConditions: ['solid', 'module', 'import']
            }
        },
        plugins: [
            {
                enforce: 'pre',
                ...solidjsDocgen({
                    shouldExtractLiteralValuesFromEnum: true,
                    shouldRemoveUndefinedFromOptional: true,
                    shouldIncludePropTagMap: true,
                    shouldIncludeExpression: true,
                    propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
                    savePropValueAsString: true,
                    include: ['**/*.tsx', '**/*.ts']
                })
            }
        ]
    }
})
