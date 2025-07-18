// src/pages/Register.jsx
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import api from "@/api";

export default function Register() {
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userCount, setUserCount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await api.get('/auth/count');
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

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const res = await register(username, email, password, isAdmin ? 'admin' : 'user');
      if (res.success) {
        // Show success message
        alert("Account created successfully! Please log in.");
        navigate('/login');
      } else {
        setError(res.message || "Registration failed.");
      }
    } catch (err) {
      console.error("[Register.jsx] Register error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 mb-8 text-3xl font-bold z-10 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
      >
        ⚡ SparkIn
      </Link>

      <div className="z-10 w-full max-w-md bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-700/50">
        <h1 className="text-2xl font-bold mb-2 text-center">Create an Account</h1>
        <p className="text-gray-400 text-center mb-6">Join our community of writers and readers</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="johndoe"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>

          <div className="flex items-center">
            <input
              id="admin-checkbox"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
            />
            <label htmlFor="admin-checkbox" className="ml-2 text-sm text-gray-300">
              Register as Admin
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="terms-checkbox"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              required
            />
            <label htmlFor="terms-checkbox" className="ml-2 text-sm text-gray-300">
              I agree to the <a href="#" className="text-blue-400 hover:underline">Terms and Conditions</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl transition-colors shadow-md font-medium flex items-center justify-center mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center text-gray-400">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="z-10 mt-8 text-sm text-gray-400 flex items-center gap-2">
        <span>Join our community of</span>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
          {typeof userCount === 'number' ? userCount.toLocaleString() : "many"} users
        </span>
        <span>worldwide ✨</span>
      </div>

      <p className="mt-4 text-gray-500 text-sm z-10">
        &copy; {new Date().getFullYear()} SparkIn. All rights reserved.
      </p>

      {/* Add keyframes for floating animation */}
      <style jsx="true">{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}
