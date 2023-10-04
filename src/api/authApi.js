const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const authApi = {
  async registerUser(user) {
    //if dob not include it result '' but not null so make it null if ''
    if (!user.dob) user.dob = null;

    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
  },
};

export default authApi;
