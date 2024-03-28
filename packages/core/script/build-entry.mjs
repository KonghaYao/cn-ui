import { glob } from 'glob'
import path from 'path'
import fs from 'fs'

const getFiles = async (base = 'esm') => {
    const entry = await glob([`./dist/${base}/*/index.js`])
    const jsFile = entry
        .map((i) => {
            return `export * from './${path.relative('./dist/', i)}';`
        })
        .join('\n')
    const cssFile = `import "./${base}/style.css"\n`
    return { cssFile, jsFile }
}

// 生成 src/index.ts
const e = await glob([`./src/*/index.ts`])
const jsFile = e
    .map((i) => {
        return `export * from './${path.relative('./src/', i).replace('.ts', '')}';`
    })
    .join('\n')
fs.writeFileSync('./src/index.ts', jsFile)

// 生成 esm 包的 index.js
const esm = await getFiles('esm')
fs.writeFileSync('./dist/index.js', esm.cssFile + esm.jsFile)
fs.writeFileSync('./dist/preset.js', esm.cssFile + "import './cn-uno.css'\nexport * from './index.js'")

// 生成 ssr 包的 index.js
const ssr = await getFiles('ssr')
fs.writeFileSync('./dist/ssr.js', esm.cssFile + ssr.jsFile)
fs.writeFileSync('./dist/ssr.preset.js', ssr.cssFile + "import './cn-uno.css'\nexport * from './ssr.js'")

const entry = await glob([`./dist/esm/*/index.js`])
const typeContent = entry
    .map((i) => {
        return `export * from './${path.relative('./dist/', i).replace('.es.js', '.es')}';`
    })
    .join('\n')
fs.writeFileSync('./dist/index.d.ts', typeContent)
fs.writeFileSync('./dist/ssr.d.ts', typeContent)
