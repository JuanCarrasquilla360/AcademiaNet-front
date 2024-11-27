import genericRepository from "./genericRepository";

const applicantRepository = () => {
  return { ...genericRepository("Applicant") };
};

export default applicantRepository;