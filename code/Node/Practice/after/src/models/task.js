const NotFoundException = require('../exceptions/notFoundException');

const tasks = [
  {
    id: 1,
    name: 'Learn express.js',
    completed: true,
  },
  {
    id: 2,
    name: 'Learn server implementation',
    completed: false,
  },
];
let id = tasks.length + 1;

const getAllTasks = (name, completed) => {
  let result = tasks;
  if (name) {
    result = result.filter((i) =>
      i.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (completed === 'true' || completed === 'false') {
    result = result.filter((i) => i.completed === JSON.parse(completed));
  }
  return result;
};

const getTaskById = (id) => {
  const task = tasks.find((i) => i.id === id);
  if (!task) {
    throw new NotFoundException('task not found');
  }
  return task;
};

const addTask = (name) => {
  const newTask = { id: id++, name, completed: false };
  tasks.push(newTask);
  return newTask;
};

const updateTaskById = (id, { name, completed }) => {
  const task = tasks.find((i) => i.id === id);
  if (!task) {
    throw new NotFoundException('task not found');
  }
  if (name && typeof name === 'string') {
    task.name = name;
  }
  if (completed === true || completed === false) {
    task.completed = completed;
  }
  return task;
};

const deleteTaskById = (id) => {
  const taskIndex = tasks.findIndex((i) => i.id === id);
  if (taskIndex === -1) {
    throw new NotFoundException('task not found');
  }
  tasks.splice(taskIndex, 1);
  return;
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTaskById,
  deleteTaskById,
};
