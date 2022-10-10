import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import multi from 'rollup-plugin-multi-input';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import fse from 'fs-extra';
fse.emptyDirSync('./dist/');
const external = [
    'solid-js',
    'solid-js/web',
    'solid-js/store',
    '@vant/area-data',
    'tippy.js',
    'zxcvbn',
    '@cn-ui/command-palette',
    '@cn-ui/swiper',
    'viewerjs',
];
export default {
    input: ['src/index.ts', 'src/components/*/index.{ts,tsx}', 'src/style/index.ts'],
    output: { dir: 'dist' },
    plugins: [
        multi({ relative: 'src/' }),
        // alias({
        //     entries: [
        //         { find: 'viewerjs/dist/viewer.css', replacement: 'viewerjs/dist/viewer.css' },
        //         { find: 'viewerjs', replacement: 'viewerjs/dist/viewer.esm.js' },
        //     ],
        // }),
        nodeResolve({
            extensions: ['.ts', '.tsx', '.js'],
        }),
        commonjs(),
        babel({
            presets: ['babel-preset-solid', '@babel/preset-typescript'],
            extensions: ['.ts', '.tsx', '.js'],
        }),

        postcss({
            extract: true,
            extensions: ['.css', '.less'],
            use: {
                less: {},
            },
        }),
        {
            resolveId(id) {
                if (external.includes(id)) return false;
            },
        },
        visualizer({ open: true, filename: 'visualizer/stat.html' }),
    ],
};
