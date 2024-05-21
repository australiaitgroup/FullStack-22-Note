# Lecture 13 React（5）

本篇笔记以 Zhao Long 老师的 Lecture 13 React (Part 5) 的课堂内容整理的随堂笔记。

## Table of Contents

1. [回顾](#1-回顾)
   - [1.1 项目结构及组件命名](#11-项目结构及组件命名)
   - [1.2 传参及反向数据流](#12-传参及反向数据流)
2. [State 状态](#2-state-状态)
3. [状态提升](#3-状态提升)

## 1. 回顾

### 1.1 项目结构及组件命名

> 💡 0422 同学感悟：子级可以省略父级以及出现过的概念

简单举例就是：

```txt
- src
 - components
    - TaskHeader.jsx
    - TaskFilter.jsx
    - TaskItems.jsx
    ...
```

可以优化为：

```txt
- src
 - components
    - Task
        - Header.jsx
        - Filter.jsx
        - Items.jsx
        ...
```

### 1.2 传参及反向数据流

在下面的代码中，AddTodo 是 App 的子组件：

```jsx
function AddTodo() {
    return (
        <form onSubmit={}>
            <input type="text" onChange={} />
            <button>Add</button>
        </form>
    )
}
```

当前有以下问题：

1. 已知我们可以从 input 的 onChange property 拿到用户输入的数据，
2. 已知我们可以从 form 的 onSubmit property 监听到用户点击 button， 说明用户输入数据是要加入 to-do list 的 task
3. 当前需求为展示用户输入的 tasks，因此我们需要一个 tasks 的 variable 来保存用户输入的数据。
4. 但是 onSubmit 时，没办法直接获得 input 里面的 value，因为数据不在同一个 context 里面
5. 我们需要把 onChange 的数据传递给 onSubmit，因此需要一个中转的 variable

根据现有需求写出以下代码：

```jsx
// AddTodo.jsx
function AddTodo() {
  const tasks = [];
  const value = '';

  return (
    <form onSubmit={() => tasks.push(value)}>
      <input type="text" onChange={(event) => (value) => event.target.value} />
      <button>Add</button>
    </form>
  );
}

// TodoList.jsx
function TodoList() {
  return (
    <ul>
      {tasks.map((item) => (
        <Todo>{item.text}</Todo>
      ))}
    </ul>
  );
}

// App.jsx
function App() {
  return (
    <div>
      <AddTodo />
      <TodoList />
    </div>
  );
}
```

在上面的代码中：

1. tasks variable 保存在 AddTodo 里
2. 我们需要 TodoList 也读取到 tasks variable, 但 TodoList 现在没有 tasks variable
3. 所以我们需要通过传参的方式让 TodoList 取得 tasks variable。
4. 此时 TodoList 与 AddTodo 有共同的父组件 App，子组件之间是不可以互相传参的。
5. 因此我们可以通过子传父的方式，让 App 拥有 tasks variable

因此有以下代码：

```jsx
// AddTodo.jsx
function AddTodo({ onTasks }) {
  const tasks = [];
  const value = '';

  return (
    <form onSubmit={() => tasks.push(value) onTask=(tasks)}>
      <input type="text" onChange={(event) => (value) => event.target.value} />
      <button>Add</button>
    </form>
  );
}

// App.jsx
function App() {
    const tasks = [];

  return (
    <div>
      <AddTodo onTasks={(newTasks) => tasks = newTasks}/>
      <TodoList />
    </div>
  );
}
```

在上面的代码中：

1. App 和 AddTodo 有一摸一样的 tasks
2. 根据单一职责，我们只能保留一个
3. 我们需要尝试保留 App 中的，删除 AddTodo 里面的。
4. 此时，AddTodo 和其子组件都没有 tasks variable，因此需要传参进来
5. onTasks 这个参数就不需要了，因为我们之前创建这个参数的目的是将 AddTodo 的 tasks 反向传递回去，现在可以直接父传子

```jsx
// AddTodo.jsx
function AddTodo({ tasks }) {
  const value = '';

  return (
    <form onSubmit={() => tasks.push(value)}>
      <input type="text" onChange={(event) => (value) => event.target.value} />
      <button>Add</button>
    </form>
  );
}

// App.jsx
function App() {
  const tasks = [];

  return (
    <div>
      <AddTodo tasks={tasks} />
      <TodoList />
    </div>
  );
}
```

上面的代码依然存在问题：

1. react 的 property 是只读的，我们不能操作 tasks
2. 如果要把 AddTodo 的 value push 到 App 的 tasks 里面，我们需要反向数据流

因此有以下代码：

```jsx
// AddTodo.jsx
function AddTodo({ onAdd }) {
  const value = '';

  return (
    <form onSubmit={() => onAdd(value)}>
      <input type="text" onChange={(event) => (value) => event.target.value} />
      <button>Add</button>
    </form>
  );
}

// App.jsx
function App() {
  const tasks = [];
  const onAdd = {
    tasks.push(value)
  };

  return (
    <div>
      <AddTodo tasks={tasks} onAdd={onAdd} />
      <TodoList />
    </div>
  );
}
```

此时，我们已经通过传参和反向数据流解决了数据传递的问题，但是我们还是需要手动更新 DOM 来显示最新的结果。我们需要保存组件的内部状态，并通知 react rerender 重新渲染页面。

早期是使用 class component + this.state 实现的，现在不这样写了。我们使用 Function Component 和 useState 实现上述需求。

## 2. State 状态

React 的 Hooks 机制，特别是 useState，带来了对 state 管理的新思路。与此前 class 组件中的 state 对象不同，允许我们为每一部分状态独立地定义其自己的状态和设置函数。这有几个关键的优势和原因：

```jsx
function MyComponent () {
    const [counter, setCounter] = useState(0) ;
    const [name, setName] = useState('Alice');
    ...
}
```

- 基本用法：`useState` 函数接受一个参数，即状态的初始值，并返回一个数组。这个数组包含两个元素：当前的状态值和一个用于更新该状态的函数。
  ```jsx
  const [state, setState] = useState(initialState);
  ```
- 状态更新：通过调用 setState 函数来更新状态。

  ```jsx
  const [count, setCount] = useState(0);
  setCount(count + 1);
  ```

- 更新 Object：如果状态是一个对象，你需要手动合并它。

  ```jsx
  const [name, setNamel = useState( 'Alice');
  const lage, setAge] = useState(25) ;

  setAge(32) ;

  const [profile, setProfile] = useState({
    name: 'Alice',
    age: 25
  });

  setProfile ({
    ...profile,
    age: 32,
  })
  ```

- 使用多个状态：在一个组件中，你可以使用多个 `useState` 来维护多个状态片段。

## 3. 状态提升

在 React 中，为了确保数据的一致性，我们经常采用状态提升（State Lifting）的策略。这意味着将状态从一个子组件移动到其共同的父组件中，以便其他兄弟组件也可以访问和修改该状态。

- 当两个或更多的组件需要共享相同的状态时，而该状态又在其中一个组件内部，这时我们通常会使用状态提升。提升状态到它们的最近共同父组件中，这样就能确保所有组件都可以访问和更新该状态，保持数据的一致性。

- 状态提升确保了数据在组件树中流动的清晰性，使得数据在任何给定时间点都有单一的“真实来源”，确保了应用的一致性和可预测性。通过这种方式，我们能更好地控制和追踪数据的变化，避免潜在的数据不同步的问题。

- 状态提升还简化了复杂应用的状态管理，因为我们不必在多个地方同步和更新相同的数据。通过局部中心化管理状态，我们可以更轻松地维护和扩展应用。

> 💡 理解状态提升确实对于初学者来说是一种挑战。通常，我们开始时会为某个组件设置一个最小局部状态。但随着应用的发展和组件的交互增加，我们会发现这些状态需要被其他组件所访问或修改。这时，我们就需要“提升“这个状态，使其变得更加可访问。

场景：我们有两个兄弟组件，分别是一个输入框组件 `TextInput` 和一个显示组件
`DisplayText`。初始时，`TextInput` 内部有一个状态表示输入的文本。但后来，我们希望 `DisplayText` 也能显示这个文本。这时，我们就需要提升状态。

**props 命名**

当我们在进行状态提升时，给 props 选择适当的命名非常重要。以下是一些建议和考虑事项：

1.可读性和明确性：你的组件的使用者（也可能是你自己，几周/月后）应该能够轻松理解 props 的目的。名字应该清晰地表达出它的用途。

2.考虑组件的责任：每个组件都应该有一个明确的责任或任务。当你为组件命名 props 时，考虑它如何与该组件的责任或功能相关联。

3.避免泄露实现细节：尽量不要让 props 的命名泄露其来源是一个 state 或其他实现细节。
例如，不要因为在父组件中是一个 state 就命名为 isModalopenState，简单地命名为 isModalOpen 会更好。

4.使用回调函数时添加“on”前缀：当传递函数作为 props 时，考虑为其添加“on” 前缀，以明确它是一个事件处理函数。例如：onChange, onSubmit 等。

5.避免冗余：尤其在状态提升的情境下，避免使用与组件名相同或重复的前缀。例如，对于 LoginForm 组件，使用 username 和 password，而不是 loginFormusername 和 loginFormPassword

6.确保一致性：在整个应用或项目中，保持 props 命名的一致性。例如，如果某个组件使用 onSubmit，其他具有相同功能的组件也应该使用这个命名，而不是 handleSubmit。
