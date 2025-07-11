// src/pages/AuthorProfile.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AuthorProfile() {
  const author = {
    name: "Jaydeep Badal",
    bio: "Professional web developer, gamer, and data science enthusiast. Sharing ideas about React, AI, and modern web.",
    avatar:
      "https://avatars.githubusercontent.com/u/0000000?v=4", // Replace with your avatar URL
    social: {
      github: "https://github.com/yourusername",
      twitter: "https://twitter.com/yourusername",
    },
    posts: [
      {
        title: "Dark Mode Design in React",
        slug: "/post/dark-mode-react",
        excerpt: "Learn how to build a beautiful dark mode experience in React with Tailwind and Ant Design.",
        date: "July 5, 2025",
      },
      {
        title: "Getting Started with Tailwind CSS",
        slug: "/post/tailwind-start",
        excerpt: "A quick guide to Tailwind CSS and setting it up in your React project.",
        date: "June 21, 2025",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-center mb-8">
        <div className="bg-gradient-to-tr from-primary-500 to-purple-600 p-1 rounded-full">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-24 h-24 rounded-full border-4 border-gray-900"
          />
        </div>
        <div className="sm:ml-6 text-center sm:text-left mt-4 sm:mt-0">
          <h1 className="text-3xl font-bold text-white">{author.name}</h1>
          <p className="text-gray-400 mt-2 max-w-md">{author.bio}</p>
          <div className="flex space-x-4 mt-4 justify-center sm:justify-start">
            {author.social.github && (
              <a
                href={author.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition"
              >
                <i className="fab fa-github"></i> GitHub
              </a>
            )}
            {author.social.twitter && (
              <a
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Posts by author */}
      <div className="fade-in">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Posts by {author.name}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {author.posts.map((post) => (
            <Link
              key={post.slug}
              to={post.slug}
              className="block p-5 border border-gray-700 rounded-xl hover:border-primary-500 transition transform hover:-translate-y-1 bg-gray-900"
            >
              <h3 className="text-xl text-white font-bold">{post.title}</h3>
              <p className="text-gray-400 text-sm">{post.date}</p>
              <p className="text-gray-300 mt-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
