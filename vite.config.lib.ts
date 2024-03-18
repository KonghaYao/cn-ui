import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import wasm from 'vite-plugin-wasm'
import UnoCSS from 'unocss/vite'
import p from './package.json'
import path from 'path'
import multi from 'rollup-plugin-multi-input'

const needBundle: string[] = []
const AllDeps = [p.dependencies, p.devDependencies].flatMap((i) => Object.keys(i)).filter((i) => !needBundle.includes(i))
export default defineConfig({
    plugins: [
        {
            name: 'external',
            resolveId: {
                order: 'pre',
                handler(source, importer, options) {
                    if (AllDeps.some((i) => source.startsWith(i))) {
                        return { id: source, external: true }
                    }
                    if (source.includes('node_modules')) {
                        // console.log(source);
                    }
                }
            }
        },
        UnoCSS(),
        solid(),
        wasm(),
        multi.default({
            relative: 'lib',
            transformOutputPath: (output, input) => {
                return `lib/${path.basename(path.dirname(output))}/${path.basename(output)}`
            }
        })
    ],
    assetsInclude: ['**/*.mdx'],
    build: {
        target: 'esnext',
        lib: {
            entry: './src/index.ts',
            formats: ['es'],
            fileName(format, entryName) {
                return entryName + '.' + format + '.js'
            }
        },
        rollupOptions: {
            input: ['src/*/index.ts', 'src/control/*/index.ts']
        },
        sourcemap: true // 输出.map文件
    }
})
