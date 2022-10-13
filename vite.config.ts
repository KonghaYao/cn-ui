import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import visualizer from 'rollup-plugin-visualizer';
import Package from './package.json';
const deps = [Package.dependencies, Package.devDependencies, Package.peerDependencies].flatMap(
    (i) => Object.keys(i)
);
const warning = [Package.devDependencies].flatMap((i) => Object.keys(i));

export default defineConfig(({ mode }) => {
    console.log(mode);
    return {
        plugins: [
            mode !== 'development' && {
                name: 'shake',
                enforce: 'pre',
                resolveId(thisFile) {
                    if (warning.some((i) => thisFile.startsWith(i)))
                        this.warn('使用了 devDependencies ' + thisFile);
                    if (deps.some((i) => thisFile.startsWith(i))) return false;
                },
            },
            solidPlugin(),
            mode === 'analyze' &&
                (visualizer({ open: true, filename: 'visualizer/stat.html' }) as any),
        ],
        server: {
            hmr: false,
            port: 3000,
        },
        resolve: {
            alias: {
                '@cn-ui/core/index.css': '/src/style/index.css',
                '@cn-ui/core': '/src/index.ts',
            },
        },
        optimizeDeps: {
            include: [
                'lodash-es',
                'copy-to-clipboard',
                'viewerjs',
                '@vant/area-data',
                'mitt',
                'zxcvbn',
            ],
            exclude: ['@cn-ui/core'],
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
            rollupOptions: {
                external: ['solid-js', 'solid-js/web', 'solid-js/store'],
            },
        },
    };
});
