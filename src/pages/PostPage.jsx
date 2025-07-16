import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import {  useAuth } from "@/context/AuthContext"; // ✅ Import your auth context

const getReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export default function PostPage() {
  const { slug } = useParams();
  const { user } = useAuth(); // ✅ Get the logged-in user

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/slug/${slug}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!post) return <p className="text-white">Post not found.</p>;

  const readingTime = getReadingTime(post.content);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={post.cover || "https://source.unsplash.com/random/1200x400/?code,dark,design"}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <article>
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">{post.title}</h1>
          <p className="text-gray-400 text-sm">
  {new Date(post.createdAt).toLocaleDateString()} • {readingTime} • By{" "}
  {post.author?.username || "Unknown Author"}
</p>
        </header>

        <div className="prose prose-invert prose-code:before:hidden prose-code:after:hidden max-w-none mb-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800">
          <img
              src={post.author?.avatar || defaultAvatar}
              alt={post.author?.username || "Author"}
              className="w-14 h-14 rounded-full"
            />
          <div>
            <h3 className="text-lg text-white font-semibold">{post.author?.username}</h3>
            <p className="text-gray-400 text-sm">{post.author?.bio || "Author bio..."}</p>
          </div>
        </div>

        {/* ✅ Conditionally show Edit button */}
        {user && user.username === post.authorUsername && (
          <Link
            to={`/edit/${post.slug}`}
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Post
          </Link>
        )}

        <div className="mt-10">
          <h2 className="text-xl text-white font-semibold mb-4">Related Posts</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-primary-400 hover:underline">Coming soon...</a>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}
