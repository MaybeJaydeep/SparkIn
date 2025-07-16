// src/pages/AuthorProfile.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

export default function AuthorProfile() {
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = user?.username === username;

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${username}`);
        console.log("[AuthorProfile] Fetched:", res.data);
        setAuthor(res.data);
      } catch (err) {
        console.error("[AuthorProfile] Failed:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [username]);

  if (loading) return <div className="text-gray-400 text-center">Loading author...</div>;
  if (!author) return <div className="text-red-500 text-center">Author not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* === Profile header === */}
      <div className="flex flex-col sm:flex-row items-center mb-8">
        <div className="bg-gradient-to-tr from-primary-500 to-purple-600 p-1 rounded-full">
          <img
            src={author.avatar || "https://avatars.githubusercontent.com/u/0000000?v=4"}
            alt={author.username}
            className="w-24 h-24 rounded-full border-4 border-gray-900"
          />
        </div>
        <div className="sm:ml-6 text-center sm:text-left mt-4 sm:mt-0">
          <h1 className="text-3xl font-bold text-white">{author.username}</h1>
          <p className="text-gray-400 mt-2 max-w-md">
            {author.bio || "No bio yet. Add your bio in Edit Profile!"}
          </p>
          <div className="flex space-x-4 mt-4 justify-center sm:justify-start">
            <span className="text-gray-400">
              GitHub:{" "}
              {author.social?.github ? (
                <a
                  href={author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition"
                >
                  {author.social.github}
                </a>
              ) : (
                <span className="italic opacity-70">Not added</span>
              )}
            </span>
            <span className="text-gray-400">
              Twitter:{" "}
              {author.social?.twitter ? (
                <a
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition"
                >
                  {author.social.twitter}
                </a>
              ) : (
                <span className="italic opacity-70">Not added</span>
              )}
            </span>
          </div>

          {/* === Edit Profile button === */}
          {isOwnProfile && (
            <div className="mt-4">
              <Link
                to={`/profile/${username}/edit`}
                className="inline-block bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition"
              >
                Edit Profile
              </Link>
            </div>
          )}
        </div>
      </div>


      {/* === Posts === */}
      {author.posts && author.posts.length > 0 ? (
        <div className="fade-in">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Posts by {author.username}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {author.posts.map((post) => (
              <Link
                key={post._id}
                to={`/post/${post.slug}`}
                className="block p-5 border border-gray-700 rounded-xl hover:border-primary-500 transition transform hover:-translate-y-1 bg-gray-900"
              >
                <h3 className="text-xl text-white font-bold">{post.title}</h3>
                <p className="text-gray-400 text-sm">
                  {new Date(post.createdAt).toDateString()}
                </p>
                <p className="text-gray-300 mt-2">
                  {post.excerpt || post.content?.slice(0, 100)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-400 fade-in">
          <p>No posts yet.</p>
          {isOwnProfile && (
            <Link to="/new" className="text-primary-400 hover:underline">
              Add your first post
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
