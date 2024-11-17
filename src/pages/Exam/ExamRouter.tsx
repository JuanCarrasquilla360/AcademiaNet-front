import { Route, Routes } from "react-router-dom";
import ExamList from "./ExamList";

const NotificationRouter = () => {
  return (
    <Routes>
      <Route index element={<ExamList />} />
      <Route path="create" element={<ExamList />} />
      <Route path="create/:id" element={<ExamList />} />
    </Routes>
  );
};

export default NotificationRouter;
