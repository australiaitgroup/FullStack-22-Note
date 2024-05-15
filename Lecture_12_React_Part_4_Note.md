# Lecture 12 React（4）

本篇笔记以 Zhao Long 老师的 Lecture 12 React (Part 4) 的课堂内容整理的随堂笔记。

## Table of Contents

1. [Props](#1-props)
   - [1.1 基本定义](#11-基本定义)
   - [1.2 核心概念](#12-核心概念)
   - [1.3 传递数据](#13-传递数据)
   - [1.4 Children](#14-children)
   - [1.5 传递所有 props](#15-传递所有-props)
2. [在 react 中应用 style](#2-在-react-中应用-style)

   - [2.1 BEM](#21-bem)
   - [2.2 直接引入 CSS](#22-直接引入-css)
   - [2.3 CSS Modules](#23-css-modules)
   - [2.4 样式化组件 sytled components](#24-样式化组件-sytled-components)
   - [2.5 Tailwind CSS](#25-tailwind-css)

## 1. Props

`Props`（属性）是 React 中的一个核心概念，它允许组件间的数据流动。

### 1.1 基本定义

`Props` 是 properties 的缩写，是 React 组件的输入。你可以将它看作是传递给函数的参数。`Props` 是从父组件传递给子组件的数据。

React 在调用 component 时，是使用 HTML Attribute 来传递数据的。HTML Attribute 是一种 `key-value` 的数据结构，在 JavaScript 中的体现就是 `Object`。

同时 HTML 和 React Component 中都有 attribute 的概念，所以从可读性角度，React 在这里引入 `props` 作为区分。

```jsx
// Welcome Component
function Welcome(props) {
  // 传入参数为 props object
  return <p>Welcome, {props.name}!</p>;
}
```

```jsx
// HomePage Component
function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Welcome name="Alice" /> // 这里传入的其实是 {name: "Alice"}
    </div>
  );
}
```

这样就让我们的 react 组件的写法无限接近于 HTML。

**方法的传递**

```jsx
// login function
const login = () => ...
```

```jsx
// HomePage Component
function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={login}>login</button>
    </div>
  );
}
```

> 💡 在 JSX 里面，所有已`<`开头到`>`结尾的内容，都会被认定为 HTML。
> 在 JSX 的 HTML 里面，所有已`{`开头到`}`结尾的内容，都会被认定为 JavaScript

**Example**

在下面这个例子中，Welcome 组件的 parameter 是一个 object，利用了 object 的默认值（请参考 lecture07 的笔记中 `5.4.3.默认值` 一节）。不传入参数时，使用默认值，即 `'World'`，反之使用传入的 name 值。

```jsx
function Welcome({ name = 'World' }) {
  return <p>Hello, {name}</p>;
}
```

```jsx
// HomePage Component
function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Welcome /> // Hello, World
      <Welcome name="Alice" /> // Hello, Alice
    </div>
  );
}
```

**面试题**：

**Q**: 请问下面这种传递参数的方式有什么问题，好不好？

```jsx
// Welcome Component
function Welcome(name) {
  return <p>Welcome, {name}!</p>;
}
```

```jsx
// HomePage Component
function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Welcome('Alice') />
    </div>
  );
}
```

**A**: 不好，因为不可读，不可读的原因在于，我们调用 component 方法是类似于 html tag 的调用，html 中不存在`<Welcome('Alice') />`这样的写法，从而导致 jsx 的可读性变差。

> 💡 回答问题时要围绕**黄金法则**：可读、可复用、可维护。同时 jsx 的核心概念就是可以在 javascript 中写 html，从而让我们的代码更加可读。

### 1.2 核心概念

1. 只读属性

   - `props` 是只读的，这意味着组件不应该修改它收到的 `props`。这有助于保持数据的一致性和可预测性。

2. 使用场景

   - 可以使用 `props` 来传递各种数据，包括基本数据类型、对象、数组和函数
   - 在 react 中，数据是自上而下（或从父到子）流动的。父组件可以通过 `props` 将数据传递给子组件。这种单向数据流式的组件树的数据流易于理解和预测。

3. 自定义组件和 `props`

   - 当你创建自定义组件时，你可以定义你的组件应该接受哪些 `props`，以及这些 `props` 的类型和默认值。

4. 子组件使用 props

   - 子组件可以通过 this.props（在类组件中）或者直接作为函数参数（在函数组件中）来访问传递给它的 props

5. HTML attribute 改写
   - class -> className
   - for -> htmlFor
   - ...

### 1.3 传递数据

在 react 中，数据是自上而下（或从父到子）流动的。父组件可以通过 `props` 将数据传递给子组件。然而，有时可能需要在组件之间的不同层次或者同级之间传递数据。

父传子（Parent to Child）

```jsx
// ParentComponent.jsx
function ParentComponent() {
  return (
    <div>
      {/* Pass the data to the child component as props */}
      <ChildComponent propValue={value} />
    </div>
  );
}

// ChildComponent.jsx
function ChildComponent(props) {
  // Access the data passed from the parent component via props
  return <div>{props.propValue}</div>;
}
```

子传父（Child to Parent）

- 子组件不能直接将 props 传回父组件。但是，父组件可以提供一个回调函数/反向数据流，作为 props 传递给子组件，子组件可以调用该函数并将数据传递回父组件。

```jsx
// ParentComponent.jsx
function ParentComponent() {
  const [messageFromChild, setMessageFromChild] = useState('');

  // Callback function to receive data from child
  const receiveDataFromChild = (data) => {
    setMessageFromChild(data);
  };

  return (
    <div>
      <p>Message from child: {messageFromChild}</p>
      {/* Pass the callback function as a prop to the child */}
      <ChildComponent sendDataToParent={receiveDataFromChild} />
    </div>
  );
}

// ChildComponent.jsx
function ChildComponent(props) {
  const [message, setMessage] = useState('');

  const sendMessageToParent = () => {
    // Call the callback function provided by the parent
    props.sendDataToParent(message);
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessageToParent}>Send Message to Parent</button>
    </div>
  );
}
```

### 1.4 Children

在 React 中，`children` 属性是一个特殊的属性，允许组件接受任意内容作为子元素。这些内容可以是纯文本、其他 React 元素，以及组件。`children` 属性代表了组件开启和关闭标签之间的所有内容。

**Example**

```jsx
// ParentComponent.js
function ParentComponent() {
  return (
    <div>
      <ChildComponent>
        <p>This is a child element</p>
        <button>Click me</button>
      </ChildComponent>
    </div>
  );
}

// ChildComponent.js
function ChildComponent(props) {
  return (
    <div>
      <h2>Child Component</h2>
      {/* Display the children passed to this component */}
      {props.children}
    </div>
  );
}
```

**面试题**

**Q**: 给你一段很烂的代码如下，请改写，并说明为什么要这样改。

```jsx
// Hello.jsx
function Hello({ children }) {
  return <p>Hello, {children.name}</p>;
}

// App.jsx
function App() {
  return <Hello>{{ name: 'Alice' }}</Hello>;
}
```

**A**: 改写如下。原因是，好的 jsx 的写法应该是无限趋近于 html 的，children 是用来传递另一个 jsx 的而不是传值，传值应该使用 props 而不是 children。

```jsx
// Hello.jsx
function Hello({ name }) {
  return <p>Hello, {name}</p>;
}

// App.jsx
function App() {
  return <Hello name="Alice" />;
}
```

**Q**: 已知有下面这样一个 Hello 组件，如何实现`<p>Greeting, <strong>Alice</strong></p>`这样的结果。

```jsx
function Hello({ children }) {
  const name = 'Alice';

  return children(name);
}
```

**A**: 国内很喜欢下面这个写法，可以避免数据流回传。澳洲不建议这样写。

```jsx
function App() {
  return (
    <Hello>
      {(name) => (
        <p>
          Greeting, <strong>{name}</strong>
        </p>
      )}
    </Hello>
  );
}
```

### 1.5 传递所有 props

可以使用扩展运算符`...`来传递所有的 props

```jsx
// Student.jsx
function Student(props) {
  return (
    <div>
      <h3>Student</h3>
      <p>Id: {props.id}</p>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

// App.jsx
function App() {
  const student = {
    id: 'st001',
    name: 'fakeName',
    age: 20,
  };

  return <Student {...student} />;
}
```

## 2. 在 React 中应用 style

### 2.1 BEM

Block\_\_Element--Modifier

为什么写 BEM:

- 因为我们没办法快速实现一个可读的唯一 `className` 生成器

参考: [BEM](https://getbem.com/)

### 2.2 直接引入 css

```jsx
import './App.css';
```

💡 就近维护原则: 将于组件相关的东西，都放在一个文件夹下。

```txt
- public
    - index.html
- src
    - components
        - Header
            - Header.jsx
            - index.js
            - Header.css
```

**使用 sass**
参考:

- [SASS Loader](https://www.npmjs.com/package/sass-loader)

### 2.3 CSS Modules

手动维护 className 是很累的，所以引入了自动生成工具 CSS Modules。

CSS Modules 允许你将 CSS 样式模块化，确保每个组件的样式在其作用域内。在使用 CSS Modules 时，你不太容易发生样式冲突，因为每个模块的样式都被封装在自己的作用域内。

参考:

- [How to use Sass and CSS Modules with create-react-app](https://esausilva.com/2020/07/23/how-to-use-sass-and-css-modules-with-create-react-app-cra/)

> 💡 建议所有喜欢写 css 的同学都去写 css module

### 2.4 样式化组件 sytled-components

参考:

- [styled-components](https://styled-components.com/docs)

> 💡 有兴趣的了解一下，市场占有率越来越低

### 2.5 Tailwind CSS

Tailwind CSS 是一个基于原子类的 CSS 框架，它提供了一系列预定义的 CSS 类，用于快速构建用户界面。与传统的 CSS 框架（如 Bootstrap 或 Foundation）不同，Tailwind CSS 并没有提供预定义的组件或样式，而是专注于提供一组原子级别的类，每个类代表一个特定的样式属性。通过组合这些原子类，开发人员可以快速构建出所需的样式。

> 💡 Tailwind CSS 是当前市场的主流。不推荐使用 Material UI 和 Tailwind UI。

参考:

- [Tailwind CSS](https://tailwindcss.com)
