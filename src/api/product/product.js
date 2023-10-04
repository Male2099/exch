import axiosInstance from "../utils/axiosInstance";

export default {
  async updateProductById(id, updateUser) {
    try {
      console.log( "updare");
      console.log(updateUser);
      const res = await axiosInstance.patch(`/products/${id}`, updateUser);
      return res.data.data;
    } catch (error) {
      console.log("update errrr");
      console.log(error);
      throw error.response.data;
    }
  },

  async getAllProducts({ page, pageSize, search }) {
    let query = `page=${page}&pageSize=${pageSize}`;
    if (search || search === "0") {
      query += `&search=${search}`;
    }
    try {
      const res = await axiosInstance.get(`/products?${query}`);
      return res.data;
    } catch (error) {
    }
  },
  async getProductById(id) {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};