import axiosInstance from "@/services/utils/axiosInstance";

export default {
  async deleteSupplier(id) {
    try {
      res = await axiosInstance.delete("/suppliers/" + id);
    } catch (error) {
      console.log("error happenned", error);
    }
  },
  async getAllSuppliers({ page, pageSize, search }) {
    let query = `page=${page}&pageSize=${pageSize}`;
    if (search || search === "0") {
      query += `&search=${search}`;
    }
    try {
      const res = await axiosInstance.get(`/suppliers?${query}`);
      return res.data;
    } catch (error) {
      // console.log(error);
    }
  },
  async getSupplierById(id) {
    try {
      const res = await axiosInstance.get(`/suppliers/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  async updateSuppliersById(id, updateSupplier) {
    try {
      const res = await axiosInstance.patch(`/suppliers/${id}`, updateSupplier);
      return res.data.data;
    } catch (error) {
      console.log("update errrr");
      console.log(error);
      throw error.response.data;
    }
  },
};
