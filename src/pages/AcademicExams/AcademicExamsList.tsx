import DataGridCustom from "../../components/DataGridCustom";
import { useTranslation } from "react-i18next";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";

const AcademicExamsList = () => {
  const { t } = useTranslation();
  const axiosInstance = useAxios();
  const columns = [
    { field: "id", headerName: `${t("id")}`, flex: 1 },
    { field: "question", headerName: `${t("question")}`, flex: 1 },
    { field: "min", headerName: `${t("min")}`, flex: 1 },
    { field: "max", headerName: `${t("max")}`, flex: 1 },
  ];

  const rows = [
    { id: 1, question: "What is your age?", min: 18, max: 99 },
    { id: 2, question: "How many hours do you work per day?", min: 1, max: 12 },
    { id: 3, question: "How satisfied are you with the service?", min: 1, max: 10 },
    { id: 4, question: "Rate your experience from 1 to 5", min: 1, max: 5 },
    { id: 5, question: "How many countries have you visited?", min: 0, max: 50 },
  ];
  const getAcademicExams = async () => {
    const { data } = await axiosInstance.get("Exams");
    console.log(data);
  };

  useEffect(() => {
    getAcademicExams()
  }, [])
  
  return (
    <DataGridCustom columns={columns} rows={rows} title={t("academicExams")} filterColumns={["question"]}/>
  );
};

export default AcademicExamsList;
