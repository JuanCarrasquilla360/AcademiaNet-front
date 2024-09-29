import genericRepository from "./genericRepository";

const enrollmentPeriodsRepository = () => {
  return { ...genericRepository("EnrollmentPeriods") };
};

export default enrollmentPeriodsRepository;
