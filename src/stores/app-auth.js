import { defineStore } from "pinia";
import authApi from "@/services/apis/user/authApi";

export const userAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  getters: {
    getUser() {
      return this.user;
    },
  },
  actions: {
    async setUser() {
      console.log("yep fetching auth user");
      this.user = await authApi.getMe();
    },
    clearUser() {
      this.user = null;
    },
  },
});