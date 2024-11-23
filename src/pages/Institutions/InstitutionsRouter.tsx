import { Route, Routes } from "react-router-dom";
import InstitutionsCreate from "./InstitutionsCreate";

const InstitutionConfigRouter = () => {
  return (
    <Routes>
      <Route index element={<InstitutionsCreate />} />
      <Route path="create" element={<InstitutionsCreate />} />
      <Route path="create/:id" element={<InstitutionsCreate />} />
    </Routes>
  );
};

export default InstitutionConfigRouter;
