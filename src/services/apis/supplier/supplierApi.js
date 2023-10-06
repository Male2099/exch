import axiosInstance from "@/services/utils/axiosInstance";
const suppliersApi = {
  async registerSupplier(supplier) {
    try{ 
      const res = await axiosInstance.post("/suppliers", supplier);
    return res.data
  }catch (error) {
    throw error.response.data;
  }
  },
};
export default suppliersApi;