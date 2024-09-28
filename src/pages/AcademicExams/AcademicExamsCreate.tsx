import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Autocomplete,
  Button,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const AcademicExamsCreate: FC = () => {
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    location: "",
  });
  const validationSchema = Yup.object({
    name: Yup.string().required(t("requiredField")),
    description: Yup.string().required(t("requiredField")),
    location: Yup.string().required(t("requiredField")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Valores del formulario:", values);
    },
  });

  const cities = [{ label: "Medellin", value: "123" }];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography>{t("createInstitution")}</Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
          <Autocomplete
            id="institution"
            options={cities}
            size="small"
            fullWidth
            // Mostrar el label en lugar del objeto completo
            getOptionLabel={(option) => option.label}
            // Manejar los valores correctamente al seleccionar una opción
            value={
              cities.find(
                (option) => option.value === formik.values.location
              ) || null
            }
            onChange={(_, value) =>
              formik.setFieldValue("location", value?.value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("location")}
                error={
                  formik.touched.location && Boolean(formik.errors.location)
                }
                helperText={formik.touched.location && formik.errors.location}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label={t("description")}
            size="small"
            fullWidth
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
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
