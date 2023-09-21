const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = "UNKNOWN YET";

export default {
  async updateUserById(id, updateUser) {
    if (!updateUser.password) updateUser.password = null;

    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateUser),
    });

    const data = await res.json();
    if (res.ok) {
      return data;
    } else throw data;
  },
  async getUserById(id) {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      return data;
    } else throw data;
  },
};
