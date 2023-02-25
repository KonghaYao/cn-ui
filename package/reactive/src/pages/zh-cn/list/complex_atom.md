---
layout: ../../../layouts/Markdown.astro
title: 复杂原子
author: 江夏尧
description: 关于复杂原子
---

## 复杂原子

相对于 `string`、`number`，`FormData`，`Date`等对象可以认为是复杂的一些对象，那么对于这些复杂的对象，我们提供了非常方便的封装，这些封装后的响应式原子称为复杂原子。

> 注意：当前版本采用函数修饰对象的方式进行更改。如果你输入了一个 Atom，那么我们将会在这个 Atom 的本身进行一个转换，Atom 的读写是没有问题的，但是可能会失去 reflux 等功能。

## 处理 Array？使用 ArrayAtom 修饰！

一般来说，页面列表分页处理的话，将会使用到数组的渲染，那么数组里面我想要删除，移动，更新等，都是非常高重复率的事情，所以我们把这些逻辑集成到了这里。

> 注意 ArrayAtom 的操作都是基于相对位置进行的，也就是说，输入值，我们将删除这个值，所以请尽量不要值重复，这个可能会引起相对引用的 BUG。
> 同时 ArrayAtom 的工具都是进行修改的，并不是进行迭代的，所以 map，forEach 等功能需要获取值进行。

```tsx
// Yes, 我们有 mock 数组的方式😄
const a = genArray(10).map((i) => i.toString());

const arr = ArrayAtom(a);
arr.replace('2', 'Origin 2'); // 直接替换它
arr.switch('3', '1');
arr.insert('1', '3', 'after'); // 把 1 嵌入到 3 后面
```

## 处理表单？试试 ObjectAtom！

在项目中，是否经常遇到 Form 表单，URLSearchParams 的构建问题？这些其实应该归为对象类型的数据开发，需要每个键值地操作对象属性，但是最终却要汇总为一个对象，那么这个时候 ObjectAtom 就很好用了。ObjectAtom 将输入的对像和它的响应式键值对联系在一起，任何响应式键值对的变化，这个对象也会自动更新，而且都是 Atom，具有一样的功能，这就使得整个过程变得协调和统一。

```tsx
// 表单填写在此种逻辑下，直接变成了纯粹的数据逻辑，脱离了任何的结构样式。
const fd = ObjectAtom({
    username: '',
    password: '',
    email: '',
});

fd.username('江夏尧'); // yes, 每个键都变成了一个 Atom!
fd.password('123456789'); // yes, 每个键都变成了一个 Atom!
fd.email('1234567@gh.com'); // yes, 每个键都变成了一个 Atom!

fd(); // 嘿，自动帮你收集好了

EntriesTransform(fd).toFormData(); // 变成 FormData 了😂
```

### EntriesTransform 转换成各种其他对象

ObjectAtom 处理的是纯粹的对象类型，但是在 Web 开发中经常会有 FormData、Headers 对象，这些个类型采用的是 set、append 等方式进行改变的对象。但其实可以使用纯粹对象进行转换，EntriesTransform 就是这样的工具。

> Headers、FormData 等是可以使用重复键的，比如 append 操作，但是在大部分情况下，重复键这个特性没有使用空间，那么还不如直接使用对象简单，所以采用转换方式比较合适。

```tsx
EntriesTransform(fd).toFormData();
EntriesTransform(fd).toHeaders();
EntriesTransform(fd).toMaps();
// ...
```

## 处理重复操作？DebounceAtom、ThrottleAtom

这一类是处理一定时间内多次数据更新的 `过滤原子`，可以帮助程序在时间上降低响应次数，维护程序的可靠性。

```tsx
const Comp = () => {
    const text = atom('');
    const dText = DebounceAtom(text, 300); // 300 ms debounce

    return <input value={text()} onInput={(e) => text(e.target.value)}></input>;
};
```
