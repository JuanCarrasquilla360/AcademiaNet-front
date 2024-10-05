import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography, Divider, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import academicExamRepository from "../../repositories/academicExamRepository";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";

const AcademicExamsCreate: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    question: "",
    min: 0,
    max: 0,
  });
  const validationSchema = Yup.object({
    question: Yup.string().required(t("requiredField")),
    min: Yup.string().required(t("requiredField")),
    max: Yup.string().required(t("requiredField")),
  });
  const getAcademicExam = async () => {
    setLoading(true);
    try {
      const data = await academicExamRepository().getById(id);
      setInitialValues({
        question: data.question,
        min: data.minValue,
        max: data.maxValue,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getAcademicExam();
    }
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (id) {
          await academicExamRepository().put({
            ...values,
            examID: id,
            minValue: values.min,
            maxValue: values.max,
            enrollmentPeriodID: id,
          });
          return;
        }
        await academicExamRepository().post(values);
      } catch (err) {
        console.error(err);
      }
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <Box>
      {loading ? (
        <LoadingComponent />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Typography>{t("createExam")}</Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="question"
                name="question"
                size="small"
                fullWidth
                label={t("question")}
                value={formik.values.question}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.question && Boolean(formik.errors.question)
                }
                helperText={formik.touched.question && formik.errors.question}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="min"
                name="min"
                label={t("min")}
                size="small"
                fullWidth
                type="number"
                value={formik.values.min}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.min && Boolean(formik.errors.min)}
                helperText={formik.touched.min && formik.errors.min}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="max"
                name="max"
                label={t("max")}
                size="small"
                fullWidth
                type="number"
                value={formik.values.max}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.max && Boolean(formik.errors.max)}
                helperText={formik.touched.max && formik.errors.max}
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
      )}
    </Box>
  );
};

export default AcademicExamsCreate;
