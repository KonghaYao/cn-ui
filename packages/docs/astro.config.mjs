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
        solidJs({
            solid: {
                generate: "ssr"
            }
        }),
        UnoCSS({
            injectReset: true
        })
    ],
    vite: {
        ssr: {
            noExternal: ['solid-icons']
        },
        plugins: [
        ]
    }
})
