// src/pages/PostPage.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

// Utility to estimate reading time
const getReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export default function PostPage() {
  const post = {
    title: "Dark Mode Design in React",
    date: "July 5, 2025",
    author: {
      name: "Jaydeep Badal",
      bio: "Professional web developer, gamer, and data science enthusiast.",
      avatar:
        "https://avatars.githubusercontent.com/u/0000000?v=4", // Replace with your avatar URL
    },
    cover:
      "https://source.unsplash.com/random/1200x400/?code,dark,design", // Replace with your image URL
    content: `
# Dark Mode Design in React

Designing for dark mode is easier than ever with Tailwind CSS and React!

\`\`\`js
export default function Example() {
  return <div className="dark:bg-gray-900">Hello World</div>;
}
\`\`\`

## Tips

- Use Tailwind's \`dark:\` variants.
- Test your colors for contrast.
- Provide a toggle for users.

## Conclusion

Dark mode design is no longer hard!
    `,
    related: [
      { title: "Getting Started with Tailwind CSS", slug: "/post/tailwind-start" },
      { title: "Building Beautiful Forms", slug: "/post/forms" },
    ],
  };

  const readingTime = getReadingTime(post.content);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Cover image */}
      <img
        src={post.cover}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* Post header */}
      <article>
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">{post.title}</h1>
          <p className="text-gray-400 text-sm">
            {post.date} • {readingTime} • By {post.author.name}
          </p>
        </header>

        {/* Post content */}
        <div className="prose prose-invert prose-code:before:hidden prose-code:after:hidden max-w-none mb-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Author bio */}
        <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h3 className="text-lg text-white font-semibold">{post.author.name}</h3>
            <p className="text-gray-400 text-sm">{post.author.bio}</p>
          </div>
        </div>

        {/* Related posts */}
        <div className="mt-10">
          <h2 className="text-xl text-white font-semibold mb-4">Related Posts</h2>
          <ul className="space-y-2">
            {post.related.map((rel) => (
              <li key={rel.slug}>
                <a href={rel.slug} className="text-primary-400 hover:underline">
                  {rel.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
