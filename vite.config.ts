import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import wasm from 'vite-plugin-wasm'
import UnoCSS from 'unocss/vite'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
    plugins: [UnoCSS(), solid(), wasm(), topLevelAwait()],
    assetsInclude: ['**/*.mdx']
})
