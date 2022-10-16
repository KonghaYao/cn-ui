import babel from '@rollup/plugin-babel';
import fse from 'fs-extra';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
const Package = fse.readJSONSync('./package.json');
const deps = [Package.dependencies, Package.devDependencies, Package.peerDependencies].flatMap(
    (i) => Object.keys(i)
);
const warning = [Package.devDependencies].flatMap((i) => Object.keys(i));

fse.emptyDirSync('./dist');
import fg from 'fast-glob';

const base = () => ({
    external: ['solid-js', 'solid-js/web', 'solid-js/store'],
    output: {
        format: 'esm',
    },
    plugins: [
        {
            name: 'clear-outside',
            resolveId(thisFile) {
                if (thisFile.startsWith('../')) {
                    return { external: true, id: thisFile };
                }
            },
        },
        {
            name: 'shake',
            resolveId(thisFile) {
                if (warning.some((i) => thisFile.startsWith(i)))
                    this.warn('使用了 devDependencies ' + thisFile);
                if (deps.some((i) => thisFile.startsWith(i))) return false;
            },
        },
        resolve({
            extensions: ['.tsx', '.ts', '.js'],
        }),
        postcss({
            extract: true,
            extensions: ['.less', '.css'],
        }),
        babel({ babelHelpers: 'bundled', extensions: ['.tsx', '.ts', '.js'] }),
    ],
});

export default fg.sync(['./src/components/*/index.{ts,tsx}']).map((i) => {
    const config = base();
    config.input = i;
    config.output.dir = 'dist/es/' + i.replace('./src/components/', '').split('/')[0];
    return config;
});
