import axios from "axios";

const baseURL = "https://localhost:7241/api/";
const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const httpService = {
  get: async (url, params = null) => {
    try {
      const response = await axiosInstance.get(`${url}`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  post: async (url, data) => {
    try {
      const response = await axiosInstance.post(`${url}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  put: async (url, data) => {
    try {
      const response = await axiosInstance.put(`${url}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (url) => {
    try {
      const response = await axiosInstance.delete(`${url}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default httpService;
