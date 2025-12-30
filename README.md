# ⚡ SparkIn - Modern Blogging Platform

SparkIn is a modern, feature-rich blogging platform built with React, Node.js, Express, and MongoDB. It provides a seamless experience for content creators and readers alike.

## ✨ Features

### Core Features
- **User Authentication** - Secure login, register, and profile management with JWT
- **Blog Posts** - Create, read, update, and delete blog posts with rich text editing
- **Rich Text Editor** - TipTap-powered editor with markdown support, code blocks, and formatting
- **Search & Filter** - Search functionality for posts and tags
- **Responsive Design** - Mobile-first design that works on all devices
- **Admin Dashboard** - Content moderation and user management
- **Author Profiles** - User profiles with bio, avatar, and social links
- **Comments System** - Interactive commenting on posts
- **Bookmarks** - Save favorite posts for later

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests
- **TipTap** - Rich text editor with extensible features
- **React Toastify** - Toast notifications
- **Heroicons** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **express-rate-limit** - Rate limiting middleware

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MaybeJaydeep/SparkIn.git
cd SparkIn
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Set up environment variables**

Create `backend/.env` file:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/sparkin
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

For production, see `DEPLOYMENT.md` for complete environment setup.

5. **Start the development servers**

**Option A: Run separately**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
cd backend
npm run dev
```

**Option B: Run both together**
```bash
npm run dev:all
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## 📁 Project Structure

```
SparkIn/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   │   ├── AppLayout.jsx  # Main layout wrapper
│   │   ├── PostCard.jsx   # Post card component
│   │   └── ui/            # UI component library
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Homepage with posts list
│   │   ├── Login.jsx      # Login page
│   │   ├── Register.jsx  # Registration page
│   │   ├── NewPost.jsx   # Create post page
│   │   ├── PostPage.jsx   # Single post view
│   │   └── admin/         # Admin pages
│   ├── context/           # React context providers
│   │   └── AuthContext.jsx # Authentication context
│   ├── lib/               # Utility functions
│   ├── api.js             # Axios API client
│   └── main.jsx           # Application entry point
│
├── backend/                # Express server
│   ├── controllers/       # Request handlers
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── userController.js
│   ├── models/           # Mongoose models
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/       # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── config/           # Configuration files
│   ├── services/         # Business logic services
│   └── server.js         # Express app entry point
│
├── public/               # Static assets
├── render.yaml           # Render deployment config
├── vercel.json           # Vercel deployment config
└── package.json          # Frontend dependencies
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/count` - Get total user count

### Post Endpoints
- `GET /api/posts` - Get all posts
- `GET /api/posts/slug/:slug` - Get post by slug
- `POST /api/posts` - Create new post (Protected)
- `PUT /api/posts/:slug` - Update post (Protected)
- `DELETE /api/posts/:slug` - Delete post (Protected)

### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/:username` - Get user by username
- `PUT /api/users/:username` - Update user profile (Protected)

For complete API documentation, see `backend/README.md`.

## 🚢 Deployment

This project is configured for easy deployment:

- **Backend**: Deploy to [Render](https://render.com) using `render.yaml`
- **Frontend**: Deploy to [Vercel](https://vercel.com) using `vercel.json`

See `DEPLOYMENT.md` for detailed deployment instructions.

## 🧪 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

### Database Seeding

To populate the database with sample data:
```bash
cd backend
npm run seed
```

This creates demo users and posts for testing.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by Medium and Dev.to
- Uses open-source libraries and frameworks

---

**Built with ❤️ using React, Node.js, and MongoDB**