import axiosInstance from "../utils/axiosInstance";

const authApi = {
  async registerUser(user) {
    //set dob to null if not include
    if (!user.dob) user.dob = null;
    try {
      const res= await axiosInstance.post("/auth/register", user);
      return res.data
    } catch (error) {
      //throw the actual error to use in ui
      throw error.response.data;

    }
  },
};

export default authApi;