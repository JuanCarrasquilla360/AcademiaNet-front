import { Route, Routes } from "react-router-dom";
import InstitutionConfigList from "./InstitutionConfigList";
import InstitutionConfigCreate from "./InstitutionConfigCreate";

const InstitutionConfigRouter = () => {
  return (
    <Routes>
      <Route index element={<InstitutionConfigList />} />
      <Route path="create" element={<InstitutionConfigCreate />} />
    </Routes>
  );
};

export default InstitutionConfigRouter;
