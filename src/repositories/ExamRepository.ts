import genericRepository from "./genericRepository";

const academicExamRepository = () => {
  return { ...genericRepository("Exam") };
};

export default academicExamRepository;
