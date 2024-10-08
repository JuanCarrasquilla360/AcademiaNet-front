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
import PrivateRoute from "./components/PrivateRoute"; // Importamos el nuevo PrivateRoute

const App: FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              {/* Rutas para roles de usuario normal */}
              <Route
                path="/institution/*"
                element={
                  <PrivateRoute allowedRoles={["user", "admin"]}>
                    <InstitutionConfigRouter />
                  </PrivateRoute>
                }
              />
              <Route
                path="/enrollment-period/*"
                element={
                  <PrivateRoute allowedRoles={["user", "admin"]}>
                    <EnrollmentPeriodRouter />
                  </PrivateRoute>
                }
              />
              <Route
                path="/academic-programs/*"
                element={
                  <PrivateRoute allowedRoles={["user", "admin"]}>
                    <AcademicProgramsRouter />
                  </PrivateRoute>
                }
              />
              <Route
                path="/academic-exams/*"
                element={
                  <PrivateRoute allowedRoles={["user", "admin"]}>
                    <AcademicExamsRouter />
                  </PrivateRoute>
                }
              />

              {/* Ruta para administradores */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <AdminRouter />
                  </PrivateRoute>
                }
              />

              {/* Ruta para cuando no encuentra la página */}
              <Route path="*" element={<NotFoundPage />} />

              {/* Ruta para usuarios logueados (disponible para cualquier usuario autenticado) */}
              <Route
                path="/logged"
                element={
                  <PrivateRoute allowedRoles={["admin", "guest"]}>
                    <Typography>loggeado</Typography>
                  </PrivateRoute>
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
