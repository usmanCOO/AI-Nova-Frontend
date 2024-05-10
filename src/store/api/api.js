import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_NODE_BACKEND_BASEURL,
});

const SECURE_API = axios.create({
  baseURL: process.env.REACT_APP_NODE_BACKEND_BASEURL,
});

SECURE_API.interceptors.request.use(
  (config) => {
    const unParesdToken = localStorage.getItem("access_token");
    const parsedToken = unParesdToken && JSON.parse(unParesdToken);

    if (parsedToken) {
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
