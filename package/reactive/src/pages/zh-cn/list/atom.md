---
layout: ../../../layouts/Markdown.astro
title: 响应式原子
author: 江夏尧
description: 响应式原子流
---

# 响应式原子

> 如果你对响应式原子流的概念不太清晰，请查看 [响应式原子流架构](../1_concept)

## Atom 最初的原子

Atom 是响应式原子流的基础，所有的响应式围绕其进行衍生和状态变化。

1. Atom 同时具有读和写的功能，其本体为 `Function`
2. 没有输入数据时，采用读取的方式
3. 而输入数据时，根据输入情况进行赋值

    1. 直接输入数据，写入
    2. 输入一个更改函数，根据返回值进行赋值

    > 这里特别注意，如果你的响应式数据为 `Function` ， 那么你必须要使用函数强制赋值的方方法

4. 高级属性： [reflux 回流](#使用-reflux-回流来改变自己)

```tsx
const comp = () => {
    const a = atom<boolean>(false);
    console.log(a()); // false

    a(true);
    console.log(a()); // true

    a((i) => !i);
    console.log(a()); // false
};
```

## 使用 Reflect 和 ReflectMemo 衍生

Reflect 能够建立一个依赖于函数结果的 Atom。在内部依赖更新时，将会直接更新这个数据，Reflect、ReflectMemo 类似于 Vue 中的 `computed`，只是稍有差别。

1. Reflect 本质上是生成一个 Atom，然后对其绑定更新函数，实现更新。

2. 所以 Atom 生 Atom，Reflect 使得响应式链可以形成

3. ReflectMemo 不允许被突变，也就是限制了写的权限。

4. 只要是在计算函数内部的响应式调用，都是可以被接收的。

```tsx
const comp = () => {
    const source = atom(false);
    const newAtom = reflect(() => {
        // 计算出一个值，当 source 变化时，newAtom 也会随着变化
        return source() ? 100 : -100;
    });
};
```

## 使用 resource 处理异步逻辑

ResourceAtom 是专门用于异步更新的 Atom，内置异步状态管理，依赖更新绑定等实用的功能。异步函数管理中的取消行为是非常常用的操作，比如说请求分页，但是用户点击太快，发送了多次，那么就需要进行一个取消管理，`resource` 则内置了这个策略。

> SolidJS 在异步函数中没法收集依赖，所以如果需要自动更新，我们应该提供手动依赖以便程序能够自动更新。

```tsx
const comp = () => {
    const page = atom(0);
    const source = resource(
        async () => {
            const data = await asyncFunc(page());

            return data;
        },
        {
            // 如果你需要绑定 page 进行自动更新，那么必须要在下面声明
            deps: [page],

            //  tap 将会在此次异步函数执行完成之后，并且没有被取消时使用
            tap(data) {
                source.maxPage((i) => data.maxPage);
            },
        }
    );
    return <div>{source.isReady() ? source() : '默认值'}</div>;
};
```

> 当异步函数发生重叠时，默认会进行提示，因为这是设计上的失误，需要进行异步函数的取消行为。放心，`resource` 检测到异步覆盖时，都会在 console 进行提示。如果你认为你的异步函数不会影响太大，那么可以手动屏蔽警告

```tsx
const controller = new AbortController();
const { signal, cancel } = controller;

resource(
    () =>
        fetch('', {
            signal,
        }),
    {
        refetch: {
            cancelCallback: cancel,
            // 不进行通知
            // warn:false
        },
    }
);
```

## 使用 reflux 回流来改变自己

在应用程序中，经常会遇到用户输入表单，但是输入的一些数据类型需要一定的变通的情况。这个时候可以使用 reflux 来使得更新关系反转，由子 Atom 通过更新函数更新父 Atom。

```tsx
const InputComp = () => {
    const num = atom(100);
    const str = num.reflux(
        /* 默认的初始值 */
        '100',
        /** 由于 num 是数字，所以回流回去也需要数字 */
        (i) => parseInt(i, 10)
    );
    return (
        <input type="text" value={str()} oninput={(e) => str(e.target.value)}>
            {/* 当用户输入数字字符的时候，将会自动变更为数字并更新到 num 上 */}
        </input>
    );
};
```

> 1. 不建议直接赋值父 Atom ，因为这样将数据处理操作分离到了 input 的事件上，
> 2. 而且多添加一个 Atom 也可以使得这个 Atom 更加清晰地表达 input 的状态，
> 3. 我们应该尽可能围绕一个任务去构筑响应式逻辑，把很大块的逻辑收束到一个函数里面（Hook），在 JSX 等结构表达语法中使用简短易懂的小型逻辑。

## 发生副作用

发生副作用是非常常用的开发方式，副作用当然可以自动收集依赖或者手动处理依赖，这两者自由度不同，但是在开发时是可以同时使用的。

> Solid 原生的 createEffect 是自动收集依赖，在内部获取响应式数据时自动收集依赖。特别的，createEffect 是可以在运行中收集依赖的，可以使用分支。但是只有获取响应式数据的时候才会收集依赖，那么第一次在否定分支的逻辑没有被触发，依赖就没法收集，所以可以采用 `useEffect` 的方式，在函数定义时一并声明依赖。

```tsx
const a = atom('a');
const b = atom('b');
const magic = atom(true);

createEffect(() => {
    if (magic()) {
        a();
    } else {
        // 第一次这里不会被触发，所以其实是没有收集到 b 的依赖的
        b();
    }
});

useEffect(() => {
    // 第一次会被立即执行
    magic() ? a(b()) : b(a());
}, [a, b, magic]);

// 这个特殊情况：第一次将不会被执行，后续更新才会执行，适合于更新某些值的场景
useEffectWithoutFirst(() => {
    magic() ? a(b()) : b(a());
}, [a, b, magic]);
```

## 结语

响应式原子仅仅是我们项目系统中最为基础的一部分，围绕这些功能，我们将构筑一个完整的自动更新的应用程序，高效、易懂地进行项目开发与更新迭代。
