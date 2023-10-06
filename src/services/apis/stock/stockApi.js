import axiosInstance from "@/services/utils/axiosInstance";
const StockApi = {
  async registerStock(stock) {
    try{ 
      const res = await axiosInstance.post("/stockings", stock);
    return res.data
  }catch (error) {
    throw error.response.data;
  }
  },
};
export default StockApi;