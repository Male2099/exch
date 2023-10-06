import axiosInstance from "@/services/utils/axiosInstance";


export default {
  async updateUserById(id, updateUser) {
    if (!updateUser.password) updateUser.password = null;
    if (!updateUser.img) updateUser.img = null;

    try {
      const res = await axiosInstance.patch(`/users/${id}`, updateUser);
      console.log(res);
      return res.data.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async deleteUserById(userId) {
    try {
      const res = await axiosInstance.delete(`/users/${userId}`);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async getAllUsers({ page, pageSize, roleId, search }) {
    let query = `page=${page}&pageSize=${pageSize}`;
    if (search || search === "0") {
      query += `&search=${search}`;
    }
    if (roleId) {
      query += `&roleId=${roleId}`;
    }
    try {
      const res = await axiosInstance.get(`/users?${query}`);
      return res.data;
    } catch (error) {
      // console.log(error);
    }
  },
  async getUserById(id) {
    try {
      const res = await axiosInstance.get(`/users/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
