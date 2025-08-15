import axios from 'axios';

// Create instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // or cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data, // unwrap data
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized — maybe redirect to login
      console.error('Unauthorized. Redirecting...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
