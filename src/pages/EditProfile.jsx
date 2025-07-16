// src/pages/EditProfile.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

export default function EditProfile() {
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${username}`);
        console.log("[EditProfile] Fetched:", res.data);
        setBio(res.data.bio || "");
        setAvatar(res.data.avatar || "");
        setGithub(res.data.social?.github || "");
        setTwitter(res.data.social?.twitter || "");
      } catch (err) {
        console.error("[EditProfile] Failed:", err.message);
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
      await axios.put(`http://localhost:5000/api/users/${username}`, {
        bio,
        avatar,
        social: {
          github,
          twitter,
        },
      });
      navigate(`/profile/${username}`);
    } catch (err) {
      console.error("[EditProfile] Failed to update:", err.message);
      alert("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading profile…</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Edit Profile ⚙️</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-white">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell us about yourself"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-white">Avatar URL</label>
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-white">GitHub URL</label>
          <input
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="https://github.com/yourhandle"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-white">Twitter URL</label>
          <input
            type="url"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="https://twitter.com/yourhandle"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-white placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="bg-primary-500 text-white px-6 py-2 rounded hover:bg-primary-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
