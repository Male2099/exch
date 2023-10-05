import axiosInstance from "@/services/utils/axiosInstance";

export default {
  async getAllCustomers({ page, pageSize, search }) {
    let query = `page=${page}&pageSize=${pageSize}`;
    if (search || search === "0") {
      query += `&search=${search}`;
    }
    try {
      const res = await axiosInstance.get(`/customers?${query}`);
      return res.data;
    } catch (error) {
      // console.log(error);
    }
  },
  async getCustomerById(id) {
    try {
    const res = await axiosInstance.get(`/customers/${id}`); 
    return res.data;
  } catch (error) {
    console.log(error);
  }
},
};