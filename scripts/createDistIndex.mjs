import fs from 'fs';
const list = fs.readdirSync('./dist/es/');
const file = list
    .filter((i) => {
        return !i.includes('.');
    })
    .map((i) => {
        return `export * from './${i}/index'`;
    })
    .join('\n');
console.log(file);

fs.writeFileSync(
    './dist/es/index.js',
    '// Automatically generator by scripts/createIndexFile.mjs;\n' + file
);
