import httpService from "../services/httpService";

const genericRepository = (method: string) => ({
  get: async () => {
    try {
      const data = await httpService.get(`${method}`);
      return data;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  },
  getById: async (id) => {
    try {
      const data = await httpService.get(`${method}/${id}`);
      return data;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  },
  post: async (body) => {
    try {
      const data = await httpService.post(`${method}`, body);
      return data;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  },
  put: async (body) => {
    try {
      const data = await httpService.put(`${method}`, body);
      return data;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  },
  delete: async () => {
    try {
      const data = await httpService.delete(`${method}`);
      return data;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  },
});

export default genericRepository;
