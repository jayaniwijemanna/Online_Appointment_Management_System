import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081", // Spring Boot backend
});

// Admin login token (Basic Auth)
api.interceptors.request.use((config) => {
  const auth = localStorage.getItem("adminAuth");
  if (auth) {
    config.headers.Authorization = `Basic ${auth}`;
  }
  return config;
});

export default api;
