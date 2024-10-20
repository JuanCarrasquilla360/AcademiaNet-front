import genericRepository from "./genericRepository";

const accountsRepository = (method: string) => {
  return { ...genericRepository(`Accounts/${method}`) };
};

export default accountsRepository;
