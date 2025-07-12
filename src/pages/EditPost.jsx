// src/pages/EditPost.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/slug/${slug}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setTitle(data.title);
        setTags(data.tags.join(", "));
        setContent(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          tags: tags.split(",").map((tag) => tag.trim()),
          content,
        }),
      });
      if (!res.ok) throw new Error("Failed to update post");
      navigate(`/post/${slug}`);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading post…</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Edit Post ⚡</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-white">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="tags" className="text-white">Tags</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. react, javascript"
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="content" className="text-white">Markdown Content</Label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Edit your post in Markdown…"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
          />
        </div>

        <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
          Save Changes
        </Button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-4">Live Preview</h2>
        <div className="prose prose-invert max-w-none p-4 border border-gray-700 rounded-md bg-gray-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
