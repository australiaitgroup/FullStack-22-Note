# Lecture 21 Node Part 7

本篇笔记是以 Mason 老师的 Lecture 21 Node.js (Part 7) 的课堂内容整理的随堂笔记。

## Table of Contents

1. [CMS Practice](#1-cms-practice)

   - [1.1 Model](#11-model)
   - [1.2 Error Handling](#12-error-handling)
   - [1.3 Relation: Reference and Bidirectional Binding](#13-relation-reference-and-bidirectional-binding)
   - [1.4 Pagination](#14-pagination)

## 1. CMS Practice

> Continued from the previous course
> Repo: [source code](https://github.com/LazeBear/jr-fullstack-notes-22/tree/master/jr-cms)

### 1.1 Model

- MongoDB generates ObjectId type `_id` automatically.
  - But it is possible to change the datatype or use alias (although not recommended).
    ```js
    _id: {
      type: String, // not recommended
      alias: 'code' // not recommended
    }
    ```
  - It is still recommended to keep the `_id` as ObjectId type.
- `uppercase: true,` (not recommended)
- Data Validation

  - Simple MongoDB Validation
    - `required: true,`
    - default value: `default: true,`
    - minimum length: `minLength`
  - Complicated Validation

    - `customised validator function`

      ```js
      // example:
      validate: [
        {
          validator: (email) => {
            // Implement email validation logic here
            // Return true if the email is valid, false otherwise
            // you can:
            // 1. use regex to validate - always need to learn and not use often
            //                          - better to google
            // 2. use validation library - Joi:
            //                             - can set up Schema in Joi,
            //                             - can be use on both frontedn and backend
            //                               - write once use twice
            //                           - Yup
            //                           - validator.js
          },
          msg: 'invalid email format', // Error message when validation fails
        },
      ];
      ```

### 1.2 Error Handling

#### 1.2.1 Different Error handling methods

1. Callback(not used anymore because of callback hell)

```js
Course.find().exec((err, courses) => {
  if (err) {
    next(err);
    // or return res.status(500).json({error: 'error'});
  }
});
```

2. Promise

```js
Course.find()
  .exec()
  .then((courses) => {})
  .catch((error) => {});
```

3. Async Await

```js
try {
  const courses = await Course.find().exec();
  res.json(courses);
} catch (e) {
  next(e);
  // or return res.status(500).json{error: 'error'};
}
```

```js
// try catch wrapper function can help to avoid repetitive use of try-catch.

function catchAllErrors() {
  return (req, res, next) => {
    try {
      routeHandler(req, res, next);
    } catch (e) {
      next(e);
      // or return res.status(500).json{error: 'error'};
    }
  };
}

router.get('/', catchAllErrors(getAllCourses));

// There is also a package: express-async-errors.
// However, manually writing `try(){} catch(){}` blocks is more suitable when combined with a logger.
```

#### 1.2.2 Add Error Handling Middleware

- Such as `validationError.middleware.js`
- Because the service cannot access the req and res objects, the best approach when encountering errors is to throw an error, and then use Error Handling Middleware for validation.

### 1.3 Relation: Reference and Bidirectional Binding

- for example student and course
  - The existence of both student and course must be checked first.
- Large-scale projects use transactions.
- Using `populate()` to associate data.
  - You can also perform secondary `populate()`.
- cascade delete

### 1.4 Pagination

#### 1.4.1 `limit()` and `skip()`

- `limit()`:
  - The `limit()` method is used to restrict the number of documents returned by a query.
- `skip()`:
  - The `skip()` method is used to skip a specified number of documents and return the remaining documents.
- **Code Example**:

```js
db.articles.find().skip(10).limit(10);
```

#### 1.4.2 Infinite Scrolling and Pagination

- Infinite Scrolling:
  - When handling infinite scrolling on the backend, it is typically necessary to dynamically load more data based on client requests and send it back to the client for display.
- Pagination:
  - return number of document to calculate page number by page size.
