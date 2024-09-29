import genericRepository from "./genericRepository";

const academicExamRepository = () => {
  return { ...genericRepository("Exams") };
};

export default academicExamRepository;
