import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .min(6, "At least 6 characters")
    .required("Required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
});

const ChangePasswordModal = ({ open, onClose }: ChangePasswordModalProps) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Contraseña cambiada:", values);
      // Aquí puedes manejar el envío de datos al servidor
      onClose(); // Cerrar el modal tras cambiar la contraseña
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("changePassword")}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            id="currentPassword"
            name="currentPassword"
            label={t("currentPassword")}
            type="password"
            fullWidth
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
          />
          <TextField
            margin="dense"
            id="newPassword"
            name="newPassword"
            label={t("newPassword")}
            type="password"
            fullWidth
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            margin="dense"
            id="confirmNewPassword"
            name="confirmNewPassword"
            label={t("confirmNewPassword")}
            type="password"
            fullWidth
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmNewPassword &&
              Boolean(formik.errors.confirmNewPassword)
            }
            helperText={
              formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t("cancel")}
          </Button>
          <Button type="submit" color="primary">
            {t("save")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordModal;
