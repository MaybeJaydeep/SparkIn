// src/pages/BlogFeed.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogFeed() {
  // Example posts
  const posts = [
    { title: 'First Post', slug: 'first-post', excerpt: 'This is an excerpt...' },
    { title: 'Second Post', slug: 'second-post', excerpt: 'Another snippet...' },
  ];

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <Link
            key={post.slug}
            to={`/post/${post.slug}`}
            className="block border border-gray-300 dark:border-gray-700 p-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
