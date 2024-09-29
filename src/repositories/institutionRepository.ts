import genericRepository from "./genericRepository";

const institutionRepository = () => {
  return { ...genericRepository("Institutions") };
};

export default institutionRepository;
