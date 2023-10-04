const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const categoryApi = {
  async registerCategory(category) {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
    return data;
  },
};

export default categoryApi;