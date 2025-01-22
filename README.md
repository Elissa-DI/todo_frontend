# Todo Frontend

Welcome to the Todo Frontend application, a robust solution for managing your tasks efficiently. This application is built using modern tools and libraries, including ShadCN, Tailwind CSS, React, Vite, and Redux.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Features](#features)
- [Tech Stack](#tech-stack)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js**: You need to have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is included with Node.js. Ensure you have the latest version by running `npm install -g npm`.

## Getting Started

### Clone the Repository
To get started, clone the repository from GitHub using the following command:
```bash
git clone https://github.com/Elissa-DI/todo_frontend.git
```
Navigate into the project directory:
```bash
cd todo_frontend
```

### Install Dependencies
Install the necessary dependencies by running:
```bash
npm install
```

### Run the Development Server
Start the development server with:
```bash
npm run dev
```
The application will be available at [http://localhost:5173/](http://localhost:5173/).

## Features
### Authentication
- **Login**: Users can log in to the application using their credentials. Upon successful login, the user will be redirected to the home page to manage their todos.
- **Register**: New users can register for an account by providing their details. Upon successful registration, they will be redirected to the login page.

### Todo Management
- **View Todos**: Users can view a list of todos specific to their account. Each todo displays its title and completion status.
- **Add Todo**: Users can create a new todo by providing a title and optional details. The new todo will be added to their personal list.
- **Edit Todo**: Users can edit an existing todo, including updating the title, details, or completion status.
- **Delete Todo**: Users can delete any of their existing todos.

## Tech Stack
This project utilizes the following technologies:
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast development build tool.
- **Tailwind CSS**: A utility-first CSS framework.
- **Redux**: A state management library for managing global app state.
- **ShadCN**: A collection of components styled with Tailwind CSS for rapid development.
