import { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Autocomplete,
  Checkbox,
  Button,
} from "@mui/material";

const InstitutionConfigCreate: FC = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "El nombre debe tener como máximo 50 caracteres")
      .required("El nombre es requerido"),
    gender: Yup.string()
      .oneOf(["male", "female"])
      .required("El género es requerido"),
    favoriteColor: Yup.string().required("El color favorito es requerido"),
    acceptTerms: Yup.boolean()
      .oneOf([true], "Debes aceptar los términos y condiciones")
      .required("Debes aceptar los términos y condiciones"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      favoriteColor: null,
      acceptTerms: false,
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Valores del formulario:", values);
    },
  });

  const colors = ["Rojo", "Verde", "Azul", "Amarillo", "Naranja", "Morado"];

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="Nombre"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <RadioGroup
        aria-label="gender"
        name="gender"
        value={formik.values.gender}
        onChange={formik.handleChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Masculino" />
        <FormControlLabel value="female" control={<Radio />} label="Femenino" />
      </RadioGroup>

      <Autocomplete
        id="favoriteColor"
        options={colors}
        getOptionLabel={(option) => option}
        value={formik.values.favoriteColor}
        onChange={(_, value) => formik.setFieldValue("favoriteColor", value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Color favorito"
            error={
              formik.touched.favoriteColor &&
              Boolean(formik.errors.favoriteColor)
            }
            helperText={
              formik.touched.favoriteColor && formik.errors.favoriteColor
            }
          />
        )}
      />

      <FormControlLabel
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
      />

      <TextField
        id="password"
        name="password"
        type="password"
        label="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <Button type="submit">Enviar</Button>
    </form>
  );
};

export default InstitutionConfigCreate;
