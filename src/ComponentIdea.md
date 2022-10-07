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

## 4. Reactive Props <响应式参数>

-   组件应该像 Vue 那样进行一个响应式的动态的参数管理，使用方可以注入静态对象或者响应式对象作为组件的启动参数
-   不同于 Vue，响应式对象统一在组件内部进行数据交换，这样子使用者就不需要像 Vue 一样进行事件绑定。

-   我们使用自己的响应式参数库 @cn-ui/use，使用相应数据源流的概念进行数据的统一。

```tsx
import { Atom, atomization, atom, reflect } from '@cn-ui/use';
export interface CompProps {
    /** Yes, Support Original Type and Atom Type */
    data: string[] | Atom<string[]>;
}

export const Comp = OriginComponent<CompProps, HTMLDivElement>((props) => {
    // if send an Original Object, This will wrapper it and return an atom!
    const data = atomization(props.data);

    // reflect is like useMemo | createMemo | Computed
    const computed = reflect(() => data().join(' '));
    return <div>{computed()}</div>;
});

const UserComp = () => {
    const tags = atom<string[]>(['A', 'B', 'C']);
    // You can keep to use tags to generate many active atom or
    return <Comp data={tags}></Comp>;
};
```

## 4. Closable Event <可熔断事件流>

```tsx
import { useEventController, emitEvent } from '@cn-ui/use';
const Comp = (props) => {
    const disabled = atomization(props.disabled ?? false);
    const control = useEventController({ disabled });
    <div
        class="sub flex items-center"
        onClick={control(
            [
                // 向外部暴露事件，同时如果外部返回 false， 熔断执行
                emitEvent(props.onValueInput, ([e]: [Event]) => [e, !value()] as const),
                async (e) => {
                    value((i) => !i);
                },
            ],
            // 是否采用 batch 更新
            { batch: true }
        )}
    >
        这是一个组件
    </div>;
};
```

## Box-Like-Style <盒式组件样式>

-   组件最外层 DOM 应该使用 padding，margin 属性统一留给外部去扩展
