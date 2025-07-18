# SparkIn Backend

This is the backend server for the SparkIn blogging platform.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory with the following variables:
```
MONGO_URI=mongodb://localhost:27017/sparkin
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

3. Start the development server:
```bash
npm run dev
```

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

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a post by ID
- `GET /api/posts/slug/:slug` - Get a post by slug
- `POST /api/posts` - Create a new post (requires authentication)
- `PUT /api/posts/:id` - Update a post (requires authentication)
- `DELETE /api/posts/:id` - Delete a post (requires authentication)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:username` - Get a user by username
- `PUT /api/users/:username` - Update a user profile (requires authentication)

### Bookmarks
- `GET /api/users/:username/bookmarks` - Get user's bookmarks
- `POST /api/users/:username/bookmarks` - Create a bookmark
- `DELETE /api/users/:username/bookmarks/:postId` - Delete a bookmark

### Admin
- `GET /api/admin/posts` - Get all posts (admin only)
- `DELETE /api/admin/posts/:id` - Delete a post (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:id` - Delete a user (admin only)
