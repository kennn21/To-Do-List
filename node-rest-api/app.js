const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const { tasks, status } = require('./database') //Get Database Reference

app.use(bodyParser.json());

// Create Task
app.post('/tasks/create', (req, res) => {
  const { title, description, dueDate, statusId } = req.body;

  if (!title || !description || !dueDate) { //Validation
    return res.status(400).json({ error: 'Title, description, and due date are required fields.' }); //Error handling
  }

  const taskStatus = statusId || 0

  const newTask = { //defining new task object and assigning the data
    id: tasks.length + 1,
    title,
    description,
    dueDate,
    status: taskStatus
  };

  tasks.push(newTask); //add new task to database
  res.status(201).json(newTask);
});

// Read All Tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Read Specific Task
app.get('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found.' });
  }
});

// Update Task
app.put('/tasks/update/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const { title, description, dueDate, status } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks[taskIndex] = { //Update task with new data, if no data, then don't update it
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    dueDate: dueDate || tasks[taskIndex].dueDate,
    status: status || tasks[taskIndex].status
  };

  res.json(tasks[taskIndex]); //Get Task by Id
});

// Delete Task
app.delete('/tasks/delete/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json(deletedTask);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
