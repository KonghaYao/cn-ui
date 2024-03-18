import { glob } from 'glob'
import path from 'path'
import fs from 'fs'
const entry = await glob(['dist/lib/*/index.es.js'])
const file = entry
    .map((i) => {
        return `export * from './${path.relative('./dist/', i)}';`
    })
    .join('\n')
fs.writeFileSync('./dist/index.js', file)
