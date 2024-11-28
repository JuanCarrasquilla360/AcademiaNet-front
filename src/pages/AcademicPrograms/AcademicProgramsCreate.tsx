/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Autocomplete,
  Button,
  Grid,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../../components/LoadingComponent";
import { useParams } from "react-router-dom";
import academicProgramRepository from "../../repositories/academicProgramRepository";
import institutionRepository from "../../repositories/institutionRepository";

const AcademicProgramsCreate: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [institutionOpts, setInstitutionOpts] = useState([
    { label: "", value: "" },
  ]);
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

  const getAcademicProgram = async () => {
    setLoading(true);
    try {
      const data = await academicProgramRepository().getById(id);
      setInitialValues({
        name: data.name,
        category: data.category,
        institution: data.institutionID,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (id) {
          await academicProgramRepository().put({
            ...values,
            academicProgramID: id,
          });
          return;
        }
        await academicProgramRepository().post(values);
      } catch (err) {
        console.error(err);
      }
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  const categories = [
    "Ingeniería",
    "Administración",
    "Ciencias Sociales",
    "Salud",
    "Arquitectura",
    "Ciencias Naturales",
  ];
  const getInstitutions = async () => {
    setLoading(true);
    try {
      const data = await institutionRepository().get();
      setInstitutionOpts(
        data.map((institution: { name: any; institutionID: any; }) => ({
          label: institution.name,
          value: institution.institutionID,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInstitutions()
    if (id) {
      getAcademicProgram();
    }
  }, []);

  return (
    <Box>
      {loading ? (
        <LoadingComponent />
      ) : (
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
                getOptionLabel={(option) => option}
                // Manejar los valores correctamente al seleccionar una opción
                value={
                  categories.find(
                    (option) => option === formik.values.category
                  ) || null
                }
                onChange={(_, value) =>
                  formik.setFieldValue("category", value || "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("category")}
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="institution"
                options={institutionOpts}
                size="small"
                fullWidth
                // Mostrar el label en lugar del objeto completo
                getOptionLabel={(option) => option.label}
                // Manejar los valores correctamente al seleccionar una opción
                value={
                  institutionOpts.find(
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
      )}
    </Box>
  );
};

export default AcademicProgramsCreate;
