import axiosInstance from "@/services/utils/axiosInstance";

const dashboardService = {
  async productSaleReport({ startDate, endDate }) {
    let query = "";
    if (startDate && endDate) {
      query = "?startDate=" + startDate + "&endDate=" + endDate;
    }
    const res = await axiosInstance.get("/report/product-sale" + query);
    return res.data;
  },
  async saleReport({ startDate, endDate }) {
    let query = "";
    if (startDate && endDate) {
      query = "?startDate=" + startDate + "&endDate=" + endDate;
    }
    const res = await axiosInstance.get("/report/sale" + query);
    return res.data;
  },
};

export default dashboardService;
