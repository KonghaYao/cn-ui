---
layout: ../../../layouts/Markdown.astro
title: 响应式原子
author: 江夏尧
description: 响应式原子流
---

# 响应式原子

> 如果你对响应式原子流的概念不太清晰，请查看 [响应式原子流架构](../1_concept.md)

## Atom 最初的原子

Atom 是响应式原子流的基础，所有的响应式围绕其进行衍生和状态变化。

1. Atom 同时具有读和写的功能，其本体为 `Function`
2. 没有输入数据时，采用读取的方式
3. 而输入数据时，根据输入情况进行赋值

    1. 直接输入数据，写入
    2. 输入一个更改函数，根据返回值进行赋值

    > 这里特别注意，如果你的响应式数据为 `Function` ， 那么你必须要使用函数强制赋值的方式

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

## 结语

响应式原子仅仅是我们项目系统中最为基础的一部分，围绕这些功能，我们将构筑一个完整的自动更新的应用程序，高效、易懂地进行项目开发与更新迭代。
