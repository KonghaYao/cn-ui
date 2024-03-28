import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    integrations: [
        mdx(),
        sitemap(),
        solidJs(),
        UnoCSS({
            injectReset: true
        }),
    ],
    markdown: {
        shikiConfig: {
            // Alternatively, provide multiple themes
            // https://shiki.style/guide/dual-themes
            themes: {
                light: 'github-light',
                dark: 'github-dark',
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
        // important for client:load
        ssr: {
            noExternal: ['solid-icons'],
            resolve: {
                externalConditions: ['solid', 'module']
            }
        }
    }
})
