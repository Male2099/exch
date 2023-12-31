const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StockApi = {
  async registerStock(stock) {
    const res = await fetch(`${API_BASE_URL}/stockings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    });
    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
    return data;
  },
};

export default StockApi;