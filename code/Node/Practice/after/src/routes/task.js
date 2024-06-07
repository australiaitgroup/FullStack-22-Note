const { Router } = require('express');
const {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require('../controllers/task');
const parseId = require('../middleware/parseId');

const taskRouter = Router();

// 所有以 /v1/tasks 开头的请求
taskRouter.get('/', getAllTasks);
taskRouter.get('/:id', parseId, getTaskById);
taskRouter.post('/', addTask);
taskRouter.patch('/:id', parseId, updateTask);
taskRouter.delete('/:id', parseId, deleteTask);

module.exports = taskRouter;
