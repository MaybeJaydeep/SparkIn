import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/api";
import {
  ClockIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  PencilIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  ArrowUpIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";

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

export default function PostPage() {
  const { slug } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch post data
        const res = await api.get(`/posts/slug/${slug}`);
        setPost(res.data);

        // Fetch comments for this post
        const commentsRes = await api.get(`/comments/post/${res.data._id}`);
        setComments(commentsRes.data || []);

        // Check if user has bookmarked this post
        if (user) {
          try {
            const bookmarksRes = await api.get(`/users/${user.username}/bookmarks`);
            const userBookmarks = bookmarksRes.data || [];
            setIsBookmarked(userBookmarks.some(bookmark => bookmark.post === res.data._id));
          } catch (err) {
            console.error("Failed to fetch bookmarks:", err);
            // Continue without bookmarks data
          }
        }
      } catch (err) {
        console.error(err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    // Add scroll listener for scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug, user]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to like posts");
      return;
    }

    try {
      setIsLiked(!isLiked);
      if (!isLiked) {
        await api.post(`/posts/${post._id}/like`);
      } else {
        await api.delete(`/posts/${post._id}/like`);
      }
    } catch (err) {
      console.error("Failed to like post:", err);
      setIsLiked(!isLiked); // Revert state on error
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      alert("Please log in to bookmark posts");
      return;
    }

    try {
      setIsBookmarked(!isBookmarked);
      if (!isBookmarked) {
        await api.post(`/users/${user.username}/bookmarks`, { postId: post._id });
      } else {
        await api.delete(`/users/${user.username}/bookmarks/${post._id}`);
      }
    } catch (err) {
      console.error("Failed to bookmark post:", err);
      setIsBookmarked(!isBookmarked); // Revert state on error
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `Check out this post: ${post.title}`,
        url: window.location.href
      })
        .catch(err => console.error("Share failed:", err));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch(err => console.error("Copy failed:", err));
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to comment");
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    try {
      setSubmittingComment(true);
      const res = await api.post(`/comments`, {
        postId: post._id,
        content: commentText
      });

      // Add the new comment to the list
      setComments([...comments, res.data]);
      setCommentText("");
    } catch (err) {
      console.error("Failed to submit comment:", err);
      alert("Failed to submit comment. Please try again.");
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-400 mt-4 animate-pulse">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">📄</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Post Not Found</h1>
        <p className="text-gray-400 mb-6">The post you're looking for doesn't exist or has been removed.</p>
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

  const readingTime = getReadingTime(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/20"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            ></div>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Posts
          </Link>

          {/* Cover Image */}
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="w-full h-60 md:h-80 bg-cover bg-center flex items-center justify-center"
              style={{
                background: generatePlaceholderImage(post._id, post.title)
              }}
            >
              <div className="text-center z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">📖</span>
                </div>
                <div className="text-white/90 text-xl font-semibold">Featured Article</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                    >
                      <TagIcon className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-300 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-blue-400" />
                  <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-green-400" />
                  <span>{readingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-purple-400" />
                  <Link
                    to={`/author/${post.author?.username}`}
                    className="hover:text-white transition-colors font-medium"
                  >
                    {post.author?.username || "Unknown Author"}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <EyeIcon className="w-4 h-4 text-yellow-400" />
                  <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                </div>
              </div>
            </header>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 sticky top-4 z-10 shadow-lg">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isLiked
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600'
                }`}
            >
              <HeartIcon className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">Like</span>
            </button>

            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isBookmarked
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600'
                }`}
            >
              <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">Save</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 hover:bg-gray-700 rounded-lg transition-all border border-gray-600"
            >
              <ShareIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
            </button>

            <a
              href="#comments"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 hover:bg-gray-700 rounded-lg transition-all border border-gray-600"
            >
              <ChatBubbleLeftIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Comment</span>
            </a>
          </div>

          {user && user.username === post.author?.username && (
            <Link
              to={`/edit/${post.slug}`}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors shadow-md"
            >
              <PencilIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Edit Post</span>
            </Link>
          )}
        </div>

        {/* Article Content */}
        <article className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
          <div className="p-6 md:p-8 lg:p-12">
            {/* Display the content as plain text with line breaks */}
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-blue-300
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-purple-300
              prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-pink-300 prose-code:bg-gray-900/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:hidden prose-code:after:hidden
              prose-pre:bg-gray-900/80 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-xl
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/10 prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:px-6
              prose-ul:text-gray-200 prose-ol:text-gray-200
              prose-li:mb-2
              prose-img:rounded-xl prose-img:shadow-lg
            ">
              {/* Display content as plain text with formatting */}
              <div className="whitespace-pre-wrap">{post.content}</div>
            </div>
          </div>
        </article>

        {/* Author Card */}
        <div className="mt-12 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {post.author?.username?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
                <h3 className="text-2xl font-bold text-white">{post.author?.username || "Unknown Author"}</h3>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                  Author
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                {post.author?.bio || "Passionate writer sharing insights and experiences through engaging content. Always learning, always creating."}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link
                  to={`/author/${post.author?.username}`}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors font-medium shadow-md"
                >
                  View Profile
                </Link>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors font-medium">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              📚
            </span>
            You Might Also Like
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                <div className="h-40 bg-gradient-to-br from-gray-700/50 to-gray-600/50 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-xl">📄</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2">Coming Soon</h3>
                  <p className="text-gray-400 text-sm">We're working on intelligent content recommendations just for you.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div id="comments" className="mt-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <ChatBubbleLeftIcon className="w-6 h-6 text-blue-400" />
            Comments
          </h2>

          {user ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all min-h-[100px]"
                required
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={submittingComment}
                  className={`px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors font-medium shadow-md flex items-center gap-2 ${submittingComment ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  {submittingComment ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-4 h-4" />
                      Post Comment
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-700/30 rounded-xl text-center">
              <p className="text-gray-300 mb-3">Please log in to leave a comment</p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Log In
              </Link>
            </div>
          )}

          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment._id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {comment.author?.username?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{comment.author?.username || "Unknown"}</span>
                          <span className="text-gray-400 text-xs">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {user && user.username === comment.author?.username && (
                          <button className="text-gray-400 hover:text-red-400 transition-colors">
                            <span className="text-xs">Delete</span>
                          </button>
                        )}
                      </div>
                      <p className="text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChatBubbleLeftIcon className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400">Be the first to comment on this post!</p>
            </div>
          )}
        </div>
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

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:-translate-y-1 hover:shadow-blue-500/30"
        >
          <ArrowUpIcon className="w-5 h-5" />
        </button>
      )}

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
