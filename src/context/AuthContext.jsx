// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.warn('[AuthContext] Failed to parse user:', err);
      localStorage.removeItem('user');
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const axiosAuth = axios.create();

  axiosAuth.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const login = async (email, password) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || '/api';
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      setUser(res.data);
      setToken(res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('token', res.data.token);
      return { success: true };
    } catch (err) {
      console.error('[AuthContext] Login failed:', err.response?.data?.message || err.message);
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (username, email, password, role = 'user') => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || '/api';
      const res = await axios.post(`${API_URL}/auth/register`, { username, email, password ,role });
      setUser(res.data);
      setToken(res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('token', res.data.token);
      return { success: true };
    } catch (err) {
      console.error('[AuthContext] Registration failed:', err.response?.data?.message || err.message);
      return { success: false, message: err.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, axiosAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add this at the end:
export const useAuth = () => {
  return useContext(AuthContext);
};
