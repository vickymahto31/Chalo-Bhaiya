import axios from 'axios';

// Single source of truth for API base URL.
// Uses VITE_BACKEND_URL from .env, falls back to localhost for development.
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export { API_BASE_URL };
export default api;
