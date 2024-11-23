import { FC, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import accountsRepository from "../../repositories/accountsRepository";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const ResetPasswordView: FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = searchParams.get("token");

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t("invalidEmail")).required(t("required")),
      newPassword: Yup.string()
        .required(t("required"))
        .min(8, t("min8Character")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], t("doNotMatch"))
        .required(t("required")),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Lógica para resetear la contraseña usando el token
        await accountsRepository("ResetPassword").post(
          {
            email: values.email,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
            token,
          },
          enqueueSnackbar,
          t("resetPasswordSuccessful")
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
        console.log("Contraseña reseteada para:", values.email);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      } catch (error) {
        console.error("Error al resetear la contraseña:", error);
      } finally {
        setIsLoading(false);
      }
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 2,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: "auto",
        mt: 5,
      }}
    >
      <Typography variant="h6" align="center">
        {t("resetPassword")}
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

      {/* New Password Input */}
      <TextField
        label={t("newPassword")}
        name="newPassword"
        type="password"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
        fullWidth
      />

      {/* Confirm Password Input */}
      <TextField
        label={t("confirmPassword")}
        name="confirmPassword"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
        fullWidth
      />

      {/* Submit Button */}
      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        {t("resetPassword")}
      </LoadingButton>
    </Box>
  );
};

export default ResetPasswordView;
