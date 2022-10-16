import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import vitePluginImp from 'vite-plugin-imp';
import allowList from './dist/es/style-list.json';
/**
 * Story 的打包页面
 */
export default defineConfig(({ mode }) => {
    return {
        base: './',
        plugins: [
            mode !== 'full' &&
                vitePluginImp({
                    ignoreStylePathNotFound: false,
                    libList: [
                        {
                            libName: '@cn-ui/core',
                            camel2DashComponentName: false,
                            style(name) {
                                if (allowList.includes(name)) {
                                    console.log(name);
                                    return `@cn-ui/core/${name}/index.css`;
                                } else {
                                    return false;
                                }
                            },
                        },
                    ],
                }),
            solidPlugin({}),
        ],
        server: {
            port: 3000,
        },
        resolve: {
            alias: {
                ...(mode === 'full'
                    ? {
                          // 测试用途，使用本地的打包文件进行使用
                          '@cn-ui/core/index.css': '/dist/full/style.css',
                          '@cn-ui/core': '/dist/full/index.mjs',
                      }
                    : {
                          // 测试用途，使用本地的打包文件进行使用
                          '@cn-ui/core/': '/dist/es/',
                          '@cn-ui/core': '/dist/es/index.js',
                      }),
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
    };
});
