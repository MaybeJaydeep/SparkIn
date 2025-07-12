// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Star background */}
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
        <h1 className="text-2xl font-bold mb-6 text-center">Sign in to your account</h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Your email
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-primary-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary-600 hover:bg-primary-700 rounded-md font-medium transition"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-primary-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
