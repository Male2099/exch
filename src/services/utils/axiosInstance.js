import axios from "axios";
import router from "@/router/index";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const accessToken_key = import.meta.env.VITE_ACCESS_TOKEN_KEY;

// Create a new instance of Axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to update the token in the headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(accessToken_key);
  console.log("token send to server: " + token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Jol response hz");
    return response;
  },
  (error) => {
    console.log("Jol error hz");
    if (error.request && !error.response) {
      return Promise.reject(error);
    }
    
    if (error.response.status === 401) {
      router.push("/login");
    } else if (error.response.status === 404) {
      router.push("/not-found");
    } else if (error.response.status === 500) {
      router.push("/internal-server-error");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
