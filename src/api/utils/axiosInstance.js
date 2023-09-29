import axios from "axios";
import router from "../../router/index";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const token = "Not YET INCLUDE";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290IiwiaWF0IjoxNjk1Nzk2NjkzLCJleHAiOjE2OTU4ODMwOTN9.eOH16RBqKlXbjTmxzav0FoAEqKQbe9NL_p2jzsuBCkk";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // Accept: 'application/json',
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response.status == 401) {
      // router.push("/login");
      router.push("/user/login-v2");
      return;
    } else if (error.response.status == 404) {
      router.push("/not-found");
      return;
    }
    return error;
  }
);

export default axiosInstance;
