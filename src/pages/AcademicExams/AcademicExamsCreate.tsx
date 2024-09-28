import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const AcademicExamsCreate: FC = () => {
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState({
    question: "",
    min: "",
    max: "",
  });
  const validationSchema = Yup.object({
    question: Yup.string().required(t("requiredField")),
    min: Yup.string().required(t("requiredField")),
    max: Yup.string().required(t("requiredField")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Valores del formulario:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography>{t("createInstitution")}</Typography>
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
            error={formik.touched.question && Boolean(formik.errors.question)}
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
  );
};

export default AcademicExamsCreate;
