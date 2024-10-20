import React, { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import ChangePasswordModal from "../../components/ChangePasswordModal ";
import { useAuth } from "../../hooks/useAuth";
import accountsRepository from "../../repositories/accountsRepository";

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
  image: Yup.mixed().nullable(),
});

const EditProfileForm = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeContext();
  const { username, email } = useAuth();
  const [initialValues, setInitialValues] = useState({
    firstName: username?.split(" ")[0] || "",
    lastName: username?.split(" ")[1] || "",
    phone: "",
    email: email || "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(""); // Preview de imagen
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  // Función para convertir archivo a base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Configuración de Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      let base64Image = null;
      if (values.image && !values.image.includes("https")) {
        base64Image = await convertToBase64(values.image);
      }

      const dataToSubmit = {
        FirstName: values.firstName,
        LastName: values.lastName,
        UserName: values.email,
        Email: values.email,
        PhoneNumber: values.phone,
        Phone: values.phone,
        InstitutionID: 19,
        Institution: {
          InstitutionID: 19,
          Name: "Universidad Santo Tomás",
        },
        Language: "EN",
        Photo: base64Image, // Enviar la imagen en base64
      };

      console.log("Datos enviados:", dataToSubmit);
      await accountsRepository("").put(dataToSubmit);
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  // Función para obtener datos del usuario
  const getUser = async () => {
    const dataAcc = await accountsRepository("").get();
    setImagePreview(dataAcc.photo); // La imagen en base64
    setInitialValues((data) => ({
      ...data,
      phone: dataAcc.phoneNumber,
      image: dataAcc.photo, // Guardar la imagen actual en el estado
    }));
  };

  useEffect(() => {
    getUser();
  }, []);

  // Función para cargar una nueva imagen
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]; // Tomar el archivo del input
    if (file) {
      formik.setFieldValue("image", file); // Establecer el archivo en formik
      const previewUrl = URL.createObjectURL(file); // Generar URL temporal para previsualizar la imagen
      setImagePreview(previewUrl); // Actualizar el preview de la imagen
    }
  };

  // Funciones para el modal de cambio de contraseña
  const handleOpenPasswordModal = () => setOpenPasswordModal(true);
  const handleClosePasswordModal = () => setOpenPasswordModal(false);

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t("editProfile")}
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
              disabled
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
                accept="image/png, image/jpeg"
                hidden
                onChange={handleImageUpload} // Maneja el cambio de imagen
              />
            </Button>
            {formik.touched.image && formik.errors.image ? (
              <Typography color="error">{formik.errors.image}</Typography>
            ) : null}
            {imagePreview && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Avatar
                  src={imagePreview} // Previsualización de la imagen
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
          {t("saveChanges")}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleOpenPasswordModal}
        >
          {t("changePassword")}
        </Button>
      </form>

      <ChangePasswordModal
        open={openPasswordModal}
        onClose={handleClosePasswordModal}
      />
    </Box>
  );
};

export default EditProfileForm;
