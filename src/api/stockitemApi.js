const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StockitemApi = {
  async registerStockingProduct(stockingitem) {
    const res = await fetch(`${API_BASE_URL}/stocking-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockingitem),
    });
    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
    return data;
  },
};

export default StockitemApi;