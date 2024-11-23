import { Route, Routes } from "react-router-dom";
import ExamResultCreate from "./ExamResultCreate";
import ExamResultList from "./ExamResultList";

const NotificationRouter = () => {
  return (
    <Routes>
      <Route index element={<ExamResultList />} />
      <Route path="create" element={<ExamResultCreate />} />
      <Route path="create/:id" element={<ExamResultCreate />} />
    </Routes>
  );
};

export default NotificationRouter;
