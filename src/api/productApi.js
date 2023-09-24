const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const productApi = {
  async registerProduct(product) {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
    return data;
  },
};

export default productApi;