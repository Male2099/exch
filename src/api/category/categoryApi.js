import axiosInstance from "../utils/axiosInstance";
const categoryApi = {
  async registerCategory(category) {
    try{ 
      const res = await axiosInstance.post("/categories", category);
    return res.data
  }catch (error) {
    throw error.response.data;
  }
  },
};
export default categoryApi;