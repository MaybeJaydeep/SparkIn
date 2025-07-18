# SparkIn - Modern Blogging Platform

SparkIn is a modern, feature-rich blogging platform built with React, Node.js, Express, and MongoDB. It provides a seamless experience for content creators and readers alike.

## Features

- User authentication (login, register, profile management)
- Create, read, update, and delete blog posts
- Rich text editor with formatting options
- Search functionality for posts and tags
- Responsive design for all devices
- Admin dashboard for content moderation
- Author profiles and post management

## Tech Stack

### Frontend
- React 19
- React Router v7
- Tailwind CSS v4
- Vite
- Axios for API requests
- TipTap for rich text editing
- React Toastify for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/sparkin.git
cd sparkin
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Set up environment variables
   - Copy `.env.example` to `.env` in the backend directory
   - Update the variables with your MongoDB URI and JWT secret

5. Start the development servers

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## Project Structure

- `/src` - Frontend React application
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/context` - React context providers
  - `/lib` - Utility functions and helpers
- `/backend` - Express server
  - `/controllers` - Request handlers
  - `/models` - Mongoose models
  - `/routes` - API routes
  - `/middleware` - Custom middleware

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
