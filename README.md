# TaskMate App

TaskMate is a productivity application designed to help users manage tasks efficiently. It provides features like user authentication, task creation, and task management, offering a user-friendly interface and secure backend functionality.

---

## Features

- User registration and login with JWT-based authentication.
- Create, view, update, and delete tasks.
- Persistent storage of user and task data.
- Cookie-based authentication for seamless user sessions.

---

## Tech Stack

### Frontend
- React
- TypeScript
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB
- JWT
- Zod
- Cookie-Parser

---

## Folder Structure
```

TaskMate/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── taskController.ts
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Task.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── taskRoutes.ts
│   │   ├── utils/
│   │   │   ├── db.ts
│   │   ├── server.ts
│   │   ├── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── SignUp.tsx
│   │   │   ├── Dashboard.tsx
│   │   ├── App.tsx
│   │   ├── index.tsx
└── README.md

```





## Scripts to Start TaskMate

### Backend
Navigate to the `backend` directory and install the dependencies first:

```bash
cd backend
npm install

# For development mode with auto-restart
npm run dev

# For production mode
npm start

```

### Frontend

Navigate to the frontend directory and install the dependencies:

``` bash
cd frontend
npm install
npm run dev
```

## API Reference

## TaskMate App: Endpoints Overview

### Backend Endpoints
| *HTTP Method* | *Endpoint*        | *Description*                 | *Input*                                                                 | *Output*                                       |
|------------------|---------------------|---------------------------------|--------------------------------------------------------------------------|-------------------------------------------------|
| `POST`          | `/auth/register`    | Register a new user             | `{ email: string, password: string }`                                    | `201 Created` or `400 Bad Request`              |
| `POST`          | `/auth/login`       | Login an existing user          | `{ email: string, password: string }`                                    | `200 OK` or `401 Unauthorized`                  |
| `POST`          | `/auth/logout`      | Logout the user                 | None                                                                     | `200 OK` or `500 Internal Server Error`         |
| `GET`           | `/tasks`            | Fetch all tasks                 | Headers: `authToken`                                                     | Array of tasks or `401 Unauthorized`            |
| `POST`          | `/tasks`            | Create a new task               | `{ title: string, description: string }`                                 | `201 Created` or `400 Bad Request`              |
| `PUT`           | `/tasks/:taskId`    | Update an existing task         | `{ title?: string, description?: string, completed?: boolean }`          | `200 OK` or `404 Not Found`                     |
| `DELETE`        | `/tasks/:taskId`    | Delete a specific task          | None                                                                     | `200 OK` or `404 Not Found`                     |

---

### Frontend Routes
| *Route*          | *Description*                 | *Protected* |
|---------------------|---------------------------------|---------------|
| `/`                | Landing page                   | No            |
| `/login`           | User login page                | No            |
| `/signup`          | User registration page         | No            |
| `/dashboard`       | User dashboard with task list  | Yes           |