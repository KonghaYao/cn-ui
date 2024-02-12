import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import wasm from 'vite-plugin-wasm'
import UnoCSS from 'unocss/vite'
export default defineConfig({
    plugins: [UnoCSS(), solid(), wasm()],
    assetsInclude: ["**/*.mdx"],
});