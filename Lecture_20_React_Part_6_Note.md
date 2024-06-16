# Lecture 20 React Part 6

本篇笔记以 Zhao Long 老师的 Lecture 20 React (Part 6) 的课堂内容整理的随堂笔记。

参考：

- [Chuckroo Figma](https://www.figma.com/design/1mtXW6DiTItPXLAA9vj979/Chuckroo?node-id=0-1)

## Table of Contents

1. [像傻子一样写代码](#1-像傻子一样写代码)
2. [Chuckroo](#2-chuckroo)
3. [解决问题的方式方法以及课堂答疑](#3-解决问题的方式方法以及课堂答疑)
4. [从零开始搭建项目](#4-从零开始搭建项目)

## 1. 像傻子一样写代码

> **Q**: 假设我们什么都不会，我们应该如何写出一个大型项目？
> **A**: 多写，形成肌肉记忆。 不考虑任何东西，本能地写代码

1. 将设计稿划分为组件层级
2. 实现静态版本
3. 找到 state 的最小位置
4. 实现 state 的最小正确位置
5. 添加反向数据流

这样我们就写好了一个 React 项目了

参考：[React 哲学](https://zh-hans.react.dev/learn/thinking-in-react)

- 步骤一：将 UI 拆解为组件层级结构
- 步骤二：使用 React 构建一个静态版本
- 步骤三：找出 UI 精简且完整的 state 表示
- 步骤四：验证 state 应该被放置在哪里
- 步骤五：添加反向数据流

> 之后的课程都会围绕 React 哲学展开

## 2. Chuckroo

[Chuckroo Figma](https://www.figma.com/design/1mtXW6DiTItPXLAA9vj979/Chuckroo?node-id=0-1)

**关于分工**

在分工的同时要保证协作，之后的 project3 中进行实践。

**拆分组件**

```txt
- HomePage
    - Header
        - SearchBar
        - Authentication
            - Login
            - Signup
            --------------
            - Notification
            - User
    - Introduction
        - Title
        - Subtitle
        - Description
    - ExploreOurTags
        - Tags
        - CreateBlogButton
    - ExploreOutBlogs
        - Blogs
            - Blog
        - MoreBlogsButton
    - Footer
        - Website
        - Team
        - Legal
        - ShareLink
        - WaterMark
    - SearchBar
    - SectionHeader
    - Logo
```

**拆分过程中**：

- 遇到重复的组件（名字相同），确认其是否有相同的责任，如果名字与责任都相同，应该将该组件作为一个公共组件，进行复用，如：SearchBar。如果名字相同但责任不同 (不能复用)，需要重新考虑组件的命名。
- 命名组件遇到困难时，首先考虑与产品（或者组内）进行沟通，确认统一的最终命名。
  - 命名需要符合业务逻辑，如：`CreateBlogButton`，不可以是 generic 的命名
  - 不应该出现 `Button` 这样的 Global 组件
- 划分组件直到最小层级

## 3. 解决问题的方式方法以及课堂答疑

- 发现问题，首先解决提出问题的人（代码），假设某块代码出现问题，考虑：

  - 这段代码删掉可不可以？
  - 如果不能删掉，考虑为什么这个问题为什么会是一个问题

- 当一个 function 变得很大很臃肿，难以处理

  - 可以将复杂的部分抽出作为独立的 function

- 关心基本功解决问题，不要依赖外部技术解决

  - Junior 阶段，基本功更重要
  - 外部技术解决当前问题可能会带来其他问题

## 4. 从零开始搭建项目

**Dependences**:

- webpack
- webpack-cli
- react
- reack-dom
- babel-loader
- @babel/preset-react

**Steps**:

1. Initialize new project

   ```bash
   npm init -y
   ```

   ```bash
   npm install --save-dev webpack webpack-cli
   ```

   ```bash
   npm install react react-dom
   ```

   ```bash
   npm install --save-dev babel-loader @babel/core @babel/preset-react
   ```

2. Create `webpack.config.js`

   ```js
   // webpack.config.js
   const path = require('path');

   module.exports = {
     entry: './src/index.jsx',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'main.js',
     },
     resolve: {
       extensions: ['.js', '.jsx'],
     },
     module: {
       rules: [
         {
           test: /\.jsx$/,
           exclude: /node_module/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-react'],
             },
           },
         },
       ],
     },
   };
   ```

3. Create `index.js` (entry point)

   ```js
   // src/index.js
   import React from ' react';
   import { createRoot } from ' react-dom/client';
   import App from './App';

   const root = createRoot(document.getElementById('root'));
   root.render(<App />);
   ```

4. Create `App.jsx`

   ```js
   // src/App/App.jsx
   import React from 'react'

   funtion App() {
    return <h1>Hello World</h1>
   }

   export default App
   ```

   ```js
   // src/App/index.js
   export { default } from './App';
   ```

5. Run Webpack with the configuration file and development mode

   ```bash
    npx webpack --config webpack.config.js --mode development
   ```

   Or write this command into the script

   ```json
    <!-- package.json -->
    "scripts": {
        "build": "webpack --config webpack.config.js"
    }
   ```

6. Run the development server

   ```bash
   npm run build --mode=development
   ```
