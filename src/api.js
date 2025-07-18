// src/api.js
import axios from 'axios';

// Use relative URL since we have proxy configured in vite.config.js
const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
