import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import visualizer from 'rollup-plugin-visualizer';
import tailwindcss from 'tailwindcss';
import packageJSON from './package.json';
const ignoreDeps = [
    '@fontsource/material-icons-rounded',
    ...Object.keys({
        ...packageJSON.dependencies,
        ...packageJSON.devDependencies,
        ...packageJSON.peerDependencies,
    }),
];
export default defineConfig(({ mode }) => {
    console.log(mode);
    return {
        plugins: [
            solidPlugin(),
            mode === 'production' && {
                enforce: 'pre',
                resolveId(thisFile, importer) {
                    if (ignoreDeps.some((i) => thisFile.startsWith(i))) {
                        return { id: thisFile, external: true };
                    }
                },
            },
            mode === 'analyze' &&
                (visualizer({ open: true, filename: 'visualizer/stat.html' }) as any),
        ],
        server: {
            port: 3000,
        },
        resolve: {
            alias: {
                '@cn-ui/core/': '/src/',
                // '@cn-ui/sortable': '/package/sortable/src/index.ts',
            },
        },
        optimizeDeps: {},
        build: {
            lib: {
                entry: './src/index.ts',
                formats: ['es'],
                fileName: 'index',
            },
        },
        css: {
            postcss: {
                purge: ['./{src}/**/*.{ts,tsx}'],
                plugins: mode !== 'production' && [tailwindcss],
            },
        },
    };
});
