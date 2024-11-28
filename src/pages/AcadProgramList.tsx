/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useEffect, useState } from "react";
import academicProgramRepository from "../repositories/academicProgramRepository";
import LoadingComponent from "../components/LoadingComponent";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import EnrollmentModal from "../components/EnrollmentModal";

interface AcademicProgramProps {
  academicProgramID: string;
  name: string;
  descripcion: string;
  institutionName: string;
  location: string;
  category: string;
  id_intitution: string;
  photo: string;
}

const AcadProgramList = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [openEnrollmentModal, setOpenEnrollmentModal] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState("itm");
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [academicPrograms, setAcademicPrograms] = useState<
    AcademicProgramProps[]
  >([]);

  const getAcademicPrograms = async () => {
    setLoading(true);
    try {
      const data: AcademicProgramProps[] =
        await academicProgramRepository().getById(`${id}`, enqueueSnackbar);
      setAcademicPrograms(
        data.map((institution) => ({
          ...institution,
          id: institution.academicProgramID,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAcademicPrograms();
  }, []);
  // const programas = [
  //   {
  //     id: 1,
  //     name: "Desarrollo Web Full Stack",
  //     descripcion:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.",
  //     institutionName: "Pontificia Universidad Javeriana",
  //     location: "Bogotá, Cundinamarca",
  //     category: ["Presencial", "Medio Plazo", "Intermedio"],
  //     id_intitution: 101,
  //     photo: "https://example.com/logo-javeriana.png",
  //   },
  //   {
  //     id: 2,
  //     name: "Ciencia de Datos",
  //     descripcion:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.",
  //     institutionName: "Universidad de Antioquia",
  //     location: "Medellín, Antioquia",
  //     category: ["Presencial", "Largo Plazo", "Especialización"],
  //     id_intitution: 102,
  //     photo: "https://example.com/logo-udea.png",
  //   },
  //   {
  //     id: 3,
  //     name: "Introducción a Bases de Datos",
  //     descripcion:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.",
  //     institutionName: "Instituto Tecnológico Metropolitano",
  //     location: "Medellín, Antioquia",
  //     category: ["Virtual", "Corto Plazo", "Básico"],
  //     id_intitution: 103,
  //     photo: "",
  //   },
  // ];
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        {t("results")} ({academicPrograms.length})
      </Typography>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Grid container spacing={3}>
          {academicPrograms.map((program) => (
            <Grid
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setOpenEnrollmentModal(true);
                setSelectedInstitution(program.institutionName);
                setSelectedProgramId(program.academicProgramID);
              }}
              item
              xs={12}
              key={program.academicProgramID}
            >
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
                  image={program.photo || defaultImage}
                  alt={program.name}
                  onError={(e: any) => (e.target.src = defaultImage)}
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
                    {program.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {program.institutionName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    {program.location}
                  </Typography>
                  <Typography variant="body2" sx={{ marginY: "8px" }}>
                    {program.descripcion}
                  </Typography>
                  {/* Chips de categoría */}
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      label={program.category}
                      color="primary"
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {openEnrollmentModal && (
        <EnrollmentModal
          open={openEnrollmentModal}
          handleClose={() => setOpenEnrollmentModal(false)}
          institutionName={selectedInstitution}
          academicProgramID={selectedProgramId}
        />
      )}
    </Box>
  );
};

export default AcadProgramList;
