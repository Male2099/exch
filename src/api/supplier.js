const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default {
  async updateSupplierById(id, updateSupplier) {
    const res = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateSupplier),
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else throw data;
  },
  async getSupplierById(id) {
    const res = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      return data;
    } else throw data;
  },
};
