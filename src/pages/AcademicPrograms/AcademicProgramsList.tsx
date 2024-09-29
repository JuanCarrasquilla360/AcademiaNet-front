import { useTranslation } from "react-i18next";
import DataGridCustom from "../../components/DataGridCustom";
import { useEffect, useState } from "react";
import academicProgramRepository from "../../repositories/academicProgramRepository";
import { Box } from "@mui/material";
import LoadingComponent from "../../components/LoadingComponent";

const AcademicProgramsList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: `${t("id")}`, flex: 1 },
    { field: "name", headerName: `${t("name")}`, flex: 1 },
    { field: "category", headerName: `${t("category")}`, flex: 1 },
  ];

  const getAcademicPrograms = async () => {
    setLoading(true)
    try {
      const data = await academicProgramRepository().get();
      setRows(data.map((ap) => ({ ...ap, id: ap.academicProgramID })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getAcademicPrograms();
  }, []);

  return (
    <Box>
      {loading ? (
        <LoadingComponent />
      ) : (
        <DataGridCustom
          columns={columns}
          rows={rows}
          title={t("academicPrograms")}
          filterColumns={["name"]}
        />
      )}
    </Box>
  );
};

export default AcademicProgramsList;
