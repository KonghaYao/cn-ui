---
layout: ../../../layouts/Markdown.astro
title: 响应式原子
author: 江夏尧
description: 响应式原子流
---

## 响应式原子

> 如果你对响应式原子流的概念不太清晰，请查看 [响应式原子流架构](../1_concept.md)

### Atom 最初的原子

Atom 是响应式原子流的基础，所有的响应式围绕其进行衍生和状态变化。

1. Atom 同时具有读和写的功能，其本体为 `Function`
2. 没有输入数据时，采用读取的方式
3. 而输入数据时，根据输入情况进行赋值

    1. 直接输入数据，写入
    2. 输入一个更改函数，根据返回值进行赋值

    > 这里特别注意，如果你的响应式数据为 `Function` ， 那么你必须要使用函数强制赋值的方式

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
