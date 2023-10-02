import axiosInstance from "../utils/axiosInstance";
export default {
  async getAllCategories() {
    try {
      const res = await axiosInstance.get(`/categories`); 
        return res.data;
      } catch (error) {
        console.log("error appear: " + error);
      }
  },
};