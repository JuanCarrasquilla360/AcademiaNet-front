import { Route, Routes } from "react-router-dom";
import InstitutionsList from "./InstitutionsList";
import InstitutionsCreate from "./InstitutionsCreate";

const InstitutionConfigRouter = () => {
  return (
    <Routes>
      <Route index element={<InstitutionsList />} />
      <Route path="create" element={<InstitutionsCreate />} />
      <Route path="create/:id" element={<InstitutionsCreate />} />
    </Routes>
  );
};

export default InstitutionConfigRouter;
