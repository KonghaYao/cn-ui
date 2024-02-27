import { compress } from "../dist/compress.js";
import { areaList } from "@vant/area-data";
import fs from 'fs'
fs.writeFileSync(
    "./dist/area.json",
    JSON.stringify(Object.fromEntries(Object.entries(areaList).map(([key, val]) => {
        return [key, compress(val)]
    })))
)