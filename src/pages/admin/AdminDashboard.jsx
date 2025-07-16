// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, axiosAuth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }

    const fetchPosts = async () => {
      try {
        const res = await axiosAuth.get('/api/admin/posts');
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [user]);

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosAuth.delete(`/api/admin/posts/${slug}`);
      setPosts(posts.filter(post => post.slug !== slug));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <table className="w-full table-auto border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id} className="border-t border-gray-700">
              <td className="p-3">{post.title}</td>
              <td className="p-3">{post.author?.username || 'N/A'}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => navigate(`/posts/${post.slug}/edit`)}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
