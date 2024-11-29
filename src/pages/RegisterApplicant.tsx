import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import i18n from "../i18n";
import { useThemeContext } from "../ThemeContext";
import applicantRepository from "../repositories/applicantRepository";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required(i18n.t("required")),
  lastName: Yup.string().required(i18n.t("required")),
  documentNumber: Yup.string().required(i18n.t("required")),
  email: Yup.string()
    .email(i18n.t("invalidEmail"))
    .required(i18n.t("required")),
});

const RegisterApplicant = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeContext();
  const { enqueueSnackbar } = useSnackbar();
  const [initialValues] = useState({
    firstName: "",
    lastName: "",
    documentNumber: "",
    email: "",
    institution: "",
    location: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const dataToSubmit = {
        fullName: values.firstName + values.lastName,
        documentNumber: values.documentNumber,
        email: values.email,
      };
      // Envía los datos al backend
      await applicantRepository().post(
        dataToSubmit,
        enqueueSnackbar,
        t("applicantCreated")
      );
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t("applicantRegister")}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label={t("name")}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label={t("lastName")}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="documentNumber"
              name="documentNumber"
              label={t("applicantId")}
              value={formik.values.documentNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.documentNumber &&
                Boolean(formik.errors.documentNumber)
              }
              helperText={
                formik.touched.documentNumber && formik.errors.documentNumber
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label={t("email")}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            mt: 2,
            bgcolor: isDarkMode ? "#5715c2" : "#262673",
            color: "white",
          }}
        >
          {t("signUp")}
        </Button>
      </form>
    </Box>
  );
};

export default RegisterApplicant;
