import { globby } from 'globby';
const data = await globby('src/**/*.story.tsx');

import fs from 'fs';
const total = await Promise.all(
    data.map(async (i) => {
        return {
            path: i,
            code: await fs.promises.readFile('./' + i, 'utf-8'),
        };
    })
);
fs.writeFileSync('./story/story.index.json', JSON.stringify(total));
