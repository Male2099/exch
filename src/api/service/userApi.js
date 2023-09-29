import axiosInstance from "../utils/axiosInstance";

export default {
  async updateUserById(id, updateUser) {
    if (!updateUser.password) updateUser.password = null;
    if (!updateUser.img) updateUser.img = null;

    try {
      const res = await axiosInstance.patch(`/users/${id}`, updateUser);
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log("update errrr");
      console.log(error);
      throw error.response.data;
    }
  },

  async getAllUsers({page, pageSize, roleId}) {
    try {
      const res = await axiosInstance.get(
        `/users?page=${page}&pageSize=${pageSize}&roleId=${roleId || ""}`
      );
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
