import multi from '@rollup/plugin-multi-entry';

export default {
    input: ['src/component.ts', 'src/modules/*.ts'],
    plugins: [multi(), babel({ babelHelpers: 'bundled' })],
};
