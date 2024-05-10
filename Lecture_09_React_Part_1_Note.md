# Lecture 09 React (1)

本篇笔记以 Zhao Long 老师的 Lecture 09 React (Part 1) 的课堂内容整理的随堂笔记

## Table of Contents

1. [ES6 回顾](#1-es6-回顾)

2. [高质量的代码](#2-高质量的代码)

3. [SOLID 原则](#3-solid-原则---绝世武功秘籍)

## 1. ES6 回顾

1. `let` 和 `const`
   - 解决的痛点：变量提升，块级作用域和不可变性。
2. 箭头函数（Arrow Functions）
   - 解决的痛点：简洁的语法和词法作用域的 `this`
3. 模版字符串
   - 解决的痛点：字符串拼接和多行字符串
4. 解构赋值
   - 解决的痛点：繁琐的对象和数组元素提取
5. 默认参数
   - 解决的痛点：参数默认值的繁琐设置

**面试题**

Q: ES6 带来的提升是什么？我们为什么需要 ES6?

A: ES6 主要做的是引进了许多新的语法糖而不是（性能提升/运行效率），比如 classname，解构赋值，默认参数，模版字符串等，这些提升旨在提高 JavaScript 的代码质量，通过新的语法糖，提高代码 **1.可读**，**2.可复用** 和 **3.可维护性**，从而提高 JavaScript 的开发和维护效率。

Q: 实现 `getStops`

1. 给定输入的行程数据
2. 计算相应的 Stops
3. 12 个 stops => Dream Trip
4. 24 个 stops => Around the World

A:

```js
const SPECIAL_STOPS_MAPPING = {
  0: "Direct",
  12: "Dream Trip",
  24: "Around the World",
};

const plural = (string, count) => {
  if (count > 1) {
    return `${string}s`;
  }

  return string;
};

const getStops = (flights) => {
  const stops = flights.length - 1;

  return SPECIAL_STOPS_MAPPING[stops] || `${stops} ${plural("Stop", stops)}`;
};

const flights = [{ origin: "MEL", destination: "PYG" }];

getStops(flights); // Direct

const flights = [
  { origin: "MEL", destination: "HKG" },
  { origin: "HKG", destination: "PYG" },
];

getStops(flights); // 1 Stop
```

> 符合人类思考方式的代码才是好代码

## 2. 高质量的代码

> 雷军：我的代码写的像诗一样优雅

**老师的巴掌规则**

1. 一旦写了 if 就给自己一巴掌，写了 else 再给多一巴掌。
2. 每次 copy paste，给自己一巴掌。
3. 如果考虑到了未来，给自己一巴掌。

**高质量代码**：

- 可读性 Readable
- 可维护性 Maintainable
- 可复用性 Reusable
- 写符合人类思考方式的代码
- 在写代码之前充分了解问题
- 变量命名需要具有描述性
- Don't repeat yourself
- keep it simple, stupid
- 不要为未来设计代码，不要添加当前不需要的功能
- 即使代码已经工作，也应该回顾和改进

## 3. SOLID 原则 - 绝世武功秘籍

1. 单一职责原则（single responsiblity principle）

   一个代码块只负责一项任务

2. 开放封闭原则（open/ clode principle）

   对拓展开放，对修改封闭

3. 里氏替换原则（Liskov Substitution principle）

   子类应该能替换其基类并能透明地工作。

4. 接口隔离原则（Interface Segregation Principle）

   客户端不应该依赖于它不使用的接口。

5. 依赖倒置原则（Dependence Inversion Principle）

   高层模块不应依赖于底层模块，他们都应该依赖于抽象。

6. 依赖注入原则（dependency injection principle）

   一个代码块的依赖应该由外部注入，而不是耦合在实现逻辑里

> 在 JavaScript 中 3，4，5 使用的不是很多，因此可以简化为 SOD

**SOD**

1. 单一职责原则（single responsiblity principle）

   一个代码块只负责一项任务

2. 开放封闭原则（open/ clode principle）

   对拓展开放，对修改封闭

3. 依赖注入原则（dependency injection principle）

   一个代码块的依赖应该由外部注入，而不是耦合在实现逻辑里

> 好的代码写三遍。将之前的代码重复写，尽量实践 SOD 和符合人类思维方式的原则。

实践单一职责原则：

可不可以把代码分成多块代码区域，每块代码有自己的责任，同时每一块代码的责任不重复。

实践开闭原则：

可不可以找到核心代码块，后续扩展可不可以不碰核心代码块。

实践依赖注入原则：

有没有依赖，依赖是不是注入进来的？依赖就是外部给定的数据，产品需求就是依赖，而不是代码自带的逻辑。
