import { glob } from 'glob'
const files = await glob('./dist/ssr/**/*.@(js|jsx)')

import fs from 'fs'
files.forEach(element => {
    const file = fs.readFileSync(element, 'utf-8')
    const css = /import '\..*?\.css';/g
    let newFile = file
    if (css.test(file)) {
        newFile = file.replace(css, '')
        console.log(element)
    }

    if (newFile.includes('@ark-ui/solid')) {
        // newFile = newFile.replace('@ark-ui/solid', '@ark-ui/solid/source/index.jsx')
    }
    if (newFile !== file)
        fs.writeFileSync(element, newFile)

});