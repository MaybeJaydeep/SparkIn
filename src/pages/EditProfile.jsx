// src/pages/EditProfile.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "@/api";
import { AuthContext } from "@/context/AuthContext";
import {
  UserIcon,
  PencilIcon,
  LinkIcon,
  ArrowLeftIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

export default function EditProfile() {
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/users/${username}`);
        setBio(res.data.bio || "");
        setGithub(res.data.social?.github || "");
        setTwitter(res.data.social?.twitter || "");
      } catch (err) {
        console.error("[EditProfile] Failed:", err.message);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.username === username) {
      fetchProfile();
    } else {
      navigate("/"); // not your profile? redirect
    }
  }, [username, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await api.put(`/users/${username}`, {
        bio,
        social: {
          github,
          twitter,
        },
      });

      alert("Profile updated successfully!");
      navigate(`/author/${username}`);
    } catch (err) {
      console.error("[EditProfile] Failed to update:", err.message);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
        <p className="text-gray-400 mb-6">{error}</p>
        <Link
          to={`/author/${username}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to={`/author/${username}`}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4 group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
          Edit Your Profile
        </h1>
        <p className="text-gray-400">
          Update your profile information to let others know more about you.
        </p>
      </div>

      {/* Edit Form */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Bio */}
          <div className="mb-6">
            <label htmlFor="bio" className="block text-white font-medium mb-2 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-blue-400" />
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others about yourself..."
              rows={5}
              className="w-full p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
            <p className="text-gray-400 text-sm mt-2">
              A short description that will appear on your profile.
            </p>
          </div>

          {/* GitHub URL */}
          <div className="mb-6">
            <label htmlFor="github" className="block text-white font-medium mb-2 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-green-400" />
              GitHub URL
            </label>
            <input
              id="github"
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/yourusername"
              className="w-full p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>

          {/* Twitter URL */}
          <div className="mb-6">
            <label htmlFor="twitter" className="block text-white font-medium mb-2 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-purple-400" />
              Twitter URL
            </label>
            <input
              id="twitter"
              type="url"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="https://twitter.com/yourusername"
              className="w-full p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-end">
            <Link
              to={`/author/${username}`}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-colors shadow-md flex items-center gap-2 ${saving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <CheckIcon className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Profile Preview</h2>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {username?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{username}</h3>
              <p className="text-gray-400 text-sm">Profile Preview</p>
            </div>
          </div>

          <div className="prose prose-invert prose-sm max-w-none mb-4">
            {bio ? (
              <p className="text-gray-300">{bio}</p>
            ) : (
              <p className="text-gray-400 italic">No bio provided</p>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            {github && (
              <div className="flex items-center gap-2 text-gray-400">
                <LinkIcon className="w-4 h-4" />
                <span>GitHub</span>
              </div>
            )}
            {twitter && (
              <div className="flex items-center gap-2 text-gray-400">
                <LinkIcon className="w-4 h-4" />
                <span>Twitter</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
