import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import multi from 'rollup-plugin-multi-input';
import fse from 'fs-extra';
fse.emptyDirSync('./dist/');
export default {
    input: ['src/index.ts', 'src/modules/*.ts'],
    output: { dir: 'dist' },
    plugins: [
        multi({ relative: 'src/' }),
        nodeResolve({
            browser: true,
        }),
        babel({
            presets: ['@babel/preset-env', 'babel-preset-solid', '@babel/preset-typescript'],
            babelHelpers: 'bundled',
        }),
        postcss({
            extract: true,
            // Or with custom file name
            // extract: path.resolve('dist/my-custom-file-name.css'),
        }),
        {
            transform(code, id) {
                if (id.includes('index.ts')) {
                    return code.replace(/\/\/ Ignore[\s\S]*\/\/ Ignore/, '');
                }
            },
        },
    ],
};
