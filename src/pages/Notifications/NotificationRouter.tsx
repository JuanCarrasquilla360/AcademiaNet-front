import { Route, Routes } from "react-router-dom";
import NotificationCreate from "./NotificationCreate";
import NotificationList from "./NotificationList";

const NotificationRouter = () => {
  return (
    <Routes>
      <Route index element={<NotificationList />} />
      <Route path="create" element={<NotificationCreate />} />
      <Route path="create/:id" element={<NotificationCreate />} />
    </Routes>
  );
};

export default NotificationRouter;
