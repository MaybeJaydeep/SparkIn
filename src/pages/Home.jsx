// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/api';
import {
  MagnifyingGlassIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  SparklesIcon,
  FireIcon,
  ChartBarIcon,
  ArrowRightIcon,
  PlusIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

// Utility: estimate reading time
const getReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Generate a consistent color based on a string
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

// Generate placeholder image with gradient
const generatePlaceholderImage = (id) => {
  const color1 = stringToColor(id || '1');
  const color2 = stringToColor((id || '1') + 'alt');
  return `linear-gradient(135deg, ${color1}, ${color2})`;
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Extract all unique tags from posts
  const allTags = [...new Set(posts.flatMap(post => post.tags || []))].slice(0, 5);

  const filteredPosts = posts.filter((post) => {
    // First filter by search term
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    // Then filter by active category if not 'all'
    const matchesCategory = activeCategory === 'all' ||
      post.tags?.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <SparklesIcon className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-400 mt-4 animate-pulse">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/20"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            ></div>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 mb-6 animate-pulse">
            <SparklesIcon className="w-4 h-4" />
            Welcome to the Future of Blogging
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              ⚡ SparkIn
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover extraordinary stories, insights, and ideas from passionate writers around the globe.
            Join our community of creators and readers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              to="/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/20"
            >
              <PlusIcon className="w-5 h-5" />
              <span className="font-medium">Create Post</span>
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all transform hover:-translate-y-1 border border-gray-700 hover:border-gray-600"
            >
              <span className="font-medium">Explore Topics</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{posts.length}+</div>
              <div className="text-gray-400 text-sm">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">∞</div>
              <div className="text-gray-400 text-sm">Ideas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-gray-400 text-sm">Inspiration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 md:mb-12">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search articles, topics, or authors..."
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={() => setSearchTerm('')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {searchTerm && (
          <div className="text-center mt-4">
            <p className="text-gray-400">
              Found <span className="text-white font-semibold">{filteredPosts.length}</span> results for
              <span className="text-blue-400 font-semibold"> "{searchTerm}"</span>
            </p>
          </div>
        )}
      </div>

      {/* Category Filter */}
      {!searchTerm && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700'
                }`}
            >
              All Posts
            </button>

            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveCategory(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Featured/Trending Section */}
      {!searchTerm && posts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <FireIcon className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Featured Article</h2>
          </div>

          {posts[0] && (
            <Link
              to={`/post/${posts[0].slug}`}
              className="block group"
            >
              <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="md:flex">
                  {/* Featured Image */}
                  <div className="md:w-2/5 h-60 md:h-auto relative overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        background: generatePlaceholderImage(posts[0]._id)
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <SparklesIcon className="w-10 h-10 text-white/70" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 md:w-3/5">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {posts[0].tags?.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                        >
                          <TagIcon className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                      {posts[0].title}
                    </h3>

                    <p className="text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
                      {posts[0].content?.slice(0, 200)}...
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-2">
                          <UserIcon className="w-4 h-4" />
                          <span>{posts[0].author?.username || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-4 h-4" />
                          <span>{getReadingTime(posts[0].content || '')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
                        <span className="font-medium">Read Article</span>
                        <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      )}

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <ChartBarIcon className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {searchTerm ? 'Search Results' : 'Latest Articles'}
          </h2>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(searchTerm ? filteredPosts : filteredPosts.slice(1)).map((post) => (
              <Link
                to={`/post/${post.slug}`}
                key={post._id}
                className="group block"
              >
                <article className="h-full bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        background: generatePlaceholderImage(post._id)
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ArrowRightIcon className="w-6 h-6 text-white/70" />
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

                    {/* Bookmark button */}
                    <div className="absolute top-4 right-4">
                      <button className="w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white/70 hover:text-white rounded-full border border-white/20 transition-colors">
                        <BookmarkIcon className="w-4 h-4" />
                      </button>
                    </div>
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
                        <UserIcon className="w-4 h-4" />
                        <span>{post.author?.username || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        <span>{getReadingTime(post.content || '')}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-blue-400 group-hover:text-blue-300 transition-colors font-medium flex items-center gap-1">
                          Read More
                          <ArrowRightIcon className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {searchTerm ? 'No Results Found' : 'No Posts Yet'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm
                ? `We couldn't find any posts matching "${searchTerm}". Try different keywords.`
                : 'Be the first to share your thoughts and create amazing content!'
              }
            </p>
            {!searchTerm && (
              <Link
                to="/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors font-medium shadow-lg hover:shadow-blue-500/20"
              >
                <SparklesIcon className="w-4 h-4" />
                Create First Post
              </Link>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > 9 && (
          <div className="mt-12 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-l-lg border border-gray-700 hover:bg-gray-700">
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border-t border-b border-gray-700">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border-t border-b border-gray-700 hover:bg-gray-700">
                2
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-r-lg border border-gray-700 hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-white">⚡ SparkIn</h2>
              <p className="text-gray-400 text-sm mt-1">Ignite your ideas. Share your spark.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} SparkIn. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Create Button (Mobile) */}
      <div className="md:hidden fixed bottom-6 right-6">
        <Link
          to="/new"
          className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <PlusIcon className="w-6 h-6" />
        </Link>
      </div>

      {/* Add keyframes for floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
