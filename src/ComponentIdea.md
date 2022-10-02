# 组件设计理念

## 1. Styleable <样式自定义>

-   所有的组件都应该是样式自由的，
-   通过 style、 class、className 传递样式相关的数据到组件内部
-   通过统一的组件修饰函数自动处理统一 style 和 class 的样式，将其转化为合理的统一形态供内部使用

```tsx
// OriginComponent 将 style 和 class className 转化为了 style 对象 和 class 生成函数
export const MyComp = OriginComponent<Props>((props) => {
    return (
        <div
            // 生成函数可以接受 string，string[]，classList 的参数，非常好用
            class={props.class('cn-box', ['fake', 'class'], { class: true })}
            // style 对象可以展开并进行修改
            style={{ ...props.style, height: '100%' }}
        ></div>
    );
});
```

## 2. Refable <暴露组件 DOM >

-   所有的组件都应该可以通过 ref 的方式获取内部的 DOM 对象。
-   为了保证扩展性，至少保持最外层的 DOM 是可以获取的，除非没有 DOM 结构可以 ref

```tsx
export const MyComp = OriginComponent<Props>((props) => {
    return <div ref={props.ref}></div>;
});
```

## 3. Origin-Like <原始模样>

-   组件的 Props 应该继承自一个合理的 HTML 标签类型，这样可以保证大多数行为可以被继承

```tsx
import { JSX } from 'solid-js';
interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: JSXElement;
}
// OriginComponent 的第二参数可以保证 ref 的类型正确
export const MyComp = OriginComponent<Props, HTMLDivElement>((props) => {
    return <div ref={props.ref}></div>;
});
```

## 4. Just-Newest <维持最新态>

-   在特定时候，锁定组件的状态，阻止多余的并发操作。

-   总的来说，用户认为一个搜索框是单独的

-   那么搜索框就应该只有统一的一个状态，维持最新的状态是我们应该达成的要求

```tsx
<div
    onClick={(e) => {
        // ClickChannel 将会使得一个组件同一时间只有一个异步执行函数，在执行完成之前结束多余函数
        ClickChannel(async (e) => {
            // 这里执行异步函数
            // 这里承接外部的事件函数，控制权交由外侧
            const keep = props.onValueChange && (await props.onValueChange(e, !old));
            // 通过 keep 数据，控制权交由内侧
        }, e);
    }}
></div>
```
