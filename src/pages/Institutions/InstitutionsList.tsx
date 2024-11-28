/* eslint-disable @typescript-eslint/no-explicit-any */
import DataGridCustom from "../../components/DataGridCustom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import institutionRepository from "../../repositories/institutionRepository";
import { Box } from "@mui/material";
import LoadingComponent from "../../components/LoadingComponent";

const InstitutionsList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: `${t("id")}`, flex: 1 },
    { field: "name", headerName: `${t("name")}`, flex: 1 },
    { field: "location", headerName: `${t("location")}`, flex: 1 },
    { field: "description", headerName: `${t("description")}`, flex: 1 },
  ];

  const getInstitutions = async () => {
    setLoading(true);
    try {
      const data = await institutionRepository().get();
      setRows(
        data.map((institution: { institutionID: any; }) => ({
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

  return (
    <Box>
      {loading ? (
        <LoadingComponent />
      ) : (
        <DataGridCustom
          columns={columns}
          rows={rows}
          title={t("institutions")}
          filterColumns={["name"]}
        />
      )}
    </Box>
  );
};

export default InstitutionsList;
