# Lecture 17 Node Part 4

本篇笔记是以 Mason 老师的 Lecture 17 Node.js (Part 4) 的课堂内容整理的随堂笔记。

## Table of Contents

1. [CORS](#1-cors)
2. [Router](#2-router)
3. [Application Structure](#3-application-structure)
4. [Error Handling](#4-error-handling)
5. [Third-party Package](#5-third-party-package)

## 1. CORS

CORS, or Cross-Origin Resource Sharing, is a security feature implemented in web browsers to control how resources on a web page can be requested from another domain. This mechanism helps to prevent certain types of attacks, such as Cross-Site Request Forgery (CSRF) and Cross-Site Scripting (XSS), by ensuring that only authorized requests are allowed.

Set up Cross-Origin Resource Sharing (CORS) manually:

```js
app.use(cors);

function cors(req, res, next) {
  // domains allowed to access the resource
  res.setHeader('Access-Control-Allow-Origin', '*');
  // headers can be used in the actual request
  res.setHeader('Access-Control-Allow-Headers', '*');
  // the HTTP methods allowed
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
}
```

we can also use the third-party library [cors](https://www.npmjs.com/package/cors) to solve this ploblem

## 2. Router

A router is a **mini-application** capable only of performing middleware and routing functions. It is an essential component that helps you modularize your application by allowing you to define routes in a separate file or module. **This makes your code more organized and maintainable**, especially as your application grows in size and complexity.

**Example**:

```js
// Create a router instance
const express = require('express');
const router = express.Router();

// Deal with get request
router.get('/v1/tasks', (req, res) => {
  ...
});

// Deal with post requres
router.post('/v1/tasks', (req, res) => {
  ...
})

...

// mount the router middleware to the application
app.use(router);
```

## 3. Application Structure

```txt
/--- ROOT level ---/
-- package.json
-- package-lock.json
-- src/
  |-- index.js (app.js, server.js)
  |-- routes/
      |-- index.js
      |-- users.js (users.router.js)
      |-- tasks.js
      |-- otherResources.js
  |-- controllers/
      |-- user.js (user.controller.js)
      |-- task.js
      |-- otherResources.js
  |-- models/ (ORM DB-CRUD)
      |-- user.js (User.js, user.model.js)
      |-- task.js
  |-- middleware/
      |-- cors.js
      |-- parseId.js
  |-- utils/ (common/)
      |-- db connection
      |-- utility / helper methods
```

**Explanation**:

- Root Level

  - `package.json`: Contains metadata about the project and dependencies.
  - `package-lock.json`: Contains the locked versions of dependencies for consistency.

- `src/` Directory

  - `index.js` (or `app.js` or `server.js`): The main entry point of your application where you initialize and start your server.

- `routes/` Directory

  - `users.js` (or `users.router.js`): Handles routing for user-related endpoints.
  - `tasks.js`: Handles routing for task-related endpoints.

- `controllers/` Directory

  - `user.js` (or `user.controller.js`): Contains the logic for user-related operations.
  - `task.js`: Contains the logic for task-related operations.

- `models/` Directory

  - `user.js` (or `User.js`, `user.model.js`): Defines the User model and its CRUD operations.
  - `task.js`: Defines the Task model and its CRUD operations.

- `middleware` Directory

  - This directory contains middleware functions to process requests.

- `utils/` Directory

  - This directory contains utility and helper functions, as well as configurations like database connections.

This structure separates concerns effectively:

- `routes/` handles the HTTP request paths and maps them to controllers.
- `controllers/` contain the business logic and handle the requests from routes.
- `models/` manage the database schemas and operations.

> 💡 还有以下常见的划分方式：

- 小项目：routes 和 controller 合并。
- 大项目：从 controller 里拆分出新的一层 service，将逻辑部分（business logic）放在其中。

另外一种划分（以资源划分）：

```txt
-- src/
    |-- users/
        |-- user.router.js
        |-- user.model.js
        |-- user.controller.js
        |-- ...
```

> 💡 practice 项目的的重新拆分请参考 code 文件夹 [after](https://github.com/australiaitgroup/FullStack-22-Note/tree/29a4498e470cc862e079c9c6dbb2640a8249e0e2/code/Node/Practice/after) 部分

## 4. Error Handling

```txt
|-- exceptions/
    |-- notFoundException.js
|-- middleware
    |-- error
        |-- notFoundError.js
        |-- unknowError.js
```

1. Custom Error Handling

   You can define custom error classes to represent different types of errors

   ```js
   // exceptions/notFoundException.js
   class NotFoundException extends Error {}

   module.exports = NotFoundException;
   ```

2. Error-handling middleware function

   This middleware will be used to detect whether the thrown error is a NotFoundException. If it is, return 404...

   ```js
   // middleware/error/notFoundError.js
   const NotFoundException = require('../../exceptions/notFoundException');

   module.exports = (err, req, res, next) => {
       if (error instanceof NotFoundException) {
           res.status.(404).json({error: err.message})
           return;
       }

       next(err); // Passes the error to the error-handling middleware
   };
   ```

3. Use middleware function

   ```js
   // index.js
   const notFoundError = require('./middleware/error/notFoundError');
   const unknowError = require('./middleware/error/unknowError');

   app.use(notFoundError);
   app.use(unknowError);
   ```

## 5. Third-party Package

- [Helmet](https://www.npmjs.com/package/helmet)

  - securing Express/Connect apps with various HTTP headers

- [dotenv](https://www.npmjs.com/package/dotenv)

  - Used to manage environment variables

- [morgan](https://www.npmjs.com/package/morgan)

  - Used for HTTP request logger
  - Three common used predefined **log formats**

    - `dev` - commonly used for dev environment
    - `tiny` - more concise than `dev`
    - `combined`

  - Dynamically choose the logging format based on the environment variable

    ```js
    app. use(morgan(process.env NODE_ENV === 'dev' ? 'tiny' : 'combined'));|
    ```

- [winston](https://www.npmjs.com/package/winston)

  - logging library, used to create and manage log messages with different levels of severity, formats, and transports.

    ```txt
    |-- utils/
        |-- logger.js
    ```

    ```js
    const winston = require('winston');

    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(), // 输出到console
        new winston.transports.File({ filename: 'combined.log' }), // 创建日志文件
      ],
    });
    ```

    ```js
    const winston = require('winston');

    // filename -> __filename
    const createLogger = (filename) => {
      const logger = winston.createLogger({
        level: 'info', // test -> 'warning' 非test -> 'info'
        defaultMeta: {
          file: path.basename(filename),
        },
        format: winstom.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({timestamp, file, level, message}) => {
                return `[${timestamp}] [${level}] ${file ? `[${[file]}]` : ${message}}`;
            })
        ),
        transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'combined.log' })]
      });
      return logger;
    };
    ```

  - Integrate `morgen` with `winston`

    ```txt
    |-- utils
        |-- morgan.js
        |-- logger.js
    ```

    ```js
    // morgan.js
    const morgan = require('morgan');
    const createLogger = require('./logger');
    const logger = createLogger();

    module.exports = morgan(
      process.env.NODE_ENV === 'dev' ? 'tiny' : 'combined',
      {
        stream: logger.stream,
      }
    );
    ```

    ```js
    // logger.js
    const winston = require('winston');
    const path = require('path');

    // filename -> __filename
    const createLogger = (filename) => {
      const logger = winston.createLogger({
        level: 'info', // test -> 'warning'
        defaultMeta: {
          file: filename ? path.basename(filename) : undefined,
        },
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, file, level, message }) => {
            return `[${timestamp}] [${level}] ${
              file ? `[${file}]` : ''
            }: ${message}`;
          })
        ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: 'logs/info.log',
            level: 'info',
          }),
        ],
      });

      logger.stream = {
        write: (message) => {
          logger.info(message);
        },
      };
      return logger;
    };

    module.exports = createLogger;
    ```

- [cors](https://www.npmjs.com/package/cors)
  - Used to enable Cross-Origin Resource Sharing (CORS)
- Swagger

  - [Swagger Editor](https://editor.swagger.io/)
  - [Swagger jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
  - [Swagger ui express](https://www.npmjs.com/package/swagger-ui-express)

  ```bash
  npm i swagger-jsdoc swagger-ui-express
  ```
