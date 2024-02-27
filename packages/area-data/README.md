# China Area Data Compressed 中国省市区数据（压缩版本） 


```js
import compressedData from '@cn-ui/area-data/dist/area.json'
import { decompress } from '@cn-ui/area-data'
const originData = decompress(compressedData.county_list)
```