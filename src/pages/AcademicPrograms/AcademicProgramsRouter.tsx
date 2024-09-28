  import { Route, Routes } from "react-router-dom";
import AcademicProgramsList from "./AcademicProgramsList";
import AcademicProgramsCreate from "./AcademicProgramsCreate";

const AcademicProgramsRouter = () => {
  return (
    <Routes>
      <Route index element={<AcademicProgramsList />} />
      <Route path="create" element={<AcademicProgramsCreate />} />
    </Routes>
  );
};

export default AcademicProgramsRouter;
