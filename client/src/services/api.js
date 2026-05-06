import axios from 'axios';

// Local dev: /api (Vite proxy → localhost:5000)
// Production: VITE_API_URL = https://your-app.onrender.com/api
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  signup: (data)  => api.post('/auth/signup', data),
  login:  (data)  => api.post('/auth/login', data),
  getMe:  ()      => api.get('/auth/me'),
};

// Dashboard
export const dashboardAPI = {
  getStats:      () => api.get('/dashboard/stats'),
  getRevenue:    () => api.get('/dashboard/revenue'),
  getSales:      () => api.get('/dashboard/sales'),
  getUserStats:  () => api.get('/dashboard/userstats'),
  getCategories: () => api.get('/dashboard/categories'),
};

export default api;
