const { Router } = require('express');
const taskRouter = require('./task');

const v1Router = Router();
// 所有以 /v1 开头的请求
v1Router.use('/tasks', taskRouter);

module.exports = v1Router;
