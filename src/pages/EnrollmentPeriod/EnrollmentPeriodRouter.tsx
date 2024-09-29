import { Route, Routes } from "react-router-dom";
import EnrollmentPeriodList from "./EnrollmentPeriodList";
import EnrollmentPeriodCreate from "./EnrollmentPeriodCreate";

const EnrollmentPeriodRouter = () => {
  return (
    <Routes>
      <Route index element={<EnrollmentPeriodList />} />
      <Route path="create" element={<EnrollmentPeriodCreate />} />
      <Route path="create/:id" element={<EnrollmentPeriodCreate />} />
    </Routes>
  );
};

export default EnrollmentPeriodRouter;
