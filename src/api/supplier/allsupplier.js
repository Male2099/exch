import axiosInstance from "../utils/axiosInstance";
export default {
  async getAllSuppliers() {
    try {
      const res = await axiosInstance.get(`/suppliers`); 
        return res.data;
      } catch (error) {
        console.log("error appear: " + error);
      }
  },
};