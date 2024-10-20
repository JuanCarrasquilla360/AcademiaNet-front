import genericRepository from "./genericRepository";

const accountsRepository = (method: string, enqueueSnackbar: any) => {
  return { ...genericRepository(`Accounts/${method}`, enqueueSnackbar) };
};

export default accountsRepository;
