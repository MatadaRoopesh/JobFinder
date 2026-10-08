import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jobfinder-production-cfcb.up.railway.app/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jobfinder_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;