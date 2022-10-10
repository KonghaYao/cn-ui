import fs from 'fs';
const list = fs.readdirSync('./src/components/');
const file = list
    .filter((i) => {
        return !i.startsWith('_');
    })
    .map((i) => {
        return `export * from './components/${i}/index'`;
    })
    .join('\n');
console.log(file);

fs.writeFileSync(
    './src/index.ts',
    '// Automatically generator by scripts/createIndexFile.mjs;\n' +
        file +
        "\nexport * from './extraEntry'"
);
