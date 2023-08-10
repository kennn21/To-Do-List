# To-Do List API

This To-Do List API is a simple Node.js-based API that allows users to manage tasks on their to-do list. Users can create, read, update, and delete tasks, each with a title, description, due date, status, and category. The app is created using temporary RAM based database (array of tasks).

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create new tasks with titles, descriptions, due dates, statuses, and categories.
- Retrieve a list of all tasks or a specific task by its unique identifier.
- Update task details, including titles, descriptions, due dates, statuses, and categories.
- Delete tasks using their unique identifiers.
- Basic validation to ensure required fields are provided and due dates are valid.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

- Express & Body-Parser: Install Express and body-parser by running this command in the node-rest-api folder: "npm install express body-parser"

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/kennn21/To-Do-List.git
   cd node-rest-api
