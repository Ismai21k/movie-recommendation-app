// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://movie-recommendation-app-ia3x.onrender.com/',
});

// Add JWT to every request if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
