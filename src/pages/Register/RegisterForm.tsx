import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Avatar,
  Autocomplete,
} from "@mui/material";
import { useThemeContext } from "../../ThemeContext";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import accountsRepository from "../../repositories/accountsRepository";
import { useSnackbar } from "notistack";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required(i18n.t("required")),
  lastName: Yup.string().required(i18n.t("required")),
  phone: Yup.string()
    .required(i18n.t("required"))
    .matches(/^[0-9]+$/, i18n.t("onlyNumber"))
    .min(10, i18n.t("min10Digits")),
  email: Yup.string()
    .email(i18n.t("invalidEmail"))
    .required(i18n.t("required")),
  password: Yup.string()
    .required(i18n.t("required"))
    .min(8, i18n.t("min8Character")),
  institution: Yup.string().required(i18n.t("required")),
  location: Yup.string().required(i18n.t("required")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], i18n.t("doNotMatch"))
    .required(i18n.t("required")),
  image: Yup.mixed().nullable().required(i18n.t("required")),
});

const RegisterForm = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeContext();
  const { enqueueSnackbar } = useSnackbar();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [initialValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    institution: "",
    location: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const cities = ["Bogotá", "Cali", "Medellín", "Barranquilla"];
  const convertToBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      let base64Image = null;
      if (values.image) {
        base64Image = await convertToBase64(values.image);
      }

      const dataToSubmit = {
        FirstName: values.firstName,
        LastName: values.lastName,
        UserName: values.email,
        Email: values.email,
        PhoneNumber: values.phone,
        Phone: values.phone,
        Institution: {
          Name: values.institution,
          Location: values.location,
          Description: "",
        },
        Language: "EN",
        PasswordConfirm: values.confirmPassword,
        Password: values.password,
        Photo: base64Image, // Enviar null si no hay imagen
      };

      console.log("Datos enviados:", dataToSubmit);

      // Envía los datos al backend
      await accountsRepository("CreateUser").post(
        dataToSubmit,
        enqueueSnackbar,
        t("userCreated")
      );
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  // Manejador para cargar y mostrar la imagen
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t("userRegister")}
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
              id="phone"
              name="phone"
              label={t("phone")}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="institution"
              name="institution"
              label={t("institution")}
              value={formik.values.institution}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.institution && Boolean(formik.errors.institution)
              }
              helperText={
                formik.touched.institution && formik.errors.institution
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="location"
              options={cities}
              fullWidth
              getOptionLabel={(option) => option}
              value={
                cities.find((option) => option === formik.values.location) ||
                null
              }
              onChange={(_, value) =>
                formik.setFieldValue("location", value || "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("location")}
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label={t("password")}
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label={t("confirmPassword")}
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
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: isDarkMode ? "#5715c2" : "#262673",
                color: "white",
              }}
            >
              {t("loadImage")}
              <input
                type="file"
                accept="image/png"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            {formik.touched.image && formik.errors.image ? (
              <Typography color="error">{formik.errors.image}</Typography>
            ) : null}
            {imagePreview && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Avatar
                  src={imagePreview}
                  alt="Preview"
                  sx={{ width: 100, height: 100, mt: 2 }}
                />
              </Box>
            )}
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

export default RegisterForm;
