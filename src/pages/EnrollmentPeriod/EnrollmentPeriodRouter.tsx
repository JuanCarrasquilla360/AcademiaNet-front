import { Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";

const EnrollmentPeriodRouter = () => {
  return (
    <Routes>
      <Route index element={<Typography>list</Typography>} />
      <Route path="create" element={<Typography>create</Typography>} />
    </Routes>
  );
};

export default EnrollmentPeriodRouter;
