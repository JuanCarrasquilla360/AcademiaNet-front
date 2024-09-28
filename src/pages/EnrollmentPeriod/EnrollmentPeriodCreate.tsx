import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@mui/x-date-pickers";

const EnrollmentPeriodCreate: FC = () => {
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState({
    name: "",
    startDateEnrollment: "",
    endDateEnrollment: "",
    startDateExam: "",
    endDateExam: "",
  });
  const validationSchema = Yup.object({
    name: Yup.string().required(t("requiredField")),
    startDateEnrollment: Yup.string().required(t("requiredField")),
    endDateEnrollment: Yup.string().required(t("requiredField")),
    startDateExam: Yup.string().required(t("requiredField")),
    endDateExam: Yup.string().required(t("requiredField")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Valores del formulario:", values);
    },
  });

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography>{t("createEnrollmentPeriod")}</Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="name"
            name="name"
            size="small"
            fullWidth
            label={t("name")}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={t("startDateEnrollment")}
            onChange={(newValue) => {
              console.log(newValue);
              formik.setFieldValue("startDateEnrollment", newValue?.toString());
            }}
            value={formik.values.startDateEnrollment}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  formik.touched.startDateEnrollment &&
                  Boolean(formik.errors.startDateEnrollment)
                }
                helperText={
                  formik.touched.startDateEnrollment &&
                  formik.errors.startDateEnrollment
                }
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={t("endDateEnrollment")}
            onChange={(newValue) => {
              console.log(newValue);
              formik.setFieldValue("endDateEnrollment", newValue?.toString());
            }}
            value={formik.values.endDateEnrollment}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  formik.touched.endDateEnrollment &&
                  Boolean(formik.errors.endDateEnrollment)
                }
                helperText={
                  formik.touched.endDateEnrollment &&
                  formik.errors.endDateEnrollment
                }
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={t("startDateExam")}
            onChange={(newValue) => {
              console.log(newValue);
              formik.setFieldValue("startDateExam", newValue?.toString());
            }}
            value={formik.values.startDateExam}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  formik.touched.startDateExam &&
                  Boolean(formik.errors.startDateExam)
                }
                helperText={
                  formik.touched.startDateExam && formik.errors.startDateExam
                }
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={t("endDateExam")}
            onChange={(newValue) => {
              console.log(newValue);
              formik.setFieldValue("endDateExam", newValue?.toString());
            }}
            value={formik.values.endDateExam}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  formik.touched.endDateExam &&
                  Boolean(formik.errors.endDateExam)
                }
                helperText={
                  formik.touched.endDateExam && formik.errors.endDateExam
                }
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>

      {/* <RadioGroup
        aria-label="gender"
        name="gender"
        value={formik.values.gender}
        onChange={formik.handleChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Masculino" />
        <FormControlLabel value="female" control={<Radio />} label="Femenino" />
      </RadioGroup> */}

      {/* <FormControlLabel
        control={
          <Checkbox
            id="acceptTerms"
            name="acceptTerms"
            checked={formik.values.acceptTerms}
            onChange={(event) =>
              formik.setFieldValue("acceptTerms", event.target.checked)
            }
          />
        }
        label="Acepto los términos y condiciones"
      /> */}

      {/* <TextField
        id="password"
        name="password"
        type="password"
        label="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      /> */}
      <Grid container display={"flex"} justifyContent={"end"} mt={2}>
        <Grid item>
          <Button type="submit" variant="outlined">
            {t("save")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EnrollmentPeriodCreate;
