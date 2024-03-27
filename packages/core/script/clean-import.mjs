import { glob } from 'glob'
const files = await glob('./dist/ssr/**/*.@(js|jsx)')

import fs from 'fs'
files.forEach(element => {
    const file = fs.readFileSync(element, 'utf-8')
    const css = /import '\..*?\.css';/g
    if (css.test(file)) {
        fs.writeFileSync(element, file.replace(css, ''))
        console.log(element)
    }
});