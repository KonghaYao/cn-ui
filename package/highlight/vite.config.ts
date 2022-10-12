import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
export default defineConfig(({ mode }) => {
    return {
        plugins: [solidPlugin()],
        server: {
            port: 3000,
        },
        resolve: {},
        optimizeDeps: {
            include: ['lodash-es', 'copy-to-clipboard', 'viewerjs', '@vant/area-data', 'mitt'],
        },

        build: {
            assetsInlineLimit: 1024,
            target: 'es6',

            cssCodeSplit: true,
            minify: true,
            lib: {
                entry: './src/index.ts',
                name: 'index',
                fileName: 'index',
                formats: ['es'],
            },
            sourcemap: false,
            rollupOptions: {
                external: [
                    'solid-js',
                    'solid-js/web',
                    'solid-js/store',
                    '@cn-ui/use',
                    'refractor',
                    'hast-util-to-html',
                ],
            },
        },
    };
});
