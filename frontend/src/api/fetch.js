import axios from "axios";

// Created Base end point for axios to fetch backend 

const api = axios.create({
  baseURL: "https://fine-store-backend.onrender.com/api",
});

// ADD THIS INTERCEPTOR FOR PREVENTION OF HACKING / PHISHING ETC...
api.interceptors.request.use(
  (config) => {
    // The config object contains everything about the request (the URL, the method, the headers, etc.).
    const token = localStorage.getItem("token");
    if (token) {
      // If a token exists, the interceptor modifies the request's headers. It adds the Authorization field
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;