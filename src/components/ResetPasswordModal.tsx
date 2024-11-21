import { FC, useState } from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import accountsRepository from "../repositories/accountsRepository";
import { useSnackbar } from "notistack";

interface ResetPasswordModalProps {
  open: boolean;
  handleClose: () => void;
}

const ResetPasswordModal: FC<ResetPasswordModalProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t("invalidEmail")).required(t("required")),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Lógica para reenviar el email de activación
        await accountsRepository("RecoverPassword").post(
          {
            email: values.email,
            language: "en",
          },
          enqueueSnackbar,
          t("checkEmail")
        );
        console.log("Reenviando correo a:", values.email);
        handleClose();
      } catch (error) {
        console.error("Error al reenviar el correo:", error);
      } finally {
        setIsLoading(false);
      }
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" align="center">
          {t("forgotPassword")}
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

        {/* Submit Button */}
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("send")}
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default ResetPasswordModal;
