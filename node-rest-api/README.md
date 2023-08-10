# To-Do List API

## Table of Contents

- [API Endpoints](#api-endpoints)
  - [Create Task](#create-task)
  - [Read All Tasks](#read-all-tasks)
  - [Read Specific Task](#read-specific-task)
  - [Update Task](#update-task)
  - [Delete Task](#delete-task)
- [Data Structure](#data-structure)
- [Operations Flow](#operations-flow)
  - [Creating a Task](#creating-a-task)
  - [Updating a Task](#updating-a-task)
  - [Deleting a Task](#deleting-a-task)
  - [Invalid Input Handling](#invalid-input-handling)
- [Pseudocode](#pseudocode)
- [Conclusions](#conclusions)


## API Endpoints

### Create Task

- **Endpoint:** `POST /tasks`
- **Description:** Create a new task with details.
- **Request Body:** JSON containing task details (title, description, due date, status index).
- **Response:** JSON containing the newly created task.

### Read All Tasks

- **Endpoint:** `GET /tasks`
- **Description:** Retrieve a list of all tasks.
- **Response:** JSON array containing all tasks.

### Read Specific Task

- **Endpoint:** `GET /tasks/:taskId`
- **Description:** Retrieve details of a specific task.
- **Response:** JSON containing the details of the specific task.

### Update Task

- **Endpoint:** `PUT /tasks/:taskId`
- **Description:** Update task details.
- **Request Body:** JSON containing updated task details.
- **Response:** JSON containing the updated task.

### Delete Task

- **Endpoint:** `DELETE /tasks/:taskId`
- **Description:** Delete a task.
- **Response:** JSON confirming the deletion.

### Invalid input Handling
- **Endpoint:** `ANY /{invalid}`
- **Description:** Returns error message for invalid endpoint.
- **Response:** JSON containing a 404 error message.

## Data Structure

Tasks are structured as objects within an array (temporary) to simulate an actual database table. Each task object includes properties such as `id`, `title`, `description`, `dueDate`, and `status`

```json
[
  {
    "id": 1,
    "title": "Sample Task",
    "description": "This is a sample task.",
    "dueDate": "2023-08-31",
    "status": 0 //0 or 1, defaults to 0
  },
]
```

Status are structure as strings within an array (temporary) to simulate an actual database table for foreign key / SQL joins purposes.

```js
const status = ["not completed", "completed"]
```

## Operations Flow

### Creating a Task

1. Parse incoming JSON request body.
2. Validate required fields (title, description, dueDate).
3. Map status index to corresponding status string.
4. Create a new task object with provided details.
5. Add the task to the tasks array.
6. Respond with the newly created task object.

### Updating a Task

1. Parse incoming JSON request body.
2. Parse the `taskId` parameter from the request.
3. Find the task to be updated based on `taskId`.
4. Update task properties with provided values.
5. Respond with the updated task object.

### Deleting a Task

1. Parse the `taskId` parameter from the request.
2. Find the index of the task with the matching ID in the tasks array.
3. Remove the task from the tasks array.
4. Respond with a JSON confirmation of the deletion.


## Pseudocode

```
{url}/tasks/create //POST
  insert req.body to tasks "table" in db
  return success

{url}/tasks //GET
  get tasks from db
  return tasks,success
  else
  return error

{url}/tasks/:taskId //GET
  get task by id taskId from db
  return task, success
  else
  return error

{url}/tasks/update/:taskId //PUT
  get task by id taskId from db
  assign new data(if any) from req.body to task
  push the updated task back into db (update)
  return task, success
  else
  return error

{url}/tasks/delete/:taskId //DELETE
  get task by id taskId from db
  delete task
  return task, success
  else
  return error

{url}/{non-existing endpoint} //ANY
  return 404, error

```

## Conclusion

This To-Do List API created using node.js and express is designed to provide a set of endpoints for managing tasks in applications(front-end). By structuring tasks as objects in an array (temporary) and following a consistent operations flow, users can efficiently create, read, update, and delete tasks to manage their to-do lists effectively and easily.