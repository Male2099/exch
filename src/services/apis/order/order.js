import axiosInstance from "@/services/utils/axiosInstance";

export default {
  async getAllOrders({ page, pageSize, search }) {
    let query = `page=${page}&pageSize=${pageSize}`;
    if (search || search === "0") {
      query += `&search=${search}`;
    }
    try {
      const res = await axiosInstance.get(`/orders?${query}`);
      return res.data;
    } catch (error) {
      // console.log(error);
    }
  },
  async getOrderById(id) {
    try {
    const res = await axiosInstance.get(`/orders/${id}`); 
    return res.data;
  } catch (error) {
    console.log(error);
  }
},
};