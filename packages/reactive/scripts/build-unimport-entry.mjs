import * as A from '../dist/server.js'
const excludes = ['default', '__esModule', '__namedExportsOrder']
const exportNames = Object.keys(A).filter(i => !excludes.includes(i))

console.log(exportNames);
import fs from 'fs'
fs.writeFileSync('./dist/unimport-entry.mjs', 'export default ' + JSON.stringify({ '@cn-ui/reactive': exportNames }))
