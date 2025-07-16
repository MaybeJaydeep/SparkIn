import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, axiosAuth } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

useEffect(() => {
  const fetchPost = async () => {
    try {
      const res = await axiosAuth.get(`/api/posts/slug/${slug}`);
      if (res.data.author._id !== user?._id) {
        alert("You can't edit this post.");
        return navigate("/");
      }
      setPost(res.data);
      setTitle(res.data.title);
      setTags(res.data.tags.join(", "));
      setContent(res.data.content);
    } catch (err) {
      console.error("Failed to fetch post", err);
    }
  };
  fetchPost();
}, [slug, axiosAuth, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosAuth.put(`/api/posts/slug/${slug}`, {
        title,
        tags: tags.split(",").map((t) => t.trim()),
        content,
      });
      alert("Post updated!");
      navigate(`/posts/${res.data.slug}`);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update post.");
    }
  };

  if (!post) return <p className="text-white">Loading or unauthorized...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl text-white font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-white">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="tags" className="text-white">Tags</Label>
          <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="content" className="text-white">Content</Label>
          <textarea
            id="content"
            rows={10}
            className="w-full p-3 bg-gray-800 text-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button type="submit">Update Post</Button>
      </form>
    </div>
  );
}
