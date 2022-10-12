import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import multi from 'rollup-plugin-multi-input';
import fse from 'fs-extra';
fse.emptyDirSync('./dist/');
const external = ['solid-js', 'solid-js/web', 'solid-js/store'];
export default {
    input: ['src/index.ts'],
    output: { dir: 'dist' },
    plugins: [
        multi({ relative: 'src/' }),
        nodeResolve({
            browser: true,
            extensions: ['.js', '.ts', '.tsx'],
        }),
        babel({
            presets: ['babel-preset-solid', '@babel/preset-typescript'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        postcss({
            extract: true,
            // Or with custom file name
            // extract: path.resolve('dist/my-custom-file-name.css'),
        }),
        {
            resolveId(id) {
                if (external.includes(id)) return false;
            },
            transform(code, id) {
                if (id.includes('index.ts')) {
                    return code.replace(/\/\/ Ignore[\s\S]*\/\/ Ignore/, '');
                }
            },
        },
    ],
};
