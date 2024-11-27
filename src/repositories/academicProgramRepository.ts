import genericRepository from "./genericRepository";

const academicProgramRepository = () => {
  return { ...genericRepository("AcademicPrograms/institution") };
};

export default academicProgramRepository;
