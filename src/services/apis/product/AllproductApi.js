import axiosInstance from "@/services/utils/axiosInstance";

export default {
  async getAllProducts() {
    try {
      const res = await axiosInstance.get(`/products`); 
        return res.data;
      } catch (error) {
        console.log("error appear: " + error);
      }
  },
};