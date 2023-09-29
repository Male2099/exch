import axiosInstance from "../utils/axiosInstance";

export default {
  async getAllRoles() {
    try {
      const res = await axiosInstance.get("/roles");
      return res.data;
    } catch (error) {
      console.log("error appear: " + error);
    }
  },
};
