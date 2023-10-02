import axiosInstance from "../utils/axiosInstance";
export default {
  async updateCategoryById(id, updateCategory) {
    try {
    const res = await axiosInstance.patch(`/categories/${id}`,updateCategory); 
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log("update errrr");
    console.log(error);
    throw error.response.data;
  }
  },
  async getAllCategories({ page, pageSize, roleId, search }) {
    let query = `page=${page}&pageSize=${pageSize}`;
    if (search || search === "0") {
      query += `&search=${search}`;
    }
    if (roleId) {
      query += `&roleId=${roleId}`;
    }
    try {
      const res = await axiosInstance.get(`/categories?${query}`);
      return res.data;
    } catch (error) {
      // console.log(error);
    }
  },
  async getCategoryById(id) {
    try {
    const res = await axiosInstance.get(`/categories/${id}`); 
    return res.data;
  } catch (error) {
    console.log(error);
  }
},
};
