import genericRepository from "./genericRepository";

const academicExamRepository = () => {
  return { ...genericRepository("Notifications") };
};

export default academicExamRepository;
