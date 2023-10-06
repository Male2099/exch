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
      const authUser = await authApi.getMe();
      //if this user is admin
      if (authUser?.role?.name.toLowerCase().includes("admin")) {
        this.user = authUser;
      }
    },
    clearUser() {
      this.user = null;
    },
  },
});
