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

// Esquema de validación con Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required(i18n.t("required")),
  lastName: Yup.string().required(i18n.t("required")),
  phone: Yup.string()
    .required(i18n.t("required"))
    .matches(/^[0-9]+$/, "El teléfono debe contener solo números")
    .min(10, "El teléfono debe tener al menos 10 dígitos"),
  email: Yup.string()
    .email("Formato de email inválido")
    .required(i18n.t("required")),
  password: Yup.string()
    .required(i18n.t("required"))
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required(i18n.t("required")),
  image: Yup.mixed().required(i18n.t("required")),
});

const RegisterForm = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [initialValues, setinitialValues] = useState({
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
    onSubmit: (values) => {
      // Convierte la imagen a base64 y envía los datos
      const reader = new FileReader();
      reader.readAsDataURL(values.image);
      reader.onloadend = () => {
        const base64Image = reader.result;
        const dataToSubmit = {
          ...values,
          image: base64Image, // Imagen convertida a base64
        };
        console.log("Datos enviados:", dataToSubmit);
        // Aquí puedes manejar el envío de datos al servidor
      };
    },
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
        Registro de Usuario
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
          Registrarse
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
