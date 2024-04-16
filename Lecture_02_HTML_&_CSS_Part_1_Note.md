# <center> Lecture02 HTML & CSS (Part 1) </center>

本篇笔记以 Ally 老师的 Lecture 02 HTML & CSS (Part 1) 为框架，根据 W3School 和 MDN 补充其他常见知识点和难点，旨在辅以 22 期全栈视频，帮助同学建立起基本的学习框架。

欲了解更多实际操作和详细内容，请参考附带的文档。

## <center> 目录 </center>

- [HTML - Hypertext Markup Language](#html---hypertext-markup-language)
  - [1. HTML Introduction](#1html-introduction)
  - [2. HTML Basic Structure and Elements](#2html-basic-structure-and-elements)
  - [3. Comments and HTML Character Entities](#3comments-and-html-character-entities)
  - [4. Lists](#4lists)
  - [5. Table](#5table)
  - [6. Form and interaction](#6form-and-interaction)
  - [7. Block Elements and Inline Elements](#7block-elements-and-inline-elements)

## <center> HTML - Hypertext Markup Language </center>

### 1. HTML Introduction

Reference Document:
[W3School](https://w3schools.com/html),
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)

编写 HTML5 文档注意:

- 遵守 W3C 相关标准
- W3C 提倡内容和结构分离
- HTML 结构具有语义化
  - HTML 机构清晰，易读性和维护性, 便于团队开发和维护
  - 无障碍阅读友好(accessibility)
  - 搜索引擎友好，可根据标签确定上下文和权重，有利于 SEO

> 虽然 HTML 和 CSS 很基本，但面试也有可能会被问到, 更多的是关于 javascript 问题。

现代 Web app 的三大基石 —— HTML, CSS, JavaScript

- HTML 用于构建网页结构
- CSS 用于样式化网页
- JavaScript 是一种脚本语言，用于使网页具有交互性和动态性

> VSCode 是最常用的 editor 并可以安装很多插件  
> 但也可以使用其他 editor

> [VScode 常用插件](https://hackr.io/blog/best-vscode-extensions)

### 2. HTML Basic Structure and Elements

#### 2.1. HTML Basic Structure 基本结构:

```html
<!DOCTYPE html>
<!-- 声明指明文档类型是 HTML5 -->
<html>
  <head>
    <title>我的第一个网页</title>
    <!-- title 是显示在浏览器标签页上的文字，有利于SEO -->
  </head>

  <body>
    <h1>我的第一个网页</h1>
    <p>段落文字</p>
  </body>
</html>

<!-- <head> <title> <body> 标签在一个页面中有且只有一个 -->
```

#### 2.2 Elements 元素

HTML 中，element 是由 tag + content 定义的。例如：

```html
<tagname> Content goes here... </tagname>
```

元素可以按照在网页中的显示方式分为：

- block elements
- inline elements

> 元素的显示方式可以通过 css 进行修改

标签可以分为：

- 成对的标签：opening tag (start tag) + content + closing tag (end tag)， 如：`<p>`content`</p>`
- 单独呈现的标签（自闭合标签）：self-closing tag，如：`<br>`

所有 HTML 元素都可以有属性 Attribute:

- 属性提供有关元素的附加信息
- 属性始终在开始标记（start tag）中指定
- 属性通常以名称/值对（name/value pairs）的形式出现，例如：name="value"，但也有例外
- 属性名通常以小写形式呈现
- 属性值通常使用引号括起来

Example

```html
<html lang="en">
  <!-- html 标签的 lang 属性 -->

  <p style="color:red;">This is a red paragraph.</p>
  <!-- p 及其他标签的 style 属性 -->

  <img src="img_girl.jpg" alt="Girl with a jacket" />
  <!-- img标签的src和alt属性 -->
</html>
```

`<head>` 标签中一般要有的内容：

```html
<head>
  <meta charset="UTF-8" />
  <!--注释： (Unicode Transformation Format - 8-bit) is a variable-length character encoding used to represent the Unicode character set. -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!--注释： Setting the viewport to make your website look good on all devices: -->
  <meta name="keywords" content="测试关键字" />
  <!--注释: Define keywords for search engines: -->
  <meta name="description" content="测试关键字" />
  <!--注释： Define a description of your web page: -->
  <title>Document</title>
</head>
```

`<body>` 标签:

- Body Layout 基本布局：  
  ![HTML Layout](https://www.w3schools.com/html/img_sem_elements.gif)

- Body 中常用布局标签：

```html
<header>
  - Defines a header for a document or a section
  <nav>
    - Defines a set of navigation links
    <section>
      - Defines a section in a document
      <article>
        - Defines an independent, self-contained content
        <aside>
          - Defines content aside from the content (like a sidebar)
          <footer>
            - Defines a footer for a document or a section
            <details>
              - Defines additional details that the user can open and close on
              demand
              <summary>
                - Defines a heading for the
                <details>element</details>
              </summary>
            </details>
          </footer>
        </aside>
      </article>
    </section>
  </nav>
</header>
```

Other Common Elements:

```html
<h1>...</h1>
一级标题
<h2>...</h2>
二级标题
<h3>...</h3>
...
<h4>...</h4>
...
<h5>...</h5>
...
<h6>...</h6>
六级标题

<br />
单标签，换行的标签
<hr />
单标签，水平线标签

<b></b> 加粗 <strong></strong> 加粗，更加语义化

<i></i> 斜体 <em></em> 斜体，更加语义化

<s></s> 删除 <del></del> 删除，更加语义化

<u></u>下划线 <ins></ins> 下划线，更加语义化

<div></div>
没有语义，只是一个盒子 <span></span> 没有语义，只是一个盒子

<img
  src="路径"
  alt="图像的替代文字"
  title="鼠标悬停提示文字"
  width="图像宽度"
  height="图像高度，经常使用auto以自动匹配图像宽度"
/>
图片
<!-- 图片的高度和宽度使用css设置是更好的实践 -->

<a href="路径" target="目标窗口位置">插入连接文本或图像</a>
<!-- 注释
     - <a>标签的作用：
        1.页面间连接
        2.锚链接，用于快速定位到页面中的某个位置，使用 target="#elementId"配合element中的id使用
        3.功能性连接，如emmal


     - alt属性: 图片描述，img加载不出来，告诉它这个图片是干嘛的,


     - target属性：
        _self: 在当前窗口中打开链接（默认行为）。
        _blank: 在新窗口中打开链接。
        _parent: 在父框架中打开链接。
        _top: 在整个窗口中打开链接，忽略所有框架。


     - a标签也可以用于download
    -->
<a href="path/to/your/file.zip">Download File</a>
```

\*更多标签请见 Document
[W3School](https://w3schools.com/html),
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)

#### 2.3 语义化标签 sematic

What are Semantic Elements?

- A semantic element clearly describes its meaning to both the browser and the developer.

Examples of non-semantic elements:

```html
<div>and <span> - Tells nothing about its content.</span></div>
```

Examples of semantic elements:

```html
<form>
  ,
  <table>
    , and
    <article>- Clearly defines its content.</article>
  </table>
</form>
```

### 3.Comments and HTML Character Entities

#### 3.1 Comments:

```html
<!-- 这是一个注释 -->
```

> 可直接使用快捷键生成:
>
> - win: `ctrl + /`
> - mac: `command + /`

#### 3.2 HTML Character Entities

HTML 中的保留字符必须用字符实体替换, 以下为常用的 Entities:

| HTML Entity        | Character | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `<`                | `&lt;`    | less than                          |
| `>`                | `&gt;`    | greater than                       |
| `&`                | `&amp;`   | Ampersand                          |
| `"`                | `&quot;`  | Double quotation mark              |
| `'`                | `&apos;`  | Single quotation mark (apostrophe) |
| Non-breaking space | `&nbsp;`  | Non-breaking space                 |
| ©                  | `&copy;`  | Copyright symbol                   |
| ®                  | `&reg;`   | Registered trademark symbol        |
| ™                  | `&trade;` | Trademark symbol                   |
| ¢                  | `&cent;`  | Cent symbol                        |
| £                  | `&pound;` | Pound sterling symbol              |
| ¥                  | `&yen;`   | Yen symbol                         |
| €                  | `&euro;`  | Euro symbol                        |
| §                  | `&sect;`  | Section symbol                     |
| °                  | `&deg;`   | Degree symbol                      |

### 4. Lists

#### 4.1. ul - 无序列表:

特点：

- 没有顺序，每个 `<li>` 独占一行，块元素
- 默认 `<li>` 标签前面有实心小圆点，可以用 css 去掉
- 一般用于无序类列表如导航，侧边栏，有规律的图文组合等

Example:

```html
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

#### 4.2. ol - 有序列表:

特点：

- 有顺序，每个 `<li>` 独占一行，块元素
- 默认 `<li>` 标签前面有顺序标记，可以用 css 去掉
- 一般用于排序类列表

```html
<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>
```

#### 4.3. dl - 描述列表:

特点：

- 没有顺序，每个`<dt>`;、`<dd>`独占一行，块元素
- 默认没有标记

```html
<dl>
  <dt>Coffee</dt>
  <dd>Black hot drink</dd>
  <dt>Milk</dt>
  <dd>White cold drink</dd>
</dl>
```

### 5.Table

基本结构:

```html
<table>
  <tr>
    <td>第一行第一列</td>
    <td>第一行第二列</td>
  </tr>
  <tr>
    <td>第二行第一列</td>
    <td>第二行第二列</td>
  </tr>
</table>
```

- 推荐使用 css 修改元素

- table 在网页开发中很难调整 responsive design

### 6.Form and Interaction

`form` 是块级元素，主要用于采集和提交用户信息，
实际网页开发中常采用 `post` 方式提交表单数据。

form 的属性：

- method:
- action:

表单基本结构：

```html
<form method="post" action="result.html">
  <label for="name">姓名:</label>
  <input type="text" id="name" name="name" required />

  <label for="email">邮箱:</label>
  <input type="email" id="email" name="email" required />

  <label for="password">密码:</label>
  <input type="password" id="password" name="password" required />

  <label for="gender">性别:</label>
  <input type="radio" id="male" name="gender" value="male" />
  <label for="male">男性</label>
  <input type="radio" id="female" name="gender" value="female" />
  <label for="female">女性</label>

  <label for="country">国家:</label>
  <select id="country" name="country">
    <option value="china" selected="selected">中国</option>
    <option value="usa">美国</option>
    <option value="uk">英国</option>
  </select>

  <label for="message">留言:</label>
  <textarea id="message" name="message" rows="4"></textarea>

  <label for="subscribe">订阅新闻邮件:</label>
  <input type="checkbox" id="subscribe" name="subscribe" value="yes" />

  <input type="reset" id="reset" name="reset" value="重填" />

  <button type="submit">提交</button>
</form>
```

HTML Form 常用 Elements：

```html
<input>
<label>
<select>
<textarea>
<button>
<fieldset>
<legend>
<datalist>
<output>
<option>
<optgroup>
```

HTML Input Types

- type - 指定输入字段的类型。常见取值： "text"、"password"、"checkbox"（复选框）、"radio"（单选按钮）、"submit"、"reset"、"hidden"、"image" 和 "button"等。默认值为"text"。

```html
<input type="button" />
<input type="checkbox" />
<input type="color" />
<input type="date" />
<input type="datetime-local" />
<input type="email" />
<input type="file" />
<input type="hidden" />
<input type="image" />
<input type="month" />
<input type="number" />
<input type="password" />
<input type="radio" />
<input type="range" />
<input type="reset" />
<input type="search" />
<input type="submit" />
<input type="tel" />
<input type="text" />
<input type="time" />
<input type="url" />
<input type="week" />
```

HTML Input Attributes
表单中常用属性:

- name - 用于标识表单元素的名称，以便在提交表单时将数据与字段名称关联。
- value - 用于设置表单元素的初始值。type 为 radio 时必须指定一个值
- size - 指定表单元素的初始宽度。当 type 为 text 或 password 时，编导元素的大小以字符为单位。对于其他类型，宽度以像素为单位。
<!-- 或可见的选项数（对于下拉框）。 -->
- maxlength - type 为 text 或 password 时，输入的最大字符数。
- checked - type 为 radio 或 checkbox 时，用于预先选中复选框或单选按钮。
- autocomplete
- disable
- readonly
- placeholder
- required

Examples：

```html
<input
  type="text"
  id="username"
  name="userName"
  value="用户名"
  size="30"
  maxlength="20"
  required
/>
<textarea></textarea>

复选框 单选框

<form action="" method="post" enctype="multipart/form-data">
  <p>
    <input type="file" name="files" />
    <input type="submit" name="upload" value="上传" />
  </p>
</form>
```

表单提交：

- 通常通过在 submit 属性里写一个 JavaScript function 来进行 API call，从而把表单发送给后端

### 7.Block Elements and Inline Elements

Block Elements:

- A block-level element always starts on a new line, and the browsers automatically add some space (a margin) before and after the element.
- A block-level element always takes up the full width available (stretches out to the left and right as far as it can).

```html
<address> <article> <aside> <blockquote> <canvas> <dd> <div> <dl> <dt> <fieldset> <figcaption> <figure> <footer> <form> <h1>-<h6> <header> <hr> <li> <main> <nav> <noscript> <ol> <p> <pre> <section> <table> <tfoot> <ul> <video>
```

Inline Elements:

- An inline element does not start on a new line.
- An inline element only takes up as much width as necessary.

```html
<a> <abbr> <b> <bdo> <br> <button> <cite> <code> <dfn> <em> <i> <img> <input> <kbd> <label> <map> <object> <output> <q> <samp> <script> <select> <small> <span> <strong> <sub> <sup> <textarea> <time> <tt> <var>
```

> Block Elements 不能放入 Inline Elements 中  
> 除此之外还有通过 css 设置的 inline-block element, 之后会讲

### Homework：registration_form
