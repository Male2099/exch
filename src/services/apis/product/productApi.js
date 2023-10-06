import axiosInstance from "@/services/utils/axiosInstance";
const productApi = {
  async registerProduct(product) {
    try{ 
      const res = await axiosInstance.post("/products", product);
    return res.data
  }catch (error) {
    throw error.response.data;
  }
  },
};
export default productApi;