/**
 * API Client Configuration
 * Axios instance with authentication interceptor
 */

import axios from 'axios';

// Use environment variable for API URL, fallback to relative URL for dev (Vite proxy)
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
});

// Request interceptor - adds JWT token to all requests
api.interceptors.request.use(
  (config) => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.warn('[API] Failed to parse user from localStorage:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear user data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
