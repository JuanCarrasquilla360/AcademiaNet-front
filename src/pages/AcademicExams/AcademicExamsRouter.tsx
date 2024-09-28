import { Route, Routes } from "react-router-dom";
import AcademicExamsCreate from "./AcademicExamsCreate";
import AcademicExamsList from "./AcademicExamsList";

const AcademicExamsRouter = () => {
  return (
    <Routes>
      <Route index element={<AcademicExamsList />} />
      <Route path="create" element={<AcademicExamsCreate />} />
    </Routes>
  );
};

export default AcademicExamsRouter;
