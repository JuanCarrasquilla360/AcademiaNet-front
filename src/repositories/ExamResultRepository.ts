import genericRepository from "./genericRepository";

const academicExamRepository = () => {
  return { ...genericRepository("ExamResults") };
};

export default academicExamRepository;
