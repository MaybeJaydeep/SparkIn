// src/pages/AuthorProfile.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import api from "@/api";
import { AuthContext } from "@/context/AuthContext";
import {
  UserIcon,
  PencilIcon,
  ClockIcon,
  CalendarIcon,
  TagIcon,
  ChatBubbleLeftIcon,
  LinkIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

export default function AuthorProfile() {
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isOwnProfile = user?.username === username;

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        // Fetch author profile
        const authorRes = await api.get(`/users/${username}`);
        setAuthor(authorRes.data);

        // Fetch author's posts
        const postsRes = await api.get(`/posts?author=${username}`);
        setPosts(postsRes.data);
      } catch (err) {
        console.error("[AuthorProfile] Failed:", err.message);
        setError("Failed to load author profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [username]);

  // Utility: estimate reading time
  const getReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text?.trim().split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-400 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Author Not Found</h1>
        <p className="text-gray-400 mb-6">{error || "The author you're looking for doesn't exist."}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Author Profile Header */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl mb-8">
        <div className="relative h-40 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        </div>

        <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-16">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {author.username?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{author.username}</h1>
              <p className="text-gray-300 mb-4 max-w-2xl">
                {author.bio || "This author hasn't added a bio yet."}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Joined {new Date(author.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <DocumentTextIcon className="w-4 h-4" />
                  <span>{posts.length} Posts</span>
                </div>
              </div>

              {/* Social Links */}
              {(author.social?.github || author.social?.twitter) && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  {author.social?.github && (
                    <a
                      href={author.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {author.social?.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>Twitter</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Edit Profile Button */}
            {isOwnProfile && (
              <div className="mt-4 md:mt-0">
                <Link
                  to={`/profile/${username}/edit`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors shadow-md"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author's Posts */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <DocumentTextIcon className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {posts.length > 0 ? `Posts by ${author.username}` : `No posts yet`}
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentTextIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-lg mb-4">This author hasn't published any posts yet.</p>
            {isOwnProfile && (
              <Link
                to="/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors shadow-md"
              >
                <PencilIcon className="w-4 h-4" />
                Create Your First Post
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                to={`/post/${post.slug}`}
                key={post._id}
                className="group block"
              >
                <article className="h-full bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        background: `linear-gradient(135deg,
                          hsl(${post._id.charCodeAt(0) % 360}, 70%, 60%),
                          hsl(${(post._id.charCodeAt(0) + 120) % 360}, 70%, 60%))`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ChatBubbleLeftIcon className="w-6 h-6 text-white/70" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Tags overlay */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-white rounded-lg text-xs font-medium border border-white/20">
                          <TagIcon className="w-3 h-3" />
                          {post.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                      {post.content?.slice(0, 120)}...
                    </p>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        <span>{getReadingTime(post.content)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
