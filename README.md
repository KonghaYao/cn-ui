## 使用 @cn-ui/core

1. 必须安装 tailwindcss
2. 配置文件

```js
console.log('using tailwindcss config');
module.exports = {
    content: [
        './src/**/*.{ts,tsx}',
        './node_modules/@cn-ui/core/dist/**', // 添加这一行
    ],
    theme: {
        extend: {
            boxShadow: {
                suit: '0 4px 11px -2px rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%)',
            },
        },
    },
    mode: 'jit',
    plugins: [require('@tailwindcss/line-clamp')],
};
```

# 借鉴插件

-   [x] swiper
-   [x] https://www.npmjs.com/package/viewerjs
-   [x] https://github.com/itaditya/solid-command-palette
-   [x] Tippy.js
-   [x] 中国地区 https://vant-contrib.gitee.io/vant/#/zh-CN/area
-   [x] 借鉴 https://github.com/upload-io/uploader#installation
-   [x] 借鉴 https://www.npmjs.com/package/solid-split-component
-   [x] 高亮库 lowlight
-   [x] 图片裁剪库 https://fengyuanchen.github.io/cropperjs/
-   [x] 可拖拽组件 http://sortablejs.github.io/Sortable/
-   [ ] 时间选择器 https://github.com/haoxins/react-flatpickr/blob/master/lib/index.js
-   [ ] 瀑布流布局 https://github.com/callmecavs/bricks.js
-   [ ] 视觉引导 driver.js
-   [ ] 3D 动态效果 https://micku7zu.github.io/vanilla-tilt.js/
-   [ ] spinners https://github.com/craigjennings11/wc-spinners
-   [ ] https://perfectscrollbar.com/#section-intro
