# 组件库构建

1. development 使用 Vite，而 构建使用 rollup
    - Vite 的即时预览非常方便
    - 由于 Vite 的库构建模式不够理想，我们采用 rollup 的传统构建流程来进行
    - package 中的组件因为单一组件模式，可以使用 Vite 打包
2. 全局 Alias 循环闭合
    - tsconfig.json 需要设置自身的 alias 使得我们的内部代码可以指向自身
    - vite.config.js 需要设置 alias 改写此项目的 name 指向 /src/index.ts
    - 组件自闭合：组件内部需要调用另外一个组件，那么需要使用 alias 指向全局
