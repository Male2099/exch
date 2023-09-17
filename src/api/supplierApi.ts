import axios, { type AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/v1/suppliers';

const supplierApi = {
  async getAllSuppliers(): Promise<any[]> {
    try {
      const response: AxiosResponse = await axios.get(API_BASE_URL);
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch suppliers');
    }
  },
};

export default supplierApi;