import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  TagIcon,
  PencilIcon
} from "@heroicons/react/24/outline";

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Use fetch to get the post data
        const res = await fetch(`http://localhost:5000/api/posts/slug/${slug}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();

        // Check if the user is the author
        if (user && data.author && data.author._id !== user._id) {
          setError("You don't have permission to edit this post");
          return;
        }

        setPost(data);
        setTitle(data.title);
        setTags(data.tags?.join(", ") || "");
        setContent(data.content);
      } catch (err) {
        console.error("Failed to fetch post", err);
        setError("Failed to load post. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPost();
    } else {
      setError("Please log in to edit posts");
      setLoading(false);
    }
  }, [slug, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setSaving(true);

      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Prepare the data for the API
      const postData = {
        title,
        content,
        tags: tags.split(",").map(t => t.trim()).filter(t => t)
      };

      // Use fetch API with the correct endpoint
      const response = await fetch(`http://localhost:5000/api/posts/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update post');
      }

      const data = await response.json();

      // Show success message
      alert("Post updated successfully!");

      // Navigate to the updated post
      navigate(`/post/${data.slug}`);
    } catch (err) {
      console.error("Update failed:", err);
      alert(`Failed to update post: ${err.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <PencilIcon className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-400 mt-4">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{error}</h1>
        <p className="text-gray-400 mb-6">You may need to log in or check your permissions.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to={`/post/${slug}`}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Post
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
          Edit Post
        </h1>
        <p className="text-gray-400">
          Make changes to your post and save when you're done.
        </p>
      </div>

      {/* Edit Form */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
        <form onSubmit={handleUpdate} className="p-6 md:p-8">
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
              You can use Markdown formatting for your content.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-end">
            <Link
              to={`/post/${slug}`}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </Link>
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
                  Saving...
                </>
              ) : (
                <>
                  <PencilIcon className="w-4 h-4" />
                  Save Changes
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
