import i18n from "../i18n";
import httpService from "../services/httpService";

const genericRepository = (method: string) => ({
  get: async (
    params = null,
    enqueueSnackbar?: any,
    message = "Data fetched successfully"
  ) => {
    return await handleOperation(
      () => httpService.get(method, params),
      message,
      enqueueSnackbar
    );
  },
  getById: async (
    id,
    enqueueSnackbar?: any,
    message = "Data fetched successfully"
  ) => {
    return await handleOperation(
      () => httpService.get(`${method}/${id}`),
      message,
      enqueueSnackbar
    );
  },
  post: async (body, enqueueSnackbar?: any, message = "Request successful") => {
    return await handleOperation(
      () => httpService.post(method, body),
      message,
      enqueueSnackbar
    );
  },
  put: async (body, enqueueSnackbar?: any, message = "Update successful") => {
    return await handleOperation(
      () => httpService.put(method, body),
      message,
      enqueueSnackbar
    );
  },
  delete: async (enqueueSnackbar?: any, message = "Delete successful") => {
    return await handleOperation(
      () => httpService.delete(method),
      message,
      enqueueSnackbar
    );
  },
});

const handleOperation = async (operation, successMessage, enqueueSnackbar) => {
  try {
    const data = await operation();
    if (enqueueSnackbar)
      enqueueSnackbar(successMessage, { variant: "success" });
    return data;
  } catch (error: string) {
    if (enqueueSnackbar) enqueueSnackbar(i18n.t(error.message), { variant: "error" });
    throw error;
  }
};

export default genericRepository;
