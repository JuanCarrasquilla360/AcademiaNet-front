import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataGridCustom from "../../components/DataGridCustom";
import LoadingComponent from "../../components/LoadingComponent";
import academicExamRepository from "../../repositories/academicExamRepository";

const NotificationList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: `${t("id")}`, flex: 1 },
    { field: "question", headerName: `${t("question")}`, flex: 1 },
    { field: "minValue", headerName: `${t("min")}`, flex: 1 },
    { field: "maxValue", headerName: `${t("max")}`, flex: 1 },
  ];

  const getAcademicExams = async () => {
    setLoading(true);
    try {
      const data = await academicExamRepository().get();
      setRows(data.map((exam) => ({ ...exam, id: exam.examID })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAcademicExams();
  }, []);

  return (
    <Box>
      {loading ? (
        <LoadingComponent />
      ) : (
        <DataGridCustom
          columns={columns}
          rows={rows}
          title={t("academicExams")}
          filterColumns={["question"]}
        />
      )}
    </Box>
  );
};

export default NotificationList;
