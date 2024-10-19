import { Dispatch, FC, SetStateAction, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import CssBaseline from "@mui/material/CssBaseline";
import { useAuth } from "../hooks/useAuth";
import { LoadingButton } from "@mui/lab";

interface LoginProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

const LoginModal: FC<LoginProps> = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const [formType, setFormType] = useState<"login" | "register">("login");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t("invalidEmail")).required(t("required")),
      password: Yup.string()
        .min(6, t("passwordTooShort"))
        .required(t("required")),
    }),
    onSubmit: async ({ email, password }) => {
      setIsLoading(true);
      try {
        const loginResp = await login(email, password);
        console.log(loginResp);
        handleClose(true);
      } catch (error) {
        console.log("Credenciales incorrectas.", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component={"form"}
        onSubmit={formik.handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CssBaseline />
        <Typography variant="h6" align="center">
          {formType === "login" ? t("login") : t("register")}
        </Typography>

        {/* Email Input */}
        <TextField
          label={t("email")}
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
        />

        {/* Password Input */}
        <TextField
          label={t("password")}
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
        />

        {/* Forgot Password Button */}
        <Button
          variant="text"
          color="primary"
          onClick={() => alert(t("forgotPassword"))}
        >
          {t("forgotPassword")}
        </Button>

        {/* Submit Button */}
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("login")}
        </LoadingButton>

        {/* Register Button */}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() =>
            setFormType(formType === "login" ? "register" : "login")
          }
        >
          {formType === "login" ? t("register") : t("login")}
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;
