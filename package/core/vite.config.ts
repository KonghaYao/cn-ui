import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
// import visualizer from 'rollup-plugin-visualizer';
import tailwindcss from 'tailwindcss';
import packageJSON from './package.json';
import fs from 'fs';
const list = fs.readdirSync('./src/components/');
const entries = Object.fromEntries(
    list
        .filter((i) => !i.startsWith('_'))
        .map((i) => {
            return [i, `./src/components/${i}/index.ts`];
        })
);
const ignoreDeps = [
    ...Object.keys({
        ...packageJSON.dependencies,
        ...packageJSON.devDependencies,
        ...packageJSON.peerDependencies,
    }),
];
export default defineConfig((config) => {
    const { mode } = config;
    console.log(mode);
    return {
        plugins: [
            solidPlugin(),
            mode !== 'development' && {
                enforce: 'pre',
                resolveId(thisFile, importer) {
                    if (ignoreDeps.some((i) => thisFile.startsWith(i))) {
                        return { id: thisFile, external: true };
                    }
                },
            },
            // mode === 'analyze' &&
            // (visualizer({ open: true, filename: 'visualizer/stat.html' }) as any),
        ],
        server: {
            port: 3000,
        },

        optimizeDeps: {},
        build: {
            lib: {
                entry: {
                    index: './src/index.ts',
                    // ...entries,
                },
                formats: ['es'],
            },
        },

        css: {
            postcss: {
                purge: ['./{src}/**/*.{ts,tsx}'],
                // 只有生产阶段才使用 tailwindcss 进行打包
                plugins: mode !== 'production' ? [tailwindcss] : undefined,
            },
        },
    };
});
