# 🔧 SparkIn Backend API

This is the backend server for the SparkIn blogging platform, built with Express.js and MongoDB.

## 📋 Getting Started

### Prerequisites
- Node.js v18 or higher
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create a `.env` file** in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/sparkin
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

**For production**, generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. **Start the development server:**
```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`).

## Seeding Demo Data

To populate your database with demo users and posts, run:

```bash
npm run seed
```

This will create:
- 5 users (including 1 admin)
- 6 blog posts
- Random bookmarks for each user

### Demo User Credentials

| Username   | Email             | Password    | Role  |
| ---------- | ----------------- | ----------- | ----- |
| admin1     | admin@sparkin.com | admin123    | admin |
| johndoe    | john@example.com  | password123 | user  |
| janedoe    | jane@example.com  | password123 | user  |
| techguru   | tech@example.com  | password123 | user  |
| codemaster | code@example.com  | password123 | user  |

## 📡 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/count` | Get total user count | No |

**Request Body (Register/Login):**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username" // Register only
}
```

### Posts (`/api/posts`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts (sorted by date) | No |
| GET | `/api/posts/slug/:slug` | Get post by slug | No |
| POST | `/api/posts` | Create a new post | Yes |
| PUT | `/api/posts/:slug` | Update post (author only) | Yes |
| DELETE | `/api/posts/:slug` | Delete post (author only) | Yes |

**Request Body (Create/Update):**
```json
{
  "title": "Post Title",
  "content": "Post content...",
  "tags": ["tag1", "tag2"]
}
```

### Users (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | No |
| GET | `/api/users/:username` | Get user by username | No |
| PUT | `/api/users/:username` | Update user profile | Yes (own profile) |

### Bookmarks (`/api/users/:username/bookmarks`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/:username/bookmarks` | Get user's bookmarks | No |
| POST | `/api/users/:username/bookmarks` | Create a bookmark | Yes |
| DELETE | `/api/users/:username/bookmarks/:postId` | Delete a bookmark | Yes |

### Comments (`/api/comments`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/comments/post/:postId` | Get comments for a post | No |
| POST | `/api/comments` | Create a comment | Yes |
| DELETE | `/api/comments/:id` | Delete a comment | Yes |

### Admin (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/posts` | Get all posts | Yes (Admin) |
| DELETE | `/api/admin/posts/:id` | Delete any post | Yes (Admin) |
| GET | `/api/admin/users` | Get all users | Yes (Admin) |
| DELETE | `/api/admin/users/:id` | Delete any user | Yes (Admin) |

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Tokens are valid for 30 days and are returned upon successful login/registration.

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS Protection** - Configurable allowed origins
- **Helmet** - Security headers
- **Input Validation** - Mongoose schema validation
- **Error Handling** - Centralized error handling middleware
