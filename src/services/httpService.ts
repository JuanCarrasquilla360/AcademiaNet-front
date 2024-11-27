import axios from "axios";

const baseURL = "https://localhost:7241/api/";
export const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
const httpService = {
  handleRequest: async (
    method: "post" | "get" | "put" | "delete",
    url: string,
    data = null,
    params = null
  ) => {
    try {
      const config = params ? { params } : {};
      const response = await axiosInstance[method](url, data || config);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data.code
          ? error.response?.data.code
          : "something_went_wrong";
      throw new Error(errorMessage);
    }
  },
  get: async (url: string, params = null) =>
    await httpService.handleRequest("get", url, null, params),
  post: async (url: string, data: any) =>
    await httpService.handleRequest("post", url, data),
  put: async (url: string, data: any) =>
    await httpService.handleRequest("put", url, data),
  delete: async (url: string) => await httpService.handleRequest("delete", url),
};

export default httpService;
