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
} from "@mui/material";
import { useThemeContext } from "../../ThemeContext";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { axiosInstance } from "../../services/httpService";
import accountsRepository from "../../repositories/accountsRepository";

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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], i18n.t("doNotMatch"))
    .required(i18n.t("required")),
  image: Yup.mixed().required(i18n.t("required")),
});

const RegisterForm = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [initialValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  // Formik para gestionar el formulario
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // Convierte la imagen a base64 y envía los datos
      const reader = new FileReader();
      reader.readAsDataURL(values.image);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        const dataToSubmit = {
          ...values,
          image: base64Image, // Imagen convertida a base64
        };
        console.log("Datos enviados:", dataToSubmit);
        await accountsRepository("CreateUser").post({
          FirstName: dataToSubmit.firstName,
          LastName: dataToSubmit.lastName,
          UserName: dataToSubmit.email,
          Email: dataToSubmit.email,
          InstitutionID: 19,
          Institution: {
            InstitutionID: 19,
            Name: "Universidad Santo Tomás",
            Location: "",
            Description: "Institución con una larga tradición académica.",
          },
          Language: "EN",
          PasswordConfirm: dataToSubmit.confirmPassword,
          Password: dataToSubmit.password,
          Photo: dataToSubmit.image,
        });
      };
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
