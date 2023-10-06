import axiosInstance from "@/services/utils/axiosInstance";
import { userAuthStore } from "@/stores/app-auth";

const accessToken_key = import.meta.env.VITE_ACCESS_TOKEN_KEY;

const setToken = (key, value) => {
  localStorage.setItem(key, value);
};

const authApi = {
  async registerUser(user) {
    //set dob to null if not include
    if (!user.dob) user.dob = null;
    try {
      const res = await axiosInstance.post("/auth/register", user);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async login(username, password) {
    const user = { username, password };
    try {
      const res = await axiosInstance.post("/auth/login", user);
      // Save token
      const { token, expireAt, tokenType } = res.data.data;
      setToken(accessToken_key, token);
    } catch (error) {
      // Throw the actual error to use in the UI if exists
      throw error?.response?.data?.message || "something went wrong";
    }
    //check for admin
    return this.userIsAdmin();
  },
  async userIsAdmin() {
    const authUser = await this.getMe();
    if (!authUser?.role?.name?.toLowerCase().includes("admin")) {
      //remove token
      localStorage.removeItem(accessToken_key);
      throw "Access denied";
    }
    return authUser;
  },

  async getMe() {
    try {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    } catch (error) {
      //throw the actual error to use in ui
      console.log("get auth error");
      console.log(error);
      // throw error.response.data;
    }
  },
  logout() {
    const authStore = userAuthStore();
    authStore.clearUser();
    localStorage.removeItem(accessToken_key);
  },
};

export default authApi;
