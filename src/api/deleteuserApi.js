const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const authApi = {
  async registerUser(user) {
    //if dob not include it result '' but not null so make it null if ''
    if (!user.dob) user.dob = null;
    try {
      const res = await fetch(`${API_BASE_URL}/aapi/v1/users/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      // Handle the error here
      console.error("error appear: " + res.message);
    }
  },
};

export default authApi;
