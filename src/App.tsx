import { FC, ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import { Typography } from "@mui/material";
import InstitutionConfigRouter from "./pages/Institutions/InstitutionsRouter";
import EnrollmentPeriodRouter from "./pages/EnrollmentPeriod/EnrollmentPeriodRouter";
import AcademicProgramsRouter from "./pages/AcademicPrograms/AcademicProgramsRouter";
import AcademicExamsRouter from "./pages/AcademicExams/AcademicExamsRouter";
import AdminRouter from "./pages/Admin/AdminRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/logged" />;
};

const App: FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="/institution-config/*"
                element={<InstitutionConfigRouter />}
              />
              <Route
                path="/enrollment-period/*"
                element={<EnrollmentPeriodRouter />}
              />
              <Route
                path="/academic-programs/*"
                element={<AcademicProgramsRouter />}
              />
              <Route path="/academic-exams" element={<AcademicExamsRouter />} />
              <Route path="/admin" element={<AdminRouter />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route
                path="/logged"
                element={
                  <ProtectedRoute>
                    <Typography>loggeado</Typography>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
