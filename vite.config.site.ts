import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

/**
 * Story 的打包页面
 */
export default defineConfig({
    base: './',
    plugins: [solidPlugin()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@cn-ui/core/': '/dist/es/',
            '@cn-ui/core': '/dist/es/index.js',
        },
    },
    optimizeDeps: {
        exclude: ['@cn-ui/core'],
    },
    build: {
        rollupOptions: {
            input: {
                index: 'index.html',
                book: 'book.html',
            },
        },
    },
});
