import { Typography } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import InstitutionConfigList from "./InstitutionConfigList";

const InstitutionConfigRouter = () => {
  return (
    <Routes>
      <Route index element={<InstitutionConfigList />} />
      <Route path="create" element={<Typography>create</Typography>} />
    </Routes>
  );
};

export default InstitutionConfigRouter;
