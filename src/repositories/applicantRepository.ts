import genericRepository from "./genericRepository";

const applicantRepository = () => {
  return { ...genericRepository("Applicants") };
};

export default applicantRepository;