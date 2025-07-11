// src/pages/NewPost.jsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      tags,
      content,
    });
  };

  // Split content: normal text + markdown blocks
  const parseContent = (text) => {
    const regex = /\*\*\+(.*?)\+\*\*/gs;
    const blocks = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text))) {
      if (match.index > lastIndex) {
        blocks.push({
          type: 'text',
          content: text.slice(lastIndex, match.index).trim(),
        });
      }
      blocks.push({
        type: 'markdown',
        content: match[1].trim(),
      });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      blocks.push({
        type: 'text',
        content: text.slice(lastIndex).trim(),
      });
    }

    return blocks.filter(block => block.content.length > 0);
  };

  const blocks = parseContent(content);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Create New Post ⚡</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-white">Title</Label>
          <Input
            id="title"
            placeholder="Your post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="tags" className="text-white">Tags</Label>
          <Input
            id="tags"
            placeholder="e.g. react, javascript"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <Label htmlFor="content" className="text-white">
            Content (write normally, use <code>**+ markdown +**</code> for Markdown blocks)
          </Label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here. For Markdown blocks, use **+ your markdown +**"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
          />
        </div>

        <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
          Publish
        </Button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-4">Live Preview</h2>
        {blocks.length === 0 ? (
          <p className="text-gray-400">Start typing to see the preview...</p>
        ) : (
          blocks.map((block, idx) =>
            block.type === 'text' ? (
              <p key={idx} className="mb-4 text-gray-300">
                {block.content}
              </p>
            ) : (
              <div
                key={idx}
                className="prose prose-invert max-w-none p-4 mb-4 border border-gray-700 rounded-md bg-gray-900"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {block.content}
                </ReactMarkdown>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
