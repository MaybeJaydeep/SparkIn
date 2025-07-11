// src/pages/EditPost.jsx
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function EditPost() {
  // Dummy data to simulate fetching an existing post
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // TODO: Replace with real fetch by slug
    const fetchedPost = {
      title: "My Existing Blog Post",
      tags: "react, markdown",
      content: `
# Editing This Post

Here is an example of editing content with **markdown**.

\`\`\`bash
npm run dev
\`\`\`
      `,
    };

    setTitle(fetchedPost.title);
    setTags(fetchedPost.tags);
    setContent(fetchedPost.content);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    console.log({
      title,
      tags,
      content,
    });
    // TODO: Send to backend
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Edit Post ⚡</h1>
      <form onSubmit={handleSave} className="space-y-6">
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
