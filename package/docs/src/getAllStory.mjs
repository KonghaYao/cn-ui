import fs from 'fs'
const list = fs.readdirSync('./src/story/')
const all  = list.filter(i=>{
    return i.endsWith('.story.tsx')
}).map(i=>i.replace('.story.tsx',''))

fs.writeFileSync('./src/stroy.json',JSON.stringify(all))
