# To-Do List Backend API

A comprehensive Node.js backend application for managing to-do tasks with user authentication, task categorization, and advanced filtering capabilities.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Complete CRUD operations for tasks
- **Task Categorization**: Organize tasks by categories (Work, Personal, Shopping, etc.)
- **Status Management**: Mark tasks as completed or pending
- **Search & Filtering**: Search tasks by title/description and filter by status, category, or due date
- **Secure API**: JWT-based authentication for all protected routes

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcrypt for password hashing
- **Validation**: Input validation and error handling

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone [your-github-repo-url]
   cd todo-backend-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/todoapp
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**: Returns JWT token for authentication

### Task Management Endpoints

> **Note**: All task endpoints require JWT token in Authorization header: `Bearer <token>`

#### Create Task
- **POST** `/api/tasks`
- **Body**: 
  ```json
  {
    "title": "Complete project",
    "description": "Finish the backend API development",
    "dueDate": "2025-06-25T10:00:00Z",
    "category": "Work",
    "status": "pending"
  }
  ```

#### Get All Tasks
- **GET** `/api/tasks`
- **Query Parameters**:
  - `status`: `completed` or `pending`
  - `category`: Filter by category name
  - `dueDate`: Filter by due date
  - `sort`: Sort by `dueDate`, `createdAt`, or `updatedAt`

#### Get Single Task
- **GET** `/api/tasks/:taskId`

#### Update Task
- **PUT** `/api/tasks/:taskId`
- **Body**: Any combination of task fields to update

#### Delete Task
- **DELETE** `/api/tasks/:taskId`

### Task Status Management

#### Mark Task as Completed
- **POST** `/api/tasks/:taskId/markCompleted`

#### Mark Task as Pending
- **POST** `/api/tasks/:taskId/markPending`

### Task Categorization

#### Get Tasks by Category
- **GET** `/api/tasks/category/:category`

### Search & Filtering

#### Search Tasks
- **GET** `/api/tasks/search`
- **Query Parameters**:
  - `q`: Search query (searches in title and description)

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  passwordHash: String,
  createdAt: Date
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref to users),
  title: String,
  description: String,
  dueDate: Date,
  status: String (enum: 'completed', 'pending'),
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

The repository includes a comprehensive Postman collection with all API endpoints and sample requests. Import the collection file into Postman for easy testing.

### Sample Test Flow:
1. Register a new user
2. Login to get JWT token
3. Create several tasks with different categories
4. Test filtering and search functionality
5. Update task statuses
6. Test all CRUD operations

## 🔐 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes middleware
- Input validation and sanitization
- Error handling with appropriate HTTP status codes

## 📁 Project Structure

```
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
├── postman/             # Postman collection
├── .env.example         # Environment variables template
├── package.json
└── README.md
```

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Heroku
- Vercel
- AWS EC2
- DigitalOcean

Make sure to set up environment variables in your deployment platform.

## 📝 Notes

- All timestamps are stored in UTC
- Task status updates are handled atomically
- Database indexes are implemented for optimal query performance
- Comprehensive error handling and validation

## 📧 Contact

For any questions regarding this implementation, please contact:
- Email: fayis.connect@gmail.com

---

**Developed by Fayis N for Exelon Circuits Backend Developer Position**