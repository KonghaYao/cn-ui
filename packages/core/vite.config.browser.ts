import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import wasm from 'vite-plugin-wasm'
import path from 'path'
import multi from 'rollup-plugin-multi-input'
import {bundleStats} from 'rollup-plugin-bundle-stats'
import { analyzer } from "vite-bundle-analyzer";
export default defineConfig({
    plugins: [
        multi.default({
            relative: 'lib',
            transformOutputPath: (output, input) => {
                return `lib/${path.basename(path.dirname(output))}/${path.basename(output)}`
            }
        }),
        // unocss 文件是额外进行构建的
        // UnoCSS({
        //     mode: 'global'
        // }),
        solid(),
        wasm(),
        bundleStats(),
        // analyzer(),
    ],
    assetsInclude: ['**/*.mdx'],
    build: {
        target: 'esnext',
        outDir:"dist/browser",
        lib: {
            entry: './src/index.ts',
            formats: ['es'],
            fileName(format, entryName) {
                return entryName + '.' + format + '.js'
            }
        },
        rollupOptions: {
            input: ['src/*/index.ts', 'src/control/*/index.ts'],
        },
        sourcemap: true // 输出.map文件
    }
})
