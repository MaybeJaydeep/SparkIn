// src/pages/NewPost.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import api from "@/api";
import {
  DocumentTextIcon,
  TagIcon,
  PencilIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";

export default function NewPost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!user) {
      alert("You must be logged in to create a post.");
      return;
    }

    try {
      setSaving(true);

      const res = await api.post("/posts", {
        title,
        tags: tags.split(",").map((t) => t.trim()).filter(t => t),
        content,
      });

      alert("Post created successfully!");
      console.log("[NewPost] Created:", res.data);

      // Navigate to the new post
      navigate(`/post/${res.data.slug}`);
    } catch (err) {
      console.error("[NewPost] Failed:", err);
      alert("Failed to create post. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
          Create New Post
        </h1>
        <p className="text-gray-400">
          Share your thoughts, ideas, and insights with the community.
        </p>
      </div>

      {/* Create Form */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-white font-medium mb-2 flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-blue-400" />
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              required
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label htmlFor="tags" className="block text-white font-medium mb-2 flex items-center gap-2">
              <TagIcon className="w-5 h-5 text-green-400" />
              Tags (comma separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="technology, coding, web development"
              className="w-full p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-white font-medium mb-2 flex items-center gap-2">
              <PencilIcon className="w-5 h-5 text-purple-400" />
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={15}
              className="w-full p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono"
              required
            />
            <p className="text-gray-400 text-sm mt-2">
              Write your content in plain text format.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors shadow-md flex items-center gap-2 ${saving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-4 h-4" />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden p-6">
          <h1 className="text-2xl font-bold text-white mb-4">{title || "Post Title"}</h1>
          {tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.split(",").map((tag, index) => (
                tag.trim() && (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                  >
                    <TagIcon className="w-3 h-3" />
                    {tag.trim()}
                  </span>
                )
              ))}
            </div>
          )}
          <div className="prose prose-invert prose-sm max-w-none">
            {content ? (
              <div className="whitespace-pre-wrap">{content}</div>
            ) : (
              <p className="text-gray-400 italic">Post content will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
