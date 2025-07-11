// src/pages/Home.jsx
import React, { useState } from 'react';

const samplePosts = [
  {
    id: 1,
    title: 'Welcome to SparkIn!',
    description: 'This is your first sample post. Start sharing your thoughts!',
  },
  {
    id: 2,
    title: 'Build with React & Ant Design',
    description: 'Combine modern UI libraries to make your blog shine!',
  },
  {
    id: 3,
    title: 'Responsive Layout Ready',
    description: 'Your sidebar collapses on mobile. Try resizing the screen!',
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = samplePosts.filter((post) =>
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
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Post Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow hover:shadow-md transition-all"
            >
              <h2 className="mb-2 text-xl text-black font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
              <button className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Read More
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
