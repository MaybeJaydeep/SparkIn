// src/App.jsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import AuthorProfile from './pages/AuthorProfile';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
      <Routes>
        {/* Auth routes without sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main app layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="post/:slug" element={<PostPage />} />
          <Route path="author/:username" element={<AuthorProfile />} />
          <Route path="new" element={<NewPost />} />
          <Route path="edit/:slug" element={<EditPost />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}
