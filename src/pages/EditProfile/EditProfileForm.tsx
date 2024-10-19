import React, { useState } from "react";
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
  image: Yup.mixed().required(i18n.t("required")),
});

const EditProfileForm = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeContext();
  const { username, email } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>("" || null);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: username?.split(" ")[0] || "",
      lastName: username?.split(" ")[1] || "",
      phone: "",
      email: email || "",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const reader = new FileReader();
      reader.readAsDataURL(values.image);
      reader.onloadend = () => {
        const base64Image = reader.result;
        const dataToSubmit = {
          ...values,
          image: base64Image,
        };
        console.log("Datos de perfil enviados:", dataToSubmit);
        // Aquí puedes manejar el envío de datos al servidor
      };
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

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
