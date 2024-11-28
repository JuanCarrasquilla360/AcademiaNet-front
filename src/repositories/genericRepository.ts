/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from "../i18n";
import httpService from "../services/httpService";

const genericRepository = (method: string) => ({
  get: async (params: any = null, enqueueSnackbar?: any, message?: any) => {
    return await handleOperation(
      () => httpService.get(method, params),
      message,
      enqueueSnackbar
    );
  },
  getById: async (id: any, enqueueSnackbar?: any, message?: any) => {
    return await handleOperation(
      () => httpService.get(`${method}/${id}`),
      message,
      enqueueSnackbar
    );
  },
  post: async (body: any, enqueueSnackbar?: any, message?: any) => {
    return await handleOperation(
      () => httpService.post(method, body),
      message,
      enqueueSnackbar
    );
  },
  put: async (body?: any, enqueueSnackbar?: any, message?: any) => {
    return await handleOperation(
      () => httpService.put(method, body),
      message,
      enqueueSnackbar
    );
  },
  delete: async (enqueueSnackbar?: any, message?: any) => {
    return await handleOperation(
      () => httpService.delete(method),
      message,
      enqueueSnackbar
    );
  },
});

const handleOperation = async (
  operation?: any,
  successMessage?: any,
  enqueueSnackbar?: any
) => {
  try {
    const data = await operation();
    if (enqueueSnackbar && successMessage)
      enqueueSnackbar(successMessage, { variant: "success" });
    return data;
  } catch (error: any) {
    if (enqueueSnackbar)
      enqueueSnackbar(i18n.t(error.message), { variant: "error" });
    throw error;
  }
};

export default genericRepository;
