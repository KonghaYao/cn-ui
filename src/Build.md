# 组件库构建

1. 开发时使用 Vite，而构建使用 rollup
    - Vite 的即时预览非常方便
    - 由于 Vite 的库构建模式不够理想，我们采用 rollup 的传统构建流程来进行
    - package 中的组件因为单一组件模式，可以使用 Vite 打包
2. 全局 Alias 循环闭合
    - 组件库必须有一个全局名称，名称定为 @cn-ui/core
    - tsconfig.json 需要设置自身的 alias 使得我们的内部代码可以 @cn-ui/core
    - vite.config.js 需要设置 alias 改写此项目 @cn-ui/core 指向 /src/index.ts
    - 组件自闭合：组件内部需要调用另外一个组件，那么需要使用 alias 指向 @cn-ui/core, 而不是直接使用相对路径。
    - 原因：CSS 文件无法被摇树优化删除！但是 CSS 可以被单独打包。开发者从外部引入的时候，需要多写 css 文件的引入路径，这样开发者才可以使得他的项目按需引入 CSS 文件。
