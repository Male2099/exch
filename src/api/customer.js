const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default {
  async getAllCustomers() {
    try {
      const res = await fetch(`${API_BASE_URL}/customers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.console.log();("error appear: " + error);
    }
  },
};