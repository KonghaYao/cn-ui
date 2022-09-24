import fs from 'fs';
const list = fs.readdirSync('./src/components/');
const file = list
    .filter((i) => {
        return !i.startsWith('_');
    })
    .map((i) => {
        return `export {${i}} from './components/${i}'`;
    })
    .join('\n');
console.log(file);

fs.writeFileSync('./src/index.ts', file);
