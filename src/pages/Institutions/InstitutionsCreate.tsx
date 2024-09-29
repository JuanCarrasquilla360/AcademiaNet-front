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
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import institutionRepository from "../../repositories/institutionRepository";

const InstitutionsCreate: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [institution, setInstitution] = useState({
    name: "",
    description: "",
    location: "",
  });
  const validationSchema = Yup.object({
    name: Yup.string().required(t("requiredField")),
    description: Yup.string().required(t("requiredField")),
    location: Yup.string().required(t("requiredField")),
  });

  const getInstitution = async () => {
    setLoading(true);
    try {
      const data = await institutionRepository().getById(id);
      console.log(data);
      setInstitution({
        name: data.name,
        description: data.description,
        location: data.location,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getInstitution();
    }
  }, []);

  const formik = useFormik({
    initialValues: institution,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (id) {
          await institutionRepository().put({
            ...values,
            institutionID: id,
          });
          return;
        }
        await institutionRepository().post(values);
      } catch (err) {
        console.error(err);
      }
    },
    validateOnBlur: false,
    validateOnMount: true,
    enableReinitialize: true,
  });

  // const cities = [{ label: "Medellin", value: "123" }];
  const cities = ["Bogotá", "Cali", "Medellín", "Barranquilla", "123"];

  return (
    <Box>
      {loading ? (
        <LoadingComponent />
      ) : (
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
                getOptionLabel={(option) => option}
                value={
                  cities.find((option) => option === formik.values.location) ||
                  null
                }
                onChange={(_, value) =>
                  formik.setFieldValue("location", value || "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("location")}
                    error={
                      formik.touched.location && Boolean(formik.errors.location)
                    }
                    helperText={
                      formik.touched.location && formik.errors.location
                    }
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
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
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

export default InstitutionsCreate;
