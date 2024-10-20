import httpService from "../services/httpService";

const genericRepository = (
  method: string,
  enqueueSnackbar: (message: string, options?: any) => void
) => ({
  get: async (params = null) => {
    try {
      const data = await httpService.get(`${method}`, params);
      enqueueSnackbar("Data fetched successfully!", { variant: "success" });
      return data;
    } catch (error) {
      enqueueSnackbar("Error fetching data!", { variant: "error" });
      throw new Error("Error fetching data");
    }
  },
  getById: async (id) => {
    try {
      const data = await httpService.get(`${method}/${id}`);
      enqueueSnackbar("Data fetched successfully!", { variant: "success" });
      return data;
    } catch (error) {
      enqueueSnackbar("Error fetching data!", { variant: "error" });
      throw new Error("Error fetching data");
    }
  },
  post: async (body) => {
    try {
      const data = await httpService.post(`${method}`, body);
      enqueueSnackbar("Data posted successfully!", { variant: "success" });
      return data;
    } catch (error) {
      enqueueSnackbar("Error posting data!", { variant: "error" });
      throw new Error("Error posting data");
    }
  },
  put: async (body) => {
    try {
      const data = await httpService.put(`${method}`, body);
      enqueueSnackbar("Data updated successfully!", { variant: "success" });
      return data;
    } catch (error) {
      enqueueSnackbar("Error updating data!", { variant: "error" });
      throw new Error("Error updating data");
    }
  },
  delete: async () => {
    try {
      const data = await httpService.delete(`${method}`);
      enqueueSnackbar("Data deleted successfully!", { variant: "success" });
      return data;
    } catch (error) {
      enqueueSnackbar("Error deleting data!", { variant: "error" });
      throw new Error("Error deleting data");
    }
  },
});

export default genericRepository;
