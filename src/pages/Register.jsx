import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await axios.get('/api/auth/count');
        setUserCount(res.data.count);
      } catch (err) {
        console.error("[Register.jsx] Error fetching user count:", err);
        setUserCount(null);
      }
    };

    fetchUserCount();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  try {
    const res = await register(username, email, password);
    if (res.success) {
      toast.success("✅ Account created! Redirecting to login...");
      navigate('/login');
    } else {
      toast.error(res.message || "Registration failed.");
      setError(res.message || "Registration failed.");
    }
  } catch (err) {
    console.error("[Register.jsx] Register error:", err);
    toast.error("Something went wrong. Please try again.");
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Star or grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#444444_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
      </div>

      <Link
        to="/"
        className="flex items-center mb-8 text-3xl font-semibold z-10"
      >
       ⚡SparkIn
      </Link>

      <div className="z-10 w-full max-w-md bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create a new account
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800/50 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800/50 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800/50 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-primary-600 hover:bg-primary-700 rounded-md font-medium transition flex justify-center items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-400 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      <div className="z-10 mt-8 text-xs text-gray-400">
          Join over{" "}
          <span className="font-bold text-white">
            {typeof userCount === 'number' ? userCount.toLocaleString() : "many"}
          </span>{" "}
          global users ✨
      </div>
    </section>
  );
}
