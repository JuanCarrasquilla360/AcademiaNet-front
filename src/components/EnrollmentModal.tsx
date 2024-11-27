import { Dispatch, FC, SetStateAction, useState } from "react";
import { Box, Link, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import CssBaseline from "@mui/material/CssBaseline";

import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
interface LoginProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  academicProgramID: string;
  institutionName: string;
}

const EnrollmentModal: FC<LoginProps> = ({
  open,
  handleClose,
  institutionName,
  academicProgramID,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      applicantId: "",
    },
    validationSchema: Yup.object({
      applicantId: Yup.string().required(t("required")),
    }),
    onSubmit: async ({ applicantId }) => {
      setIsLoading(true);
      try {
        console.log(applicantId);
        console.log(academicProgramID);
        console.log(institutionName);
        // handleClose(true);
      } catch (error) {
        console.log("Credenciales incorrectas.", error);
      } finally {
        setIsLoading(false);
      }
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          component={"form"}
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
          <CssBaseline />
          <Typography variant="h6" align="center">
            {t("enrollment")}
          </Typography>

          <Typography align="center">
            {t("enrollmentDescription")}
            {institutionName}
          </Typography>

          <TextField
            label={t("applicantId")}
            name="applicantId"
            value={formik.values.applicantId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.applicantId && Boolean(formik.errors.applicantId)
            }
            helperText={formik.touched.applicantId && formik.errors.applicantId}
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
            {t("enrollmentHere")}
          </LoadingButton>
          <Box textAlign="right" mt={2}>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                navigate("/register-applicant");
                handleClose(false);
              }}
              sx={{ mb: 1 }}
            >
              {t("registerApplicantHere")}
            </Link>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EnrollmentModal;
