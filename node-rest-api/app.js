const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const { tasks, status } = require('./database') //Get Database Reference

app.use(bodyParser.json());

// Create Task
app.post('/tasks/create', (req, res) => {
  const tasksToCreate = Array.isArray(req.body) ? req.body : [req.body]; // Wrap single task in an array

  const createdTasks = [];

  for (const taskData of tasksToCreate) {
    const { title, description, dueDate, statusId } = taskData;

    if (!title || !description || !dueDate) {
      continue;
    }

    const taskStatus = statusId || 0;

    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      dueDate,
      status: taskStatus
    };

    tasks.push(newTask);
    createdTasks.push(newTask);
  }

  if (createdTasks.length > 0) {
    res.status(201).json(createdTasks);
  } else {
    res.status(400).json({ error: 'No valid tasks were provided.' });
  }
});


// Read All Tasks
app.get('/tasks', (req, res) => {
  try {
    // If tasks were successfully fetched
    res.status(200).json(tasks);
  } catch (error) {
    // If an error occurred
    res.status(500).json({ error: `An error occurred while fetching tasks. ${error}` });
  }
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

  res.status(200).json(tasks[taskIndex]); //Set response to task with status success (200)
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

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Invalid url/endpoints. Please check it again.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
