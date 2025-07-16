// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts:", err);
        setPosts([]); // Don't use fallback mockups anymore
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          ⚡ Welcome to SparkIn!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Explore insightful posts & share your ideas with the world.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Post Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link
              to={`/post/${post.slug}`}
              key={post._id}
              className="rounded-lg border border-gray-700 bg-gray-900 p-6 shadow hover:shadow-lg transition-all hover:border-blue-600"
            >
              <h2 className="mb-2 text-xl font-semibold text-white">{post.title}</h2>
              <p className="text-gray-400">
                {post.description || post.content?.slice(0, 150) + '...'}
              </p>
              <span className="mt-4 inline-block text-sm text-blue-400 hover:underline">
                Read More →
              </span>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400">No posts found.</p>
        )}
      </div>
    </div>
  );
}
