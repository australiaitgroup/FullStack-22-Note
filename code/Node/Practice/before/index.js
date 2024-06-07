const express = require('express');

const app = express();
app.use(express.json());

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

// 1. 获取所有的 tasks
//    GET /v1/tasks
//    Route param: N/A
//    query param: {name, completed}
//    body: N/A
//    Response status code: 200
//    Response body: {data:[{id, name, completed}]}
app.get('/v1/tasks', (req, res) => {
  const { name, completed } = req.query;
  let result = tasks;
  if (name) {
    result = result.filter((i) =>
      i.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (completed === 'true' || completed === 'false') {
    result = result.filter((i) => i.completed === JSON.parse(completed));
  }
  res.json({ data: tasks });
});

// 2. 添加一个 task
//    POST /v1/tasks
//    Route param: N/A
//    query param: N/A
//    body: {name}
//    Response status code: 201 / 400
//    Response body: {data:{id, name, completed}} / {error: "name is not valid"}
app.post('/v1/tasks', (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name is not valid' });
  }

  const newTask = { id: id++, name: name, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 3. 更新一个 task
//    PATCH /v1/tasks/:id
//    Route param: id
//    query param: N/A
//    body: {name, completed}
//    Response status code: 200 / 400 / 404
//    Response body: {data:{id, name, completed}} / {error: "completed type is incorrect, expecting boolean"} / {error:"task not found"}
app.patch('/v1/tasks/:id', parseId, (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;
  const task = tasks.find((i) => i.id === id);
  if (!task) {
    res.status(404).json({ error: 'task not found' });
    return;
  }
  if (name && typeof name === 'string') {
    task.name = name;
  }
  if (completed === true || completed === false) {
    task.completed = completed;
  }
  res.json({ data: task });
});

// 4. 删除一个 task
//    DELETE /v1/tasks/:id
//    Route param: id
//    query param: N/A
//    body: N/A
//    Response status code: 204 / 404
//    Response body: "no content" / {error:"task not found"}
app.delete('/v1/tasks/:id', parseId, (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((i) => i.id === id);
  if (taskIndex === -1) {
    res.status(404).json({ error: 'task not found' });
    return;
  }
  tasks.splice(taskIndex, 1);
  res.sendStatus(204);
});

// 5. 获取一个 task
//    GET /v1/tasks/:id
//    Route param: id
//    query param: N/A
//    body: N/A
//    Response status code: 200 / 404
//    Response body: {data:{id, name, completed}} / {error:"task not found"}
router.get('/v1/tasks/:id', parseId, (req, res) => {
  const { id } = req.params;
  const task = tasks.find((i) => i.id === id);
  if (!task) {
    res.status(404).json({ error: 'task not found' });
    return;
  }
  res.json({ data: task });
});

app.use(router);

app.listen(3000, () => {
  console.log('server listerning at port 3000');
});

// DRY do not repeat yourself
function parseId(req, res, next) {
  const { id } = req.params;
  req.params.id = Number(id);
  next();
}
