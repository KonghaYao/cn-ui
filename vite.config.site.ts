import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

/**
 * Story Book 的打包页面
 */
export default defineConfig({
    base: './',
    plugins: [solidPlugin()],
    server: {
        port: 3000,
    },
    optimizeDeps: {
        include: ['lodash-es'],
    },
    build: {
        outDir: 'dist_site',
        target: 'es6',
        cssCodeSplit: true,
    },
});
