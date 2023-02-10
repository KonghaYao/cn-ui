import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import visualizer from 'rollup-plugin-visualizer';
import Package from './package.json';
const deps = [Package.devDependencies].flatMap((i) => Object.keys(i));
const warning = [Package.devDependencies].flatMap((i) => Object.keys(i));

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            // {
            //     name: 'shake',
            //     enforce: 'pre',
            //     resolveId(thisFile) {
            //         if (warning.some((i) => thisFile.startsWith(i)))
            //             this.warn('使用了 devDependencies ' + thisFile);
            //         if (deps.some((i) => thisFile.startsWith(i))) return false;
            //     },
            // },
            solid(),
            mode === 'analyze' &&
                (visualizer({ open: true, filename: 'visualizer/stat.html' }) as any),
        ],
        server: {
            port: 3000,
        },
        build: {
            assetsInlineLimit: 0,
            target: 'es6',
            lib: {
                entry: './src/index.ts',
                name: 'index',
                fileName: 'index',
                formats: ['es'],
            },
            sourcemap: true,
        },
        test: {
            deps: {
                registerNodeLoader: true,
                inline: [/solid-js/],
            },
            environment: 'jsdom',
            globals: true,
            setupFiles: [
                'node_modules/@testing-library/jest-dom/extend-expect',
                './setupVitest.js',
            ],
            transformMode: { web: [/\.[jt]sx?$/] },
        },
    };
});
