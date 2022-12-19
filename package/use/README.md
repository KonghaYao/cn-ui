# @cn-ui/use

这是一个 solid-js 的 工具库，包含众多 CNUI 中使用到的使用函数，帮助你快速进行项目开发

### 非常恶劣的 BUG

```tsx
const Component = ()=>{
    const data = resource(fetcher)
    return <>
        {/* 这里会导致 solid-js 重复渲染，因为 最外层是空标签，所以 Solid-js 会不断重复渲染 */}
        <div></div>
        {data.isReady()&&false}
    <>
}

```
