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
import accountsRepository from "../repositories/accountsRepository";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .min(6, "At least 6 characters")
    .required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
});

const ChangePasswordModal = ({ open, onClose }: ChangePasswordModalProps) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirm: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Contraseña cambiada:", values);
      await accountsRepository("changePassword").post(values);
      onClose();
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
            id="confirm"
            name="confirm"
            label={t("confirmNewPassword")}
            type="password"
            fullWidth
            value={formik.values.confirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirm && Boolean(formik.errors.confirm)}
            helperText={formik.touched.confirm && formik.errors.confirm}
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
