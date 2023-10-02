import axiosInstance from "../utils/axiosInstance";
const categoryApi = {
  async registerCategory(category) {
    try{ await axiosInstance.post("/categories", category);
  }catch (error) {
    throw error.response.data;
  }
  },
};
export default categoryApi;