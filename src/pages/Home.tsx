// src/pages/Home.tsx
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import defaultImage from "../assets/no-photo.jpg";
import { useNavigate } from "react-router-dom";
import institutionRepository from "../repositories/institutionRepository";
import LoadingComponent from "../components/LoadingComponent";
import { useSnackbar } from "notistack";
interface Institution {
  institutionID: number;
  name: string;
  photo?: string;
}

interface InstitutionGridProps {
  institutions: Institution[];
  defaultImage: string;
}

const Home: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [institutions, setInstitutions] = useState<
    InstitutionGridProps["institutions"]
  >([
    { institutionID: 1, name: "itm", photo: undefined },
    { institutionID: 2, name: "itm", photo: undefined },
    { institutionID: 3, name: "itm", photo: undefined },
    { institutionID: 4, name: "itm", photo: undefined },
    {
      institutionID: 5,
      name: "itm",
      photo:
        "https://academianetitm.blob.core.windows.net/users/cca0ba7c-9dd0-4b72-b151-5f4c59c352b1.jpg",
    },
    { institutionID: 6, name: "itm", photo: undefined },
    { institutionID: 7, name: "itm", photo: undefined },
    { institutionID: 8, name: "itm", photo: undefined },
  ]);

  const getInstitutions = async () => {
    setLoading(true);
    try {
      const data: InstitutionGridProps["institutions"] =
        await institutionRepository().get(undefined,
          enqueueSnackbar
        );
      setInstitutions(
        data.map((institution) => ({
          ...institution,
          id: institution.institutionID,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInstitutions();
  }, []);
  // const institutions: InstitutionGridProps = {
  //   institutions: [
  //     { id: 1, name: "itm", photo: undefined },
  //     { id: 2, name: "itm", photo: undefined },
  //     { id: 3, name: "itm", photo: undefined },
  //     { id: 4, name: "itm", photo: undefined },
  //     {
  //       id: 5,
  //       name: "itm",
  //       photo:
  //         "https://academianetitm.blob.core.windows.net/users/cca0ba7c-9dd0-4b72-b151-5f4c59c352b1.jpg",
  //     },
  //     { id: 6, name: "itm", photo: undefined },
  //     { id: 7, name: "itm", photo: undefined },
  //     { id: 8, name: "itm", photo: undefined },
  //   ],
  //   defaultImage,
  // };

  return (
    <Box sx={{ textAlign: "center", padding: 4, backgroundColor: "#f9f6f5" }}>
      <Typography variant="h4" fontWeight="bold" mb={1} color={"#3c4043"}>
        {t("institutions")}
      </Typography>

      {loading ? (
        <LoadingComponent />
      ) : (
        <Grid container spacing={3}>
          {institutions.map((institution) => (
            <Grid
              onClick={() =>
                navigate(`/academic-programs-list/${institution.institutionID}`)
              }
              sx={{ cursor: "pointer" }}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={institution.institutionID}
            >
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  ":hover": { boxShadow: 4 },
                  textAlign: "center",
                }}
              >
                {/* Imagen */}
                <CardMedia
                  component="img"
                  height="140"
                  image={institution.photo || defaultImage}
                  alt={institution.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultImage;
                  }}
                  sx={{ objectFit: "contain", padding: 2 }}
                />

                {/* Nombre */}
                <CardContent>
                  <Typography variant="body1" fontWeight="bold">
                    {institution.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
