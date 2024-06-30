# Lecture 23 React Part 7 Thinking in React

本篇笔记以 Zhao Long 老师的 Lecture 23 React (Part 7) 的课堂内容整理的随堂笔记。

## Table of Contents

1. [Thinking in React](#1-thinking-in-react)

   - [1.1 React Developing Procedure](#11-react-developing-procedure)
   - [1.2 Team Work](#12-team-work)
   - [1.3 React Debug](#13-react-debug)

2. [Git and Github](#2-git-and-github)

   - [2.1 Protocol](#21-protocol)
   - [2.2 Product](#22-product)

3. [Supplement](#3-supplement)

## 1. Thinking in React

Application -> Component -> Different State -> State Data Flow -> UI

### 1.1 React Developing Procedure

1. Step 1: Break the UI into a component hierarchy
1. Step 2: Build a static version in React
1. Step 3: Find the minimal but complete representation of UI state
1. Step 4: Identify where your state should live
1. Step 5: Add inverse data flow

### 1.2 Team Work

1. Junior developers dont know if they meet the standards
2. Focus on teamwork rather than nitpicking technical details.

   - Divide into epic, story, and task, and then break it down further for team work

     - **Step 1**: Break the UI into a component hierarchy

       > dont over engineering, Only divide the parts that are about to start development, which typically isn't the entire website.
       >
       > - Question：
       >   - 如果不 over engineering，如何解决在未来中可能存在的可复用组件呢？
       > - Answer:
       >   - readable(through SOLID principle), maintainable, reuseable 以应对以后可能存在的各种情况

       ```
       example:

       - APP
         - Header
           - Logo
           - Button (Post a task)
           - Navigation
           - Authentication
           - Button (become a Tasker)
         - Banner
           - BackgroundImage
           - Button (Post your task)
           - Button (Earn money as a tasker)
           - AirtaskData

       可复用组件：
         Button
       ```

       ```
       From:
         -> Alice: Story 1, Bod: Story 2;

       To:
         -> Alice: Button, Bob: Banner(background image);
         -> Alice: PR for button, Bob: Review, Team: Merge;
         -> Bob: merge main into local branch, use button for Banner;
       ```

       > The salary of a junior developer is half that of a senior developer, but their performance should be at 80% of a senior developer's, 使用无脑的套路

       > When dividing components, don't think about functionality implementation.

     - **Step 2**: Build a static version in React
       - No need for interaction, no need for functionality, only consider styling.
         - CSS + HTML
         - reset: reset-css
         - normalize css: Normalize.css
       - reuse and props
         - 静态区别 (不是有用户交互产生的区别: 使用 props)
           - 内容区别 (props)
           - 样式区别 (props, states)
             - BEN 中的 Modifier
             - 通读并背诵 MUI 的文档（可以死记硬背, 随手能写出来是 senior 的基本功，对于 junior 应该没有 knowledage gap）
               - variant
               - color
               - size
               - isActive
               - isDisabled
               - ... 20 个左右
             - classname 库
         - 动态区别 (使用 state)

### 1.3 React Debug

- learn common bug
  - not defined
  - not found
  - ...

## 2. Git and Github

- Protocol
  - Git
  - SVN
- Product
  - Github
  - Bitbucket
    > Git !== Github

### 3. 补充

> You shouldn't give a black-and-white answer to any interview question; especially you shouldn't directly answer with "no"；

> When writing code as a team, you don't need to consider other people, but you should write readable, maintainable code；

> Some package mentioned：react-icon, classnames；

> When encountering copy and paste, deduplicate it. Aim to implement all reuse in the form of components rather than variables, and ensure that each file contains only one component；

> As a junior developer, you should be able to write code like a senior developer and fully understand the SOLID principles.
