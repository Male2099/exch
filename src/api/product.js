const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default {
  async updateProductById(id, updateProduct) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else throw data;
  },
  async getProductById(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
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
