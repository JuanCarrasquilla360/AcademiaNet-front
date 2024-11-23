import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
} from "@mui/material";
import defaultImage from "../assets/no-photo.jpg";
const ChooseAcadProgram = () => {
  const { id } = useParams();
  const programas = [
    {
      id_programa: 1,
      name: "Desarrollo Web Full Stack",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.",
      institutionName: "Pontificia Universidad Javeriana",
      location: "Bogotá, Cundinamarca",
      category: ["Presencial", "Medio Plazo", "Intermedio"],
      id_intitution: 101,
      photo: "https://example.com/logo-javeriana.png",
    },
    {
      id_programa: 2,
      name: "Ciencia de Datos",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.",
      institutionName: "Universidad de Antioquia",
      location: "Medellín, Antioquia",
      category: ["Presencial", "Largo Plazo", "Especialización"],
      id_intitution: 102,
      photo: "https://example.com/logo-udea.png",
    },
    {
      id_programa: 3,
      name: "Introducción a Bases de Datos",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.",
      institutionName: "Instituto Tecnológico Metropolitano",
      location: "Medellín, Antioquia",
      category: ["Virtual", "Corto Plazo", "Básico"],
      id_intitution: 103,
      photo: "",
    },
  ];
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Resultados ({programas.length})
      </Typography>
      <Grid container spacing={3}>
        {programas.map((programa) => (
          <Grid item xs={12} key={programa.id_programa}>
            <Card
              sx={{
                display: "flex",
                alignItems: "flex-start",
                padding: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              {/* Imagen del programa */}
              <CardMedia
                component="img"
                image={programa.photo || defaultImage}
                alt={programa.name}
                onError={(e) => (e.target.src = defaultImage)}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginRight: "16px",
                }}
              />
              {/* Contenido del programa */}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {programa.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {programa.institutionName}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {programa.location}
                </Typography>
                <Typography variant="body2" sx={{ marginY: "8px" }}>
                  {programa.descripcion}
                </Typography>
                {/* Chips de categoría */}
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {programa.category.map((cat, index) => (
                    <Chip
                      key={index}
                      label={cat}
                      color="primary"
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ChooseAcadProgram;
