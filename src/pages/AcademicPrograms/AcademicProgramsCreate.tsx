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

const AcademicProgramsCreate: FC = () => {
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState({
    name: "",
    category: "",
    institution: "",
  });
  const validationSchema = Yup.object({
    name: Yup.string().required(t("requiredField")),
    category: Yup.string().required(t("requiredField")),
    institution: Yup.string().required(t("requiredField")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Valores del formulario:", values);
    },
  });

  const categories = [{ label: "cat1", value: "123" }];
  const institutions = [{ label: "itm", value: "123" }];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography>{t("createAcademicProgram")}</Typography>
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
            id="category"
            options={categories}
            size="small"
            fullWidth
            // Mostrar el label en lugar del objeto completo
            getOptionLabel={(option) => option.label}
            // Manejar los valores correctamente al seleccionar una opción
            value={
              categories.find(
                (option) => option.value === formik.values.category
              ) || null
            }
            onChange={(_, value) =>
              formik.setFieldValue("category", value?.value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("category")}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="institution"
            options={institutions}
            size="small"
            fullWidth
            // Mostrar el label en lugar del objeto completo
            getOptionLabel={(option) => option.label}
            // Manejar los valores correctamente al seleccionar una opción
            value={
              institutions.find(
                (option) => option.value === formik.values.institution
              ) || null
            }
            onChange={(_, value) =>
              formik.setFieldValue("institution", value?.value || "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("institution")}
                error={
                  formik.touched.institution &&
                  Boolean(formik.errors.institution)
                }
                helperText={
                  formik.touched.institution && formik.errors.institution
                }
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

export default AcademicProgramsCreate;
