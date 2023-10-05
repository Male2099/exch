import axiosInstance from "../utils/axiosInstance";
const StockitemApi = {
  async registerStockingProduct(stockingitem) {
      try{ 
        const res = await axiosInstance.post("/stocking-items", stockingitem);
      return res.data
    }catch (error) {
      throw error.response.data;
    }
    },
};

export default StockitemApi;