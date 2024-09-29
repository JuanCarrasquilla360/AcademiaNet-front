import genericRepository from "./genericRepository";

const academicProgramRepository = () => {
  return { ...genericRepository("AcademicPrograms") };
};

export default academicProgramRepository;
