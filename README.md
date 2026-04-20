# Team Task Management System

A full-stack **Team Task Management System** with JWT authentication, role-based access (Admin/User), task assignment, and status tracking.

--------------------------------------------------------------------------------------------------------------------

#  Features

# Authentication

* JWT-based login & register
* Role-based access (**Admin / User**)

# Admin

* Create tasks
* Assign tasks to users
* View all tasks & users

# User

* View only assigned tasks
* Update task status (Todo / In Progress / Done)

# Dashboard

* Personalized dashboard (e.g., *Vaishnavi’s Dashboard*)
* Task stats (Total / Completed / Pending)

--------------------------------------------------------------------------------------------------------------------

# Tech Stack

# Frontend

* React (Vite)
* Tailwind CSS
* Fetch API

# Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

--------------------------------------------------------------------------------------------------------------------

# Project Structure

````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
Task_Management_System/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── TaskCard.jsx
│   │   │
│   │   ├── page/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── UserDashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── index.html
│
└── README.md
````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

--------------------------------------------------------------------------------------------------------------------

# Setup Instructions


# 1. Backend Setup

```bash
cd backend
npm install
```

# Create `.env` file

--------------------------------------------------------------------------------------------------------------------
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

# Run backend

```bash
node server.js
# OR
npm run dev
```

---

# 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

--------------------------------------------------------------------------------------------------------------------

# API Endpoints

# Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

# Users

* `GET /api/users`

# Tasks

* `GET /api/tasks`
* `POST /api/tasks`
* `PUT /api/tasks/:id`

--------------------------------------------------------------------------------------------------------------------

# Architecture Overview

# Flow

```
Frontend (React)
      ↓
Fetch API
      ↓
Backend (Express)
      ↓
JWT Middleware (Auth Check)
      ↓
Controllers
      ↓
MongoDB (Database)
```

--------------------------------------------------------------------------------------------------------------------

# Authentication Flow

1. User logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent in headers:

```
Authorization: Bearer <token>
```

5. Backend verifies token => grants access

--------------------------------------------------------------------------------------------------------------------

# Role-Based Access

| Role  | Access              |
| ----- | ------------------- |
| Admin | All tasks + assign  |
| User  | Only assigned tasks |

--------------------------------------------------------------------------------------------------------------------


# Author

Vaishnavi Pol
