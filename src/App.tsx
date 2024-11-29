import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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
import { SnackbarProvider } from "notistack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PrivateRoute from "./components/PrivateRoute"; // Importamos el nuevo PrivateRoute
import { FC } from "react";
import RegisterForm from "./pages/Register/RegisterForm";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import EditProfileForm from "./pages/EditProfile/EditProfileForm";
import ResetPasswordView from "./pages/ResetPassword/ResetPassword";
import AcadProgramList from "./pages/AcadProgramList";
import ChooseAcProgram from "./pages/ChooseAcProgram";
import RegisterApplicant from "./pages/RegisterApplicant";

const App: FC = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={4000}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <HashRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/academic-programs-list/:id"
                  element={<AcadProgramList />}
                />
                <Route
                  path="/choose-academic-program/:id"
                  element={<ChooseAcProgram />}
                />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                  path="/register-applicant"
                  element={<RegisterApplicant />}
                />
                <Route
                  path="/api/Accounts/ConfirmEmail"
                  element={<ConfirmEmail />}
                />
                <Route
                  path="/api/Accounts/ResetPassword"
                  element={<ResetPasswordView />}
                />
                <Route
                  path="/edit-user"
                  element={
                    <PrivateRoute allowedRoles={["User", "Admin"]}>
                      <EditProfileForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/institution/*"
                  element={
                    <PrivateRoute allowedRoles={["User", "Admin"]}>
                      <InstitutionConfigRouter />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/enrollment-period/*"
                  element={
                    <PrivateRoute allowedRoles={["User", "Admin"]}>
                      <EnrollmentPeriodRouter />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/academic-programs/*"
                  element={
                    <PrivateRoute allowedRoles={["User", "Admin"]}>
                      <AcademicProgramsRouter />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/academic-exams/*"
                  element={
                    <PrivateRoute allowedRoles={["User", "Admin"]}>
                      <AcademicExamsRouter />
                    </PrivateRoute>
                  }
                />

                {/* Ruta para administradores */}
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute allowedRoles={["Admin"]}>
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
                    <PrivateRoute allowedRoles={["Admin", "guest"]}>
                      <Typography>loggeado</Typography>
                    </PrivateRoute>
                  }
                />
              </Route>
            </Routes>
          </AuthProvider>
        </HashRouter>
      </SnackbarProvider>
    </LocalizationProvider>
  );
};

export default App;
