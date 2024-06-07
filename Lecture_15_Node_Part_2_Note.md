# Lecture 15 Node Part 2

本篇笔记是以 Mason 老师的 Lecture 15 Node.js (Part 2) 的课堂内容整理的随堂笔记。

参考：

- [Postman Doc](https://learning.postman.com/docs/introduction/overview/)

学习了解好的文档写法：

- [Github](https://docs.github.com/en/rest?apiVersion=2022-11-28)
- [Twilio](https://www.twilio.com/en-us/messaging?cq_plac=&cq_net=g&cq_pos=&cq_med=&cq_plt=gp&utm_source=google&utm_medium=cpc&utm_term=twilio%20api%20calls&utm_campaign=G_S_APAC_Brand_Brand_EN_AU_All&gad_source=1&gclid=EAIaIQobChMI7JWK4-SohgMVbKZmAh1e6gYsEAAYASAAEgLfuvD_BwE)
- [Paypal](https://developer.paypal.com/api/rest/)

Postman 练习：

- [Pocketman](https://pocketmon.fly.dev/)

## Table of Contents

1. [Protocol](#1-protocol)
2. [URL](#2-url-uniform-resource-locator)
3. [HTTP Request](#3-http-request)
4. [HTTP Response](#4-http-response)
5. [Common HTTP Method for CRUD](#5-common-http-method-for-crud)
6. [Common HTTP Headers](#6-common-http-headers)
7. [Common Status Code](#7-common-status-code)
8. [Fire HTTP Request](#8-fire-http-request)
9. [JSON](#9-json)
10. [API](#10-api)
11. [Rest and RESTful API](#11-rest-and-restful-api)
12. [API Authentication and Authorization](#12-api-authentication-and-authorization)
13. [Quiz](#13-quiz)

## 1. Protocol

**TCP** (Transmission Control Protocol) and **UDP** (User Datagram Protocol) are two fundamental protocols used in networking for transmitting data between devices

- **`TCP` (Transmission Control Protocol )**
  - Transport Layer Protocol
  - Establishes a connection between sender and receiver before data transmission begins.
  - Uses a three-way handshake process to establish the connection.
  - Ensures reliable data transfer.
  - Guarantees that data is delivered in the same order it was sent.
  - Retransmits lost packets.
  - Performs error-checking and correction.
- **`UDP` (User Datagram Protocol)**
  - Transport Layer Protocol
  - No need to establish a connection before sending data.
  - Each packet, called a datagram, is sent independently.
  - Does not guarantee delivery, order, or error correction.
  - Packets may arrive out of order, be duplicated, or be lost without any notification to the sender.

> 💡 **TCP** is used when reliable communication is essential, even at the cost of speed. **UDP** is used when speed is essential, and occasional data loss or disorder is acceptable.

- **`IP` (Internet Protocol)**
  - Network Layer Protocol
  - IP protocol divides data into small packets and transmits them as individual units over the network. Each packet includes source and destination addresses, as well as the actual data.
  - It defines how data packets are encapsulated and addressed within the network, enabling them to be transmitted from the source host to the destination host.
  - always used with TCP -> TCP/IP
- **`HTTP` (HyperText Transmission Protocol)**
  - Application Layer Protocol
  - The HyperText Transfer Protocol (HTTP) is a protocol used for transmitting hypermedia documents, such as HTML, across the internet
  - HTTP has 5 versions, the most commonly used version is HTTP/1.1 and HTTP/2.
  - HTTPS (HyperText Transfer Protocol Secure) is an extension of HTTP (HyperText Transfer Protocol) designed to secure data transfer between a client (typically a web browser) and a server.
  - `s` in https -> secure - transport layer security (OSI Model)

> 💡 [Three-way Handshake Process](https://www.geeksforgeeks.org/tcp-3-way-handshake-process/)

## 2. `URL` (Uniform Resource Locator)

![node_api_url](./assets/images/node_api_url.jpg)

**protocal**:

- _**protocal name**_ + `://`
- Example: _*`https://`*_

**auth**:

- Typically shouldn't appear directly in URLs. However, in certain specific scenarios, it can indeed be included in URLs, such as when connecting to databases

  ```bash
  mysql://username:password@hostname:port/database
  ```

- Using auth with url is generally considered insecure
- Using authentication with an IP whitelist is a common security measure that adds an additional layer of protection by allowing access only from specific IP addresses.

**host**:

- Example: `https://www.example.com:8080`
  - `domain` = `example.com`
  - `hostname` = `www.example.com`
  - `host` = `hostname` + `:` + `port` = `www.example.com:8080`
  - `origin` = `protocol` + `host` = `https://www.example.com:8080`

**path**:

- pathname 实际路径
- `search` (query) 查询请求
  - Starts with a `?`
  - Example: `https://www.google.com/search?q=...&rlz=...`
    - `q` is the query param
    - `&` is used to separate multiple query params
    - Each query parameter consists of a key and a value, separated by `=`.
- In RESTful APIs, the path is crucial for defining endpoints and actions.

  ```txt
  GET /api/users          - Retrieves a list of users
  POST /api/users         - Creates a new user
  GET /api/users/123      - Retrieves details of user with ID 123
  PUT /api/users/123      - Updates user with ID 123
  DELETE /api/users/123   - Deletes user with ID 123
  ```

**hash**:

- The hash in URL is used to introduce a fragment identifier, also known as an anchor.
- Used for front-end navigation. It is not involved in back-end processing.
- Typically corresponds to the id attribute of an HTML element

## 3. HTTP Request

- Request Line
  - Request Method
  - URL/URI
  - HTTP version（HTTP/1.1 or HTTP/2 ...）
- Header
  - Provide some additional information about the request, such as the client, the server, the type of content being sent, and more.
  - Case Insensitive
  - Key Value Pair
- Body(optional): data
  - various formats: `JSON`, `XML`, `plain text`, or `form data`

## 4. HTTP Response

- Status Line
  - HTTP Version
    - HTTP/1.1, HTTP/2 ...
  - Status Code
    - Such as `200` for OK, `404` for Not Found ...
  - Reason Phrase
    - meta data: additional information about the server's response
- Headers
- body(optional)
  - similar with request body

## 5. Common HTTP Method for CRUD

- `GET`
  - Read
- `POST`
  - Create
- `PUT`
  - Update
  - Update the entire resource with the data provided in the request
- `PATCH`
  - Update
  - It allows updating only specific fields of the resource rather than replacing the entire resource
- `DELETE`
  - Delete

## 6. Common HTTP Headers

- User-agent: broswer
- Accept: Tell the server what data I can identify as a client; in most cases, we don't need to worry about it.
- Content-Type: tell the reader(server or client) what format the data is
- Content-Length: length of data in body
- Cache-Control
- Cookie:
  - Session ID and other information to store user's behavior, we use Token rather than Cookie
- Authorization: JWT Token
  - 用户状态管理，后面会系详细讲
  - token
    > keyword: Bearer Token, OAuth Token
- Referer: used for Marketing, record where the user come from.

## 7. Common Status Code

- 1xx Protocol Related
- 2xx Success Related
- 3xx Redirection
- 4xx Client Error
- 5xx Server Error

---

- 200 OK
  - The request is OK (this is the standard response for successful HTTP requests)
- 201 Created
  - The request has been fulfilled, and a new resource is created
- 204 No Content
  - The request has been successfully processed, but is not returning any content
  - fetch again if frontend need new data after deleting data from backend
- 400 Bad Request
  - The request cannot be fulfilled due to bad syntax
- 401 Unauthorized
  - The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided
- 403 Forbidden
  - The request was a legal request, but the server is refusing to respond to it
- 404 Not Found
  - The requested page could not be found but may be available again in the future
- 500 Internal Server Error
  - A generic error message, given when no more specific message is suitable
  - in Development Mode, we should replace 500 with 4xx status code to make it more specific
  - in Production Mode, we should use log and monitoring system to record all the 500 status code and replace 500
- 502 Bad Gateway
  - The server was acting as a gateway or proxy and received an invalid response from the upstream server
- 503 Service Unavailable

  - The server is currently unavailable (overloaded or down)

  > 💡 We should avoid returning 500 staus code to users

## 8. fire HTTP Request

- curl
  - `curl -v https://www.google.com`
  - on linus and mac
- broswer
  - dev tool network
  - normally used for frontend development
- postman
  - normally used for backend development

## 9. JSON

**JavaScript Object Notion**

- similar with JavaScript Object, but doesn't support `undefined`

**Structure of JSON**

JSON is built on two structures:

- Objects: A collection of name/value pairs enclosed in curly braces `{}`.
- Arrays: An ordered list of values enclosed in square brackets `[]`.
- All name(key) are surrounded with `""`

**Example**:

```json
{
  "name": "Mason",
  "age": 18,
  "isStudent": false,
  "courses": ["Math", "Science", "Literature"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  }
}
```

![node_json.jpg](./assets/images/node_json.jpg)

## 10. API

- API defines the methods and data structures that developers can use to interact with a service, library, or software component without needing to understand its internal implementation.
- APIs can exist in various forms, including libraries, frameworks, system APIs, web APIs, and simply function calls.
- In general terms, it is a set of clearly defined methods of communication among various components.
- A well-designed API simplifies the process of software development by offering pre-defined building blocks, which developers can assemble to create more complex applications.
- This abstraction and modularization provided by APIs make software development more efficient and manageable.

## 11. REST and RESTful API

REST is an **architectural style** for designing networked applications. It emphasizes a set of constraints to create scalable and stateless web services.

- **Resources**: Everything is a resource identified by a URL (Uniform Resource Locator).
- **Stateless**: Each request from a client to the server must contain all necessary information for the server to understand and process it.
- **HTTP Methods**: Utilizes standard HTTP methods (GET, POST, PUT, DELETE) for CRUD (Create, Read, Update,
  Delete) operations on resources.
- **Representation**: Resources can be represented in various formats like JSON, XML, HTML, etc.
- **Uniform Interface**: A uniform way to interact with resources using standard methods and representations.
- **HATEOAS** (Hypermedia as the Engine of Application State): Resources include links to related resources, allowing clients to navigate the application. 实际开发中不用

**RESTful API**

RESTful API is an API that adheres to the principles of REST. It provides a way for systems to interact over the internet, following REST constraints.
RESTful APIs are a subset of Web APIs

- Web APis can use different architectural styles, but RESTful APis have gained popularity due to their simplicity, scalability, and wide support for various clients.

> 💡 RESTful API 遵循 rest 规范，那么我们可以更容易理解其文档，提升开发效率

**我们课程遵循的 REST（七条）：**

1. versioning 版本

   - 在 url 中加上版本
     - example.com/v1
     - example.com/api/v1
     - v1.example.com/api
     - api.example.com/v1
   - 旧版本不再维护时，通知用户及时更新

2. 用名词来描述资源，同时使用复数形式

   - /api/v1/users
   - /api/v1/notes

3. 使用恰当的 http method 来描述操作

   - 获取数据 -> GET
   - 添加 -> POST

4. 在 url 上，**可以选择**使用嵌套形式来定位资源

   - /api/v1/users/{userId}/notes
   - /api/v1/useers/:userId/notes

5. 使用对应的 http status code 来表示请求的结果

6. 注意返回数据的大小，尽量进行分页操作

   - GET /api/v1/users 返回了 10，000 条数据
   - 我们分成 1000 页，每页 10 个数据
     - GET /api/v1/users?page=1&pageSize=10
     - GET /api/v1/users?page=2&pageSize=10

7. 返回可读的错误信息
   - 400 body: {bady request} 不明确的错误信息
   - 400 body: {error: wrong username}

### Other web APIs

> 💡 了解即可

SOAP (Simple Object Access Protocol)

- is a protocol for exchanging structured information in the implementation of web services. SOAP APls use XML-based messages for communication and can be more rigid and complex compared to RESTful APIs.

GraphQL

- is a query language for APIs that allows clients to request exactly the data they need, and nothing more. It provides a flexible and efficient way to retrieve and manipulate data.

WebSocket

- is a communication protocol that provides full-duplex communication channels over a single TCP connection. It's used for real-time interactive applications.

gRPC

- is an open-source framework developed by Google that enables efficient communication between distributed systems. It uses the HTTP/2 protocol for transport and Protocol Buffers (protobufs) for serialization, providing high-performance and language-agnostic communication.

## 12. API Authentication and Authorization

Authentication: (who are you)

- It is the process of verifying the identity of a user or application attempting to access an API.
- It ensures that the requester is who they claim to be.

Authorization: (What you can do)

- It is the process of determining whether an authenticated user or application has permission to access specific resources or perform certain actions.
- It defines what actions are allowed for authenticated users.

**Sequence Diagram**:

![node_token](./assets/images/node_token.jpg)

## 13. Quiz

Use **Postman** to practice API calls to **newsapi.org**

Read the [docs](https://newsapi.org/docs)
And complete the following tasks:

1. Headline news from Australia, technology category, about Apple
2. First 10 news related to 'migration' from ABC News Australia, sorted by relevancy
