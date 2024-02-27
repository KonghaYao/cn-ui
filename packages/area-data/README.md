# China Area Data Compressed 中国省市区数据（压缩版本） 

| 对比项 | 原始文件 | @cn-ui/area-data |
|------|---|-|
| Size         | 84.71 KiB | 55.66 KiB |
| Gzipped      | 28.2 KiB | 20.69 KiB |

```js
import compressedData from '@cn-ui/area-data/dist/area.json'
import { decompress } from '@cn-ui/area-data'
const originData = decompress(compressedData.county_list)
```

