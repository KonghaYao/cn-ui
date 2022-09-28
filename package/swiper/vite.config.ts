import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [
        solidPlugin({
            extensions: ['.js', '.ts', '.tsx', '.jsx'],
        }),
    ],

    optimizeDeps: {
        include: ['lodash-es', 'solid-use', 'copy-to-clipboard'],
    },

    build: {
        assetsInlineLimit: 8 * 1024,
        target: 'es6',

        cssCodeSplit: true,
        lib: {
            entry: './src/index.ts',
            formats: ['es'],
        },
        sourcemap: true,
        rollupOptions: {
            external: ['solid-js', 'solid-js/web', 'solid-js/store'],
        },
    },
});
