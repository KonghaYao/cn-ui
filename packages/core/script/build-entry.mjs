import { glob } from 'glob'
import path from 'path'
import fs from 'fs'
const entry = await glob(['./dist/esm/*/index.js'])
const jsFile = entry
    .map((i) => {
        return `export * from './${path.relative('./dist/', i)}';`
    })
    .join('\n')
const cssFile = 'import "./esm/style.css"\n'
fs.writeFileSync('./dist/index.js', cssFile + jsFile)
fs.writeFileSync('./dist/preset.js', cssFile + "import './cn-uno.css'" + jsFile)

fs.writeFileSync('./dist/index.d.ts', entry
    .map((i) => {
        return `export * from './${path.relative('./dist/', i).replace('.es.js', '.es')}';`
    })
    .join('\n'))
