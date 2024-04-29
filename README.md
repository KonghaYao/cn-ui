# CN-UI 组件库
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FKonghaYao%2Fcn-ui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FKonghaYao%2Fcn-ui?ref=badge_shield)


```sh
npm i cn-ui
```

```jsx
// import css in entry file
import "@cn-ui/core/dist/cn-uno.css"; // 如果不使用 unocss，那么请加载这个

import { Button } from "@cn-ui/core";
export const MyApp = () => {
    return <Button>Hello</Button>;
};
```

### DEV

```sh
git submodules update
pnpm i
```


### 下载测试文件包

```sh
node script/snapshotSync.mjs download # 下载测试文件包


node script/snapshotSync.mjs upload # 上传测试文件包，需要在 .env 文件中写入 UPLOAD_TOKEN=

```

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FKonghaYao%2Fcn-ui.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FKonghaYao%2Fcn-ui?ref=badge_large)